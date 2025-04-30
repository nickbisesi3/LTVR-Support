import csv

INPUT_PATH = '../data/VictoryXR Dataset.csv'
OUTPUT_PATH = '../data/VictoryXR_Dataset_FIXED.csv'
EXPECTED_COLS = 29

with open(INPUT_PATH, encoding='utf-8') as f:
    lines = f.read().replace('\r\n', '\n').replace('\r', '\n').split('\n')

header = lines[0]
rows = []
acc = []
for line in lines[1:]:
    acc.append(line)
    merged = '\n'.join(acc)
    try:
        # Use csv.reader to parse the accumulated lines
        reader = csv.reader([merged])
        row = next(reader)
        if len(row) == EXPECTED_COLS:
            # Replace real newlines in quoted fields with literal \n
            fixed_row = []
            for field in row:
                field = field.replace('\r', '').replace('\n', '\\n')
                fixed_row.append(field)
            rows.append(fixed_row)
            acc = []
    except Exception:
        pass  # Ignore parse errors for incomplete rows

with open(OUTPUT_PATH, 'w', encoding='utf-8', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(header.split(','))
    for row in rows:
        writer.writerow(row)

print(f"Fixed rows: {len(rows)} (should be 63)")
print(f"Output written to {OUTPUT_PATH}")
