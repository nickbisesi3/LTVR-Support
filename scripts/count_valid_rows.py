import csv

INPUT_PATH = '../data/VictoryXR Dataset.csv'
EXPECTED_COLS = 29

with open(INPUT_PATH, encoding='utf-8') as f:
    reader = csv.reader(f)
    rows = list(reader)

valid_rows = [row for row in rows if len(row) == EXPECTED_COLS]

print(f"Total rows: {len(rows)} (including header)")
print(f"Valid card rows (with {EXPECTED_COLS} columns): {len(valid_rows)-1} (excluding header)")
print(f"Header columns: {len(rows[0])}")
if len(valid_rows) == 64:
    print('CSV is structurally correct for 63 cards + 1 header.')
else:
    print('CSV is NOT structurally correct. Check for missing or excess rows.')
