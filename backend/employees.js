const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM employees ORDER BY id DESC'
    );

    res.json(result.rows);

  } catch (err) {
    console.log(err);
  }
});

router.post('/', async (req, res) => {

  const { name, role } = req.body;

  try {

    const result = await pool.query(
      'INSERT INTO employees(name, role) VALUES($1,$2) RETURNING *',
      [name, role]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.log(err);
  }
});

module.exports = router;