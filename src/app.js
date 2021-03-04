
// ******************
// My first node app
// ******************

// My basic node app
var express = require("express");

const { networkInterfaces } = require('os');

const nets = networkInterfaces();

let users = [];
const app = express();
const port = process.env.SAMPLE_NODE_APP_PORT || 3000;

// Initialize our users
initUsers();

var server = app.listen(port, () => {
  console.log("Server started and listening on port "+port);
});

// Now add a default GET handler
app.get("/", (req, res, next) => {
  let str = '<h1>Greetings from Node.js SampleApp!</h1>';
  str = str + '<h3>Today is '+ new Date().toLocaleString(
  'en-gb',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      })+'</h3>';
  str = str + '('+JSON.stringify(getAllIPAddrs())+')';
  res.send(str);
});

// Handle user resource (get all)
app.get("/users", (req, res, next) => {
  // console.log("Getting all users");
  res.set('Content-Type', 'application/json');
  res.json(JSON.stringify(users));
});

// Handle user resource (find)
app.get("/users/:userId", (req, res, next) => {
  // Find the requested user
  let found = false;
  const requestedId = parseInt(req.params.userId);

  for(let u of users) {
    if(u.id === requestedId) {
      found = true;
      res.json(user2JSON(u));
      break;
    }
  }

  if(!found) {
    res.status(404).send('<h3>User not found</h3>');
  }
});

function initUsers() {
  // Tony
  users.push(createUser(1, 'Tony', 23, 'tony@starkindustries.com'));

  // Lisa
  users.push(createUser(2, 'Lisa', 34, 'lisa@apple.com'));

  // Michael
  users.push(createUser(3, 'Michael', 24, 'michael@amazon.com'));

  // Emma
  users.push(createUser(4, 'Emma', 28, 'emma@amazon.com'));
}

function createUser(id, name, age, email) {
  newUser = {};
  newUser['id'] = id;
  newUser['name']= name;
  newUser['age']= age;
  newUser['email']= email;

  return newUser;
}

function user2JSON(user) {
  return {
    'id': user['id'],
    'name': user['name'],
    'age': user['age'],
    'email': user['email']
  };
}

function getAllIPAddrs() {

  const results = Object.create(null);

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      if (net.family === 'IPv4' && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }

  return results;

}

module.exports = server;