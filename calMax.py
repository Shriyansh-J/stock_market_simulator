import json

with open('./stockmarket-simulation-export.json') as f:
    data = json.load(f)

db = data['users']

storage = []

for id in db:
    storage.append(db[id])

storage.sort(key=lambda x: x['amount'], reverse=True)

print(storage)
