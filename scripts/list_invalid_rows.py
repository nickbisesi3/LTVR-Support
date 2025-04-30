import csv

INPUT_PATH = '../data/VictoryXR Dataset.csv'
EXPECTED_COLS = 29

with open(INPUT_PATH, encoding='utf-8') as f:
    reader = csv.reader(f)
    for idx, row in enumerate(reader):
        if len(row) != EXPECTED_COLS:
            print(f"Line {idx+1}: {len(row)} columns. First column: {row[0] if row else '[EMPTY]'}")
