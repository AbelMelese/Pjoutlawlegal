import { supabase } from './supabase';
import { slugify } from './validate';

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
export const ACCEPTED_TYPES = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/avif': 'avif',
  'application/pdf': 'pdf',
};
export const ACCEPT_ATTRIBUTE = Object.keys(ACCEPTED_TYPES).join(',');
export const FOLDERS = ['general', 'pages', 'team', 'articles', 'documents'];

const MAX_DIMENSION = 2400;

export function checkFile(file) {
  if (!ACCEPTED_TYPES[file.type]) return `${file.name}: only JPG, PNG, WebP, GIF, AVIF images and PDF files can be uploaded.`;
  if (file.size > MAX_UPLOAD_BYTES) return `${file.name}: files must be 10 MB or smaller.`;
  if (file.size === 0) return `${file.name}: this file is empty.`;
  return null;
}

/**
 * Large photos are scaled down to 2400px on their longest side and
 * re-compressed in the browser before upload, so pages stay fast.
 * GIFs (may be animated), AVIF and PDFs are uploaded untouched.
 */
export async function optimizeImage(file) {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || typeof createImageBitmap !== 'function') {
    return { blob: file, type: file.type, ...(await readDimensions(file)) };
  }
  const bitmap = await createImageBitmap(file);
  const { width, height } = bitmap;
  const scale = Math.min(1, MAX_DIMENSION / Math.max(width, height));
  if (scale === 1 && file.size < 1.5 * 1024 * 1024) {
    bitmap.close?.();
    return { blob: file, type: file.type, width, height };
  }
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close?.();
  // Keep PNG for graphics with transparency; photos become WebP.
  const type = file.type === 'image/png' ? 'image/png' : 'image/webp';
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, type, 0.85));
  if (!blob || blob.size >= file.size) return { blob: file, type: file.type, width, height };
  return { blob, type, width: canvas.width, height: canvas.height };
}

async function readDimensions(file) {
  if (!file.type.startsWith('image/') || typeof createImageBitmap !== 'function') return { width: null, height: null };
  try {
    const bitmap = await createImageBitmap(file);
    const size = { width: bitmap.width, height: bitmap.height };
    bitmap.close?.();
    return size;
  } catch {
    return { width: null, height: null };
  }
}

export function storagePath(folder, fileName, type, now = new Date(), id = crypto.randomUUID()) {
  const base = slugify(fileName.replace(/\.[^.]+$/, '')) || 'file';
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  return `${folder}/${now.getUTCFullYear()}/${month}/${id.slice(0, 8)}-${base}.${ACCEPTED_TYPES[type]}`;
}

export async function uploadMedia(file, { folder = 'general', altText = '' } = {}) {
  const problem = checkFile(file);
  if (problem) throw new Error(problem);
  const optimized = await optimizeImage(file);
  const path = storagePath(folder, file.name, optimized.type);
  const bucket = supabase.storage.from('media');

  const { error: uploadError } = await bucket.upload(path, optimized.blob, {
    contentType: optimized.type,
    cacheControl: '31536000',
    upsert: false,
  });
  if (uploadError) throw uploadError;

  const publicUrl = bucket.getPublicUrl(path).data.publicUrl;
  const { data, error } = await supabase
    .from('media')
    .insert({
      storage_path: path,
      public_url: publicUrl,
      file_name: file.name.slice(0, 200),
      mime_type: optimized.type,
      size_bytes: optimized.blob.size,
      width: optimized.width,
      height: optimized.height,
      alt_text: altText.slice(0, 300),
      folder,
    })
    .select()
    .single();
  if (error) {
    await bucket.remove([path]); // don't leave an orphaned file behind
    throw error;
  }
  return data;
}

export async function listMedia({ search = '', folder = '', imagesOnly = false } = {}) {
  let query = supabase.from('media').select('*').order('created_at', { ascending: false }).limit(200);
  if (folder) query = query.eq('folder', folder);
  if (imagesOnly) query = query.like('mime_type', 'image/%');
  if (search.trim()) {
    const term = search.trim().replace(/[%_,()]/g, ' ');
    query = query.or(`file_name.ilike.%${term}%,alt_text.ilike.%${term}%`);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function updateMedia(id, changes) {
  const { data, error } = await supabase.from('media').update(changes).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteMedia(item) {
  // Remove the stored file first: if that fails, the library entry stays so
  // the file is not left publicly reachable with no way to find it again.
  const { data: removed, error: storageError } = await supabase.storage.from('media').remove([item.storage_path]);
  if (storageError) throw storageError;
  if (!removed?.length) throw new Error('The file could not be removed from storage. Please try again or contact your administrator.');
  const { error } = await supabase.from('media').delete().eq('id', item.id);
  if (error) throw error;
}

export function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
