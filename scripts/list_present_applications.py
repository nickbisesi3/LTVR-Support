import csv

INPUT_PATH = '../data/VictoryXR Dataset.csv'
EXPECTED_COLS = 29

with open(INPUT_PATH, encoding='utf-8') as f:
    reader = csv.reader(f)
    next(reader)  # skip header
    for idx, row in enumerate(reader, start=2):
        if len(row) == EXPECTED_COLS:
            print(row[0])
        else:
            print(f"[INVALID ROW at line {idx}]: {row[0] if row else '[EMPTY]'}")
