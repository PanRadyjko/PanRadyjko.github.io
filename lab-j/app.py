import sqlite3
from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)
DATABASE = 'data_dev.db'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def index():
    conn = get_db_connection()
    tanks = conn.execute('SELECT * FROM tanks').fetchall()
    conn.close()
    return render_template('index.html', tanks=tanks)

@app.route('/tank/<int:tank_id>')
def show(tank_id):
    conn = get_db_connection()
    tank = conn.execute('SELECT * FROM tanks WHERE id = ?', (tank_id,)).fetchone()
    conn.close()
    if tank is None:
        return "Pojazd nie istnieje", 404
    return render_template('show.html', tank=tank)

@app.route('/tank/create', methods=('GET', 'POST'))
def create():
    if request.method == 'POST':
        name = request.form['name']
        tank_type = request.form['type']
        nation = request.form['nation']
        caliber = request.form['caliber']

        conn = get_db_connection()
        conn.execute('INSERT INTO tanks (name, type, nation, caliber) VALUES (?, ?, ?, ?)',
                     (name, tank_type, nation, caliber))
        conn.commit()
        conn.close()
        return redirect(url_for('index'))

    return render_template('create.html')

@app.route('/tank/<int:tank_id>/edit', methods=('GET', 'POST'))
def edit(tank_id):
    conn = get_db_connection()
    tank = conn.execute('SELECT * FROM tanks WHERE id = ?', (tank_id,)).fetchone()

    if request.method == 'POST':
        name = request.form['name']
        tank_type = request.form['type']
        nation = request.form['nation']
        caliber = request.form['caliber']

        conn.execute('UPDATE tanks SET name = ?, type = ?, nation = ?, caliber = ? WHERE id = ?',
                     (name, tank_type, nation, caliber, tank_id))
        conn.commit()
        conn.close()
        return redirect(url_for('index'))

    conn.close()
    return render_template('edit.html', tank=tank)

@app.route('/tank/<int:tank_id>/delete', methods=('POST',))
def delete(tank_id):
    conn = get_db_connection()
    conn.execute('DELETE FROM tanks WHERE id = ?', (tank_id,))
    conn.commit()
    conn.close()
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(port=57756, debug=True)
