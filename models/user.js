const mongoose  = require('mongoose');
const bcrypt    = require('bcrypt');
const s3        = require('../lib/s3');

const imageSchema = new mongoose.Schema({
  filename: { type: String },
  caption: { type: String }
});

imageSchema
  .virtual('src')
  .get(function getImageSRC(){
    if(!this.filename) return null;
    return `https://s3-eu-west-1.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${this.filename}`;
  });

const userSchema = new mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String  },
  username: { type: String },
  email: { type: String },
  profileImage: { type: String },
  password: { type: String },
  passwordconfirmation: { type: String },
  githubId: { type: String },
  images: [ imageSchema ]
});

userSchema.virtual('profileImageSRC')
.get(function getProfileImageSRC() {
  if(!this.profileImage) return null;
  if(this.profileImage.match(/^http/)) return this.profileImage;
  return `https://s3-eu-west-1.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${this.profileImage}`;
});

userSchema.virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPassword(next) {
  if(!this.password && !this.githubId) {
    this.invalidate('password', 'required');
  }
  if(this.isModified('password') && this._passwordConfirmation !== this.password) this.invalidate('passwordConfirmation', 'does not match');
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8)); // 8 - how many times the password will be encrypted
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.pre('remove', function removeImage(next) {
  if(!this.image || this.image.match(/^http/)) return next();
  s3.deleteObject({ Key: this.image }, next);
});

module.exports = mongoose.model('User', userSchema);
