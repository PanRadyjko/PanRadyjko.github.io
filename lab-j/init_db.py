import sqlite3

conn = sqlite3.connect('data_dev.db')
conn.execute('DROP TABLE IF EXISTS tanks')
conn.execute('''
    CREATE TABLE tanks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        nation TEXT NOT NULL,
        caliber TEXT NOT NULL
    )
''')

conn.execute('INSERT INTO tanks (name, type, nation, caliber) VALUES (?, ?, ?, ?)', ('Tiger I', 'Czołg ciężki', 'Niemcy', '88 mm'))
conn.execute('INSERT INTO tanks (name, type, nation, caliber) VALUES (?, ?, ?, ?)', ('T-34-85', 'Czołg średni', 'ZSRR', '85 mm'))

conn.commit()
conn.close()
