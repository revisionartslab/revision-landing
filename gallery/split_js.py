import os

file_path = r'i:\ANTIGRAVITY\revision-landing\gallery\gallery-logic.js'
data_file = r'i:\ANTIGRAVITY\revision-landing\gallery\artworks-data.js'
logic_file = r'i:\ANTIGRAVITY\revision-landing\gallery\gallery-logic-new.js'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

start_marker = 'const STREAM_RECORDS = ['
end_marker = ']; // ── AUTO-SHUFFLE ON INITIAL LOAD'

start_idx = -1
end_idx = -1

for i, line in enumerate(lines):
    if start_marker in line:
        start_idx = i
    if end_marker in line and start_idx != -1:
        end_idx = i
        break

if start_idx != -1 and end_idx != -1:
    # Extract data lines
    # We include the part after end_marker in the logic file
    data_lines = lines[start_idx : end_idx + 1]
    
    # Logic part 1 (before array)
    logic_p1 = lines[:start_idx]
    # Logic part 2 (after array)
    logic_p2 = lines[end_idx + 1:]
    
    # We'll need bridge to export/import
    with open(data_file, 'w', encoding='utf-8') as f:
        f.writelines(data_lines)
        
    with open(logic_file, 'w', encoding='utf-8') as f:
        f.writelines(logic_p1)
        f.write("\n// DATA IMPORTED FROM artworks-data.js\n")
        f.writelines(logic_p2)

    print(f"Success! Data index: {start_idx} to {end_idx}")
else:
    print(f"Error! Markers not found. Start: {start_idx}, End: {end_idx}")
