const axios = require('axios');
const db = require('../database/dbConfig');
const { authenticate,
  generateToken
} = require('./middlewares');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
  server.get('/', home);
};

function register(req, res) {
  // implement user registration
  const newUser = req.body;
  db('users')
    .insert(newUser)
    .then(newId => {
      const token = generateToken(newId);
      res.status(201).send(token);
    })
    .catch(err => res.send(err));
}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}

function home (req, res) {
  res.send('Rock-n-Roll!!');
}