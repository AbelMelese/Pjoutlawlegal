import { useCallback, useEffect, useState } from 'react';
import { describeEntry, listEntries } from './content';
import { CONTENT_AREAS } from './schemas';
import { friendlyError } from './supabase';

async function loadAreas() {
  try {
    const rows = await listEntries();
    return {
      loading: false,
      error: '',
      areas: CONTENT_AREAS.map((area) => ({ area, ...describeEntry(area, rows[area.key] ?? null) })),
    };
  } catch (error) {
    return { loading: false, error: friendlyError(error, 'Could not load the website content.'), areas: [] };
  }
}

/** Loads every content entry and pairs it with its schema + status. */
export function useEntries() {
  const [state, setState] = useState({ loading: true, error: '', areas: [] });

  useEffect(() => {
    let cancelled = false;
    loadAreas().then((next) => !cancelled && setState(next));
    return () => {
      cancelled = true;
    };
  }, []);

  const reload = useCallback(async () => setState(await loadAreas()), []);

  return { ...state, reload };
}
