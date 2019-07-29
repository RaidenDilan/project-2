const mongoose    = require('mongoose');
const { dbURI }   = require('../config/environment');

mongoose.Promise  = require('bluebird');
mongoose.connect(dbURI, {
  useMongoClient: true
});

const Resort = require('../models/resort');
const User = require('../models/user');

Resort.collection.drop();
User.collection.drop();

User
  .create([{
    firstname: 'Raiden',
    lastname: 'Dilan',
    username: 'raidendilan',
    email: 'raiden18@me.com',
    password: 'password',
    passwordConfirmation: 'password'
    // profileImage: 'http://icon-icons.com/icons2/510/PNG/512/ios7-contact_icon-icons.com_50286.png'
  }])
  .then((users) => {
    console.log(`${users.length} User(s) created`);
    return Resort
      .create([{
        name: 'Verbier',
        website: 'www.skiswissalps.com/index.php/en',
        country: 'Switzerland',
        city: 'Valais',
        lifts: '35',
        rating: 4,
        lat: '42.5659',
        lng: '1.6019',
        createdBy: users[0],
        comment: [ 'Awesome place' ],
        image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Verbier%2C_Switzerland%2C_in_2011.jpg'
      }]);
  })
  .then((resorts) => console.log(`${resorts.length} Resort(s) created`))
  .catch((err) => console.log('err --->', err))
  .finally(() => mongoose.connection.close());
