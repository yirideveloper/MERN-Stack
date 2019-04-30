const { googleAuth } = require('../config/keys').oauthConfig;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const randomHexGenerator = require('./../helper/others.helper').generateRandomHexString;
const bcrypt = require('bcryptjs');
const userSch = require('./../modules/user/userShema');

const emailTemplate = require('./email-render-template');

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  passport.use(
    new GoogleStrategy(
      {
        clientID: googleAuth.client_id,
        clientSecret: googleAuth.client_secret,
        callbackURL: googleAuth.redirect_uris[0],
        accessType: 'offline',
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          // Extract the minimal profile information we need from the profile object
          const existingUser = await userSch.findOne({ email: profile.emails[0].value });
          if (existingUser) {
            return cb(null, existingUser);
          }

          const randompassword = await randomHexGenerator(12);

          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(randompassword, salt);

          const newUser = new userSch({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: hash,
            email_verified: true,
            roles: ['5bf7ae90736db01f8fa21a24'],
          });

          const retuser = await newUser.save();

          let mailOptions = {
            from: '"Waft Engine"  <test@mkmpvtltd.tk>', // sender address
            to: profile.emails[0].value, // list of receivers
            subject: 'Signup using Google', // Subject line
            text: `Dear ${profile.displayName} . Your auto generated password is ${randompassword}. We request you to change it as soon as possible.`,
          };
          const tempalte_path = `${__dirname}/../email/template/googleSignUp.pug`;
          const dataTemplate = { name: profile.displayName, email: profile.emails[0].value, password: randompassword };
          emailTemplate.render(tempalte_path, dataTemplate, mailOptions);

          console.log('mail sent!');
          cb(null, retuser);
        } catch (err) {
          console.log('err:', err);
        }
      },
    ),
  );
};
