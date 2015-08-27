/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Cruzcampo',
    likes : '0',
    dislikes : '0',
    img : 'assets/images/beer1.png' 
  }, {
    name : 'Alhambra',
    likes : '0',
    dislikes : '0',
    img : 'assets/images/beer2.png' 
  }, {
    name : 'San Miguel',
    likes : '0',
    dislikes : '0',
    img : 'assets/images/beer3.png'
  },  {
    name : 'Mahou',
    likes : '0',
    dislikes : '0',
    img : 'assets/images/beer4.png'
  },  {
    name : 'Voll Damm',
    likes : '0',
    dislikes : '0',
    img : 'assets/images/beer5.png'
  },{
    name : 'Estrella Galicia',
    likes : '0',
    dislikes : '0',
    img : 'assets/images/beer1.png'
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});