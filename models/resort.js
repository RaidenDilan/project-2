const mongoose  = require('mongoose');
// const s3        = require('../lib/s3');

const commentSchema = new mongoose.Schema({
  content: { type: String },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User'}
}, {
  timestamps: true
});

commentSchema.methods.ownedBy = function ownedBy(user) {
  return this.createdBy.id === user.id;
};

const resortSchema = new mongoose.Schema({
  name: { type: String, required: true },
  website: { type: String, required: true  },
  lifts: { type: String },
  country: { type: String, required: true  },
  city: { type: String, required: true  },
  rating: { type: String, required: true  },
  lat: { type: String },
  lng: { type: String },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User',  required: true },
  image: { type: String, required: true  },
  comments: [ commentSchema ]
});

resortSchema
  .virtual('imageSRC')
  .get(function ImageSRC() {
    if(!this.image) return null;
    if(this.image.match(/^http/)) return this.image;
    return `https://s3-eu-west-1.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${this.image}`;
  });


resortSchema.methods.ownedBy = function ownedBy(user) {
  return this.createdBy.id === user.id;
};

module.exports = mongoose.model('Resort', resortSchema);
