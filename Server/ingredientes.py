import sqlite3

ingredientes = [
  "apples",
  "bananas",
  "clemintines",
  "dill",
  "eggs",
  "flour",
  "granola",
  "honey",
  "ice cream",
  "juice",
  "ketchup",
  "lemon",
  "margarine",
  "onion",
  "potatoes",
  "rosmary",
  "salt",
  "thyme",
  "vinegar",
  "watermelon",
  "pears",
  "cucumbers",
  "garlic",
  "carrots",
  "pastries",
  "eggplants",
  "milk",
  "coffee",
  "tea",
  "rice",
  "noodles",
  "lentils",
  "sweet potatoes",
  "strawberries",
  "cranberries",
  "mangos",
  "pappers",
  "zuccinis",
  "lime",
  "broth",
  "mushrooms",
  "chicken",
  "beef",
  "pork",
  "fish",
  "cream",
  "paprika",
  "tumeric",
  "cinamon",
  "pumpkin",
  "basil",
  "tomatoes",
  "bread",
  "cake",
  "chocolate",
  "gum",
  "pinapple",
  "oranges",
  "lettuce",
  "cheese",
  "cilantro"
]

ingredientes = sorted(ingredientes)

with sqlite3.connect("ingredientes.db") as connection:
    cursor = connection.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS ingredientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
    )
    """)

cursor.executemany("INSERT INTO ingredientes (name) VALUES (?)", [(item,) for item in ingredientes])
print(f"{len(ingredientes)} ingredientes adicionados.")