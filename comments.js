// Create web server
// http://localhost:3000/comments
// http://localhost:3000/comments/:id
// http://localhost:3000/comments?postId=1

const express = require('express');
const router = express.Router();

const db = require('../db');

router.get('/', (req, res) => {
  const postId = req.query.postId;
  const query = postId ? { postId } : {};

  db.find('comments', query)
    .then(comments => res.json(comments))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  db.findOne('comments', { id })
    .then(comment => {
      if (comment) {
        res.json(comment);
      } else {
        res.status(404).json({ error: 'Comment not found' });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
