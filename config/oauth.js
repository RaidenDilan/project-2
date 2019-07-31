module.exports = {
  github: {
    loginURL: 'https://github.com/login/oauth/authorize',
    accessTokenURL: 'https://github.com/login/oauth/access_token',
    profileURL: 'https://api.github.com/user',
    clientId: process.env.PR2_GITHUB_CLIENT_ID,
    clientSecret: process.env.PR2_GITHUB_CLIENT_SECRET,
    scope: 'user:email',
    getLoginURL() {
      return `${this.loginURL}?client_id=${this.clientId}&scope=${this.scope}`;
    }
  }
  // instagram: {
  //   loginURL: 'https://instagram.com/oauth/authorize',
  //   accessTokenURL: 'https://instagram.com/oauth/access_token',
  //   profileURL: 'https://api.instagram.com/user',
  //   clientId: process.env.PR2_INSTAGRAM_CLIENT_ID,
  //   clientSecret: process.env.PR2_INSTAGRAM_CLIENT_SECRET,
  //   scope: 'user:email',
  //   getLoginURL() {
  //     return `${this.loginURL}?client_id=${this.clientId}&scope=${this.scope}`;
  //   }
  // },
  // facebook: {
  //   loginURL: 'https://www.facebook.com/v2.8/dialog/oauth',
  //   accessTokenURL: 'https://graph.facebook.com/v2.8/oauth/access_token',
  //   profileURL: 'https://api.facebook.com',
  //   clientId: process.env.PR2_FACEBOOK_CLIENT_ID,
  //   clientSecret: process.env.PR2_FACEBOOK_CLIENT_SECRET,
  //   scope: 'user:email',
  //   getLoginURL() {
  //     return `${this.loginURL}?client_id=${this.clientId}&redirect_uri=https://polar-plains-57938.herokuapp.com/oauth/facebook`;
  //   }
  // }
};
