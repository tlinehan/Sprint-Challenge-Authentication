const axios = require('axios');
const db = require('../database/dbConfig');
const { authenticate,
  generateToken
} = require('./middlewares');
const bcrypt = require('bcryptjs');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
  server.get('/', home);
};

function register(req, res) {
  // implement user registration
  const {username, password} = req.body;
  let newUser;
  if (!username || !password) {
    return res.status(400).json({error: 'Data Shape Requirements Not Met'}).end();
  } else if (username && password) {
    newUser = {username, password};
  }
  const hash = bcrypt.hashSync(newUser.password, 14);
  newUser.password = hash;
  db('users')
    .insert(newUser)
    .then(newId => {
      const token = generateToken(newId[0]);
      res.status(201).send(token);
    }).catch( error => res.status(500).send(error) );
}

function login(req, res, next) {
  // implement user login
  const {username, password} = req.body;
  let loginDetails;
  if (!username || !password) {
    return res.status(400).json({error: 'Data Shape Requirements Not Met'}).end();
  } else if (username && password) {
    loginDetails = {username, password};
  }
  db('users')  
    .where({username: loginDetails.username})
    .first()
    .then(function(user) {
      if (user && bcrypt.compareSync(loginDetails.password, user.password)) {
        const userId = user.id;
        const token = generateToken(userId);
        res.status(200).send(token);
      } else {
      return res.status(401).json({error: 'Incorrect credentials'});
      }
    }).catch( error => res.status(500).send(error) );
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