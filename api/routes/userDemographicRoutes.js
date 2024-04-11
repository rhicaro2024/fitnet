const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const router = express.Router();


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'summer2024',
  database: 'FitNet_db',
});

router.use(bodyParser.json());

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

router.get('/api/userdemographics', (req, res) => {
  const query = 'SELECT * FROM user_demographics';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error querying MySQL:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('User accounts from the Database:', results);
      res.json(results);
    }
  });
});

router.get('/api/userdemographics/:first_name/:last_name', (req, res) => {
  const { first_name, last_name } = req.params;
  const query = 'SELECT * FROM user_demographics WHERE first_name = ? AND last_name = ?';
  db.query(query, [first_name, last_name], (err, results) => {
    if (err) {
      console.error('Error querying MySQL:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log(first_name, last_name, 'account from the database', results);
      res.json(results);
    }
  });
});

router.post('/api/userdemographics/register', (req, res) => {
  const userData = req.body;
  const {user_id ,first_name, last_name, user_username, user_password, user_email, user_phone, user_status, 
    user_location, user_activity, user_sex, user_price, user_bio, monday, tuesday, wednesday, thursday, 
    friday, saturday, sunday } = userData;

  const query = 'INSERT INTO user_demographics (user_id, first_name, last_name, user_username, user_password, user_email, user_phone, user_status, user_location, user_activity, user_sex, user_price, user_bio, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  
  db.query(query, [user_id ,first_name, last_name, user_username, user_password, user_email, user_phone, user_status, 
    user_location, user_activity, user_sex, user_price, user_bio, monday, tuesday, wednesday, thursday, friday, 
    saturday, sunday], (err, result) => {
    if (err) {
      console.error('Error registering user:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('User registered successfully');
      res.status(200).send('User registered successfully');
    }
  });
});

router.get('/api/userdemographics/:username', (req, res) => {
  const { username } = req.params;
  const query = 'SELECT * FROM user_demographics WHERE user_username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error querying MySQL:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

router.post('/api/userdemographics/login/:username', (req, res) => {
  const { username } = req.params;
  const { user_password } = req.body;
  const query = 'SELECT * FROM user_demographics WHERE user_username = ?';
  
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error querying MySQL:', err);
      res.status(500).send('Internal Server Error');
    } else {
      if (results.length === 0) {
        res.status(404).send('User not found');
      } else {
        const user = results[0];
        if (user.user_password === user_password) {
          // Passwords match, login successful
          res.status(200).json({ message: 'Login successful', user });
        } else {
          // Passwords don't match
          res.status(401).send('Incorrect password');
        }
      }
    }
  });
});

router.put('/api/userdemographics/:first_name/:last_name', (req, res) => {
  const { first_name, last_name } = req.params;
  const updatedData = req.body;
  
  // Construct the UPDATE query
  const query = 'UPDATE user_demographics SET ? WHERE first_name = ? AND last_name = ?';
  
  db.query(query, [updatedData, first_name, last_name], (err, result) => {
    if (err) {
      console.error('Error updating user information:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('User information updated successfully');
      res.status(200).send('User information updated successfully');
    }
  });
});

module.exports = router;
