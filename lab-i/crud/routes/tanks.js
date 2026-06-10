var express = require('express');
var router = express.Router();
const { DatabaseSync } = require('node:sqlite');
const path = require('node:path');

const dbPath = path.resolve(__dirname, '..', 'data_dev.db');
const db = new DatabaseSync(dbPath);

router.get('/', function(req, res, next) {
    try {
        const query = db.prepare('SELECT * FROM tank');
        const tanks = query.all();
        res.render('tanks_list', { title: 'Zbrojownia', tanks: tanks });
    } catch (err) {
        next(err);
    }
});

router.get('/create', function(req, res, next) {
    res.render('tanks_create', { title: 'Dodaj nowy czołg' });
});

router.post('/create', function(req, res, next) {
    try {
        const { name, type, caliber, faction } = req.body;
        const result = db.prepare('INSERT INTO tank (name, type, caliber, faction) VALUES (?, ?, ?, ?)')
            .run(name, type, caliber, faction);
        res.redirect('/tanks/' + result.lastInsertRowid);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', function(req, res, next) {
    try {
        const query = db.prepare('SELECT * FROM tank WHERE id = ?');
        const tank = query.get(req.params.id);
        if (!tank) {
            return res.status(404).send('Nie znaleziono takiego czołgu w bazie.');
        }
        res.render('tanks_details', { title: tank.name, tank: tank });
    } catch (err) {
        next(err);
    }
});

router.get('/:id/edit', function(req, res, next) {
    try {
        const query = db.prepare('SELECT * FROM tank WHERE id = ?');
        const tank = query.get(req.params.id);
        if (!tank) {
            return res.status(404).send('Nie znaleziono takiego czołgu.');
        }
        res.render('tanks_edit', { title: 'Edycja: ' + tank.name, tank: tank });
    } catch (err) {
        next(err);
    }
});

router.post('/:id/edit', function(req, res, next) {
    try {
        const { name, type, caliber, faction } = req.body;
        db.prepare('UPDATE tank SET name = ?, type = ?, caliber = ?, faction = ? WHERE id = ?')
            .run(name, type, caliber, faction, req.params.id);
        res.redirect('/tanks/' + req.params.id);
    } catch (err) {
        next(err);
    }
});

router.post('/:id/delete', function(req, res, next) {
    try {
        db.prepare('DELETE FROM tank WHERE id = ?').run(req.params.id);
        res.redirect('/tanks');
    } catch (err) {
        next(err);
    }
});

module.exports = router;
