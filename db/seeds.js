require('dotenv').config();
const { dbURI, dbOPS } = require('../config/environment');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose
  .connect(dbURI, dbOPS);
  // .then(res => console.log('DB Connected'))
  // .catch(err => console.log('DB Connection Failed ', err));

const Resort = require('../models/resort');
const User = require('../models/user');

Resort.collection.drop();
User.collection.drop();

User
  .create([{
    firstname: 'Raiden',
    lastname: 'Dilan',
    username: 'raidendilan',
    email: 'raiden@gmail.com',
    password: 'raiden20',
    passwordConfirmation: 'raiden20',
    profileImage: 'http://cdn.onlinewebfonts.com/svg/img_568656.png'
  }, {
    firstname: 'Luca',
    lastname: 'Ancelotti',
    username: 'lucaancelotti',
    email: 'luca@gmail.com',
      password: 'luca20',
    passwordConfirmation: 'luca20',
    profileImage: 'http://cdn.onlinewebfonts.com/svg/img_568656.png'
  }])
  .then((users) => {
    console.log(`${users.length} User(s) created`);

    return Resort
      .create([{
        name: 'Verbier',
        website: 'www.skiswissalps.com/index.php/en',
        country: 'Switzerland',
        city: 'Valais',
        lifts: '67',
        rating: 4,
        lat: '42.5659',
        lng: '1.6019',
        createdBy: users[0],
        // comment: [ 'Awesome place' ],
        image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Verbier%2C_Switzerland%2C_in_2011.jpg'
      }, {
        name: 'La Plagne',
        website: 'https://www.la-plagne.com/',
        country: 'France',
        city: 'La Plagne',
        lifts: '20',
        rating: 3,
        lat: '45.5224382',
        lng: '6.6572824',
        createdBy: users[1],
        // comment: ['Looks Dope!'],
        image: 'https://img5.onthesnow.com/image/xl/76/76654.jpg'
      }]);
  })
  .then((resorts) => console.log(`${resorts.length} Resort(s) created`))
  .catch((err) => console.log('DB error ----->', err))
  .finally(() => mongoose.connection.close());
