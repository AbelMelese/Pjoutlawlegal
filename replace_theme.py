import os, re
src_dir = r"c:/Users/myema/Desktop/smithmediation/src"
for root, dirs, files in os.walk(src_dir):
    for f in files:
        if f.endswith('.jsx'):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            # Replace gold gradient to purple/rose
            content = content.replace('from-[#c4a052] to-[#a88c3d]', 'from-purple-600 to-rose-600')
            content = content.replace('from-[#c4a052]/', 'from-purple-600/')
            content = content.replace('to-[#a88c3d]/', 'to-rose-600/')
            
            # Replace specific properties for gold (#c4a052)
            content = re.sub(r'text-\[\#c4a052\]', 'text-purple-600', content)
            content = re.sub(r'bg-\[\#c4a052\]', 'bg-purple-600', content)
            content = re.sub(r'border-\[\#c4a052\]', 'border-purple-600', content)
            content = re.sub(r'shadow-\[\#c4a052\]', 'shadow-purple-600', content)
            content = re.sub(r'via-\[\#c4a052\]', 'via-purple-600', content)
            
            # Replace specific properties for dark gold (#a88c3d)
            content = re.sub(r'text-\[\#a88c3d\]', 'text-rose-600', content)
            content = re.sub(r'bg-\[\#a88c3d\]', 'bg-rose-600', content)
            content = re.sub(r'border-\[\#a88c3d\]', 'border-rose-600', content)
            content = re.sub(r'shadow-\[\#a88c3d\]', 'shadow-rose-600', content)
            content = re.sub(r'via-\[\#a88c3d\]', 'via-rose-600', content)

            # Convert other themes like emerald and blue to purple/rose correctly.
            content = re.sub(r'blue-600', 'purple-600', content)
            content = re.sub(r'blue-500', 'purple-500', content)
            content = re.sub(r'blue-400', 'purple-400', content)
            content = re.sub(r'emerald-500', 'rose-500', content)
            content = re.sub(r'emerald-600', 'rose-600', content)
            content = re.sub(r'emerald-400', 'rose-400', content)

            with open(path, 'w', encoding='utf-8') as file:
                file.write(content)
