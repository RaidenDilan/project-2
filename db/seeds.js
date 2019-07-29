const mongoose   = require('mongoose');
const { dbURI }  = require('../config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(dbURI, { useNewUrlParser: true });

const Resort = require('../models/resort');
const User   = require('../models/user');

Resort.collection.drop();
User.collection.drop();

User
  .create([
    {
      firstname: 'Raiden',
      lastname: 'Dilan',
      username: 'raidendilan',
      email: 'raiden18@me.com',
      password: 'password',
      passwordConfirmation: 'password',
      profileImage: 'http://cdn.onlinewebfonts.com/svg/img_568656.png'
    }
    // ,{
    //   firstname: 'Luca',
    //   lastname: 'Ancelotti',
    //   username: 'lucaancelotti',
    //   email: 'luca@me.com',
    //   password: 'password',
    //   passwordConfirmation: 'password',
    //   profileImage: 'http://cdn.onlinewebfonts.com/svg/img_568656.png'
    // },{
    //   firstname: 'Rawand',
    //   lastname: 'Dilan',
    //   username: 'rawanddilan',
    //   email: 'rawand@me.com',
    //   password: 'password',
    //   passwordConfirmation: 'password',
    //   profileImage: 'http://cdn.onlinewebfonts.com/svg/img_568656.png'
    // }
  ])
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
      }, {
        name: 'La Plagne',
        website: 'https://www.la-plagne.com/',
        country: 'France',
        city: 'La Plagne',
        lifts: '20',
        rating: 3,
        lat: '45.5224382',
        lng: '6.6572824',
        createdBy: users[0], // user[1]
        comment: [ 'Looks Dope!' ],
        image: 'https://img5.onthesnow.com/image/xl/76/76654.jpg'
      }]);
  })
  .then((resorts) => console.log(`${resorts.length} Resort(s) created`))
  .catch((err) => console.log('DB err --->', err))
  .finally(() => mongoose.connection.close());
