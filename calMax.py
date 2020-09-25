import json
import xlsxwriter

workbook = xlsxwriter.Workbook('Example.xlsx')
worksheet = workbook.add_worksheet("My sheet")

with open('./stockmarket-simulation-export.json') as f:
    data = json.load(f)

db = data['users']

storage = []

for id in db:
    storage.append(db[id])

storage.sort(key=lambda x: x['amount'], reverse=True)

print(storage)

row = 0
col = 0

for obj in storage:
    worksheet.write(row, col, obj["username"])
    worksheet.write(row, col+1, obj["amount"])
    worksheet.write(row, col+2, obj["email"])
    row += 1

workbook.close()
