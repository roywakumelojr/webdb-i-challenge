const express = require('express');
const db = require('../data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
  db
    .select('*')
    .from('accounts')
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to get a listed of available accounts from the database' });
    });
});

router.get('/:id', (req, res) => {
  db
    .select('*')
    .from('accounts')
    .where('id', '=', req.params.id)
    .first()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to get the requested account from the database' });
    });
});

router.post('/', (req, res) => {
  db
    .insert(req.body, 'id')
    .into('accounts')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to insert the request account information' });
    });
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  db('accounts')
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to update the requested account' });
    });
});

router.delete('/:id', (req, res) => {
  db('accounts')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to delete the requested account' });
    });
});

module.exports = router;
