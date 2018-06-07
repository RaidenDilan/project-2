<center><h1>GA WDI London - Project 2 March 2017</h1></center>

<center><h1>Project 2: Resorts</h1></center>

<p>A fully authenticated Express app written in ES6. Users are able to share images of the resorts they visited. Using the Wunderground API really gave the app a bespoke feel to the UX experience. A RESTful app focussed around holiday
resorts, this app locates resorts of any kind around the world and users are able to store the resorts.
</p>

<center>[Launch Application!](https://resorts.herokuapp.com)</center>

![Imgur](http://i.imgur.com/DrPiIQA.png)

<center><h1>Approach</h1></center>

Logged In users can create a profile, including upload a profile image. They can also upload images from their trips to their profile feed for other user's to view. All resorts are RESTful and users can comment on a resort and others resorts.

<center><h1>Technologies Used</h1></center>

* JavaScript, Express, MongoDB, Node.js, HTML5, SCSS, jQuery were used to create the application.
* Pictures are base64 encoded and stored using the AWS S3 service.
* Weather Undeground was used to give forecast information.
* Google Maps Autocomplete and Google Places was used to disply resort location.
* The Google Web Font 'Raleway' has been used to style the application.
* Sketch was used to create the sites favicon.

<center><h1>Challenges & Problems</h1></center>

The challenge I had whilst building the application was implementing the Weather Underground API. I had to first find the resort and then make a subsequent request to the Weather Underground API. The other challengin part was displaying a page with all the users to view their profiles with their images feed. Sadly I had a week and didn't get to finish it in time to make it part of my app.

I would have liked to have taken the app further and giving more of an incentive to create a resort and give flights information from the Skyscanner API. I would have also like to give users the ability to view other user's profiles like their friends to see their images in their feeds.

<center><h1>Screenshot 1</h1></center>

![Imgur](http://i.imgur.com/D0Hywst.png)

<center><h1>Screenshot 2</h1></center>

![Imgur](http://i.imgur.com/tCwAlAW.png)

<center><p><strong>Features & Bugs</strong></p></center>

After a very long struggle, the gitHub & Facebook login, although working on localhost in development, it does not work when implemented with heroku.

<h3>Project Forking</h3>

<h5>In Terminal</h5>
* npm i && bower i && node db/seeds

<center><h4>Copyright © Resorts</h4></center>
