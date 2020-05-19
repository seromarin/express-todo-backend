import passport, { session } from 'passport';
import localStrategy from 'passport-local';
import BearerStrategy from 'passport-http-bearer';
import JwtStrategy from 'passport-jwt';
import { User } from '../models/user.model';

const LStrategy = localStrategy.Strategy;
const BStrategy = BearerStrategy.Strategy;
const JWTStrategy = JwtStrategy.Strategy;
const ExtractJwt = JwtStrategy.ExtractJwt;

const opts: IJWTStrategy = {
  // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  jwtFromRequest : ExtractJwt.fromUrlQueryParameter('secret_token'),
  secretOrKey: 'secret',
  // issuer: 'accounts.examplesoft.com',
  // audience: 'yoursite.net',
}

// Create a passport middleware to handle user registration
passport.use('signup', new LStrategy({
  usernameField : 'email',
  passwordField : 'password'
}, async (email, password, done) => {
    try {
      // Save the information provided by the user to the the database
      const user = await User.create({ email, password });
      // Send the user information to the next middleware
      return done(null, user);
    } catch (error) {
      done(error);
    }
}));

// Create a passport middleware to handle User login
passport.use('login', new LStrategy({
  usernameField : 'email',
  passwordField : 'password'
}, async (email, password, done) => {
  try {
    // Find the user associated with the email provided by the user
    const user = await User.findOne({ email }).exec();
    console.log('user :>> ', user);
    if( !user ){
      // If the user isn't found in the database, return a message
      return done(null, false, { message : 'User not found'});
    }
    // Validate password and make sure it matches with the corresponding hash stored in the database
    // If the passwords match, it returns a value of true.
    // const validate = await user.isValidPassword(password);
    // if( !validate ){
    //   return done(null, false, { message : 'Wrong Password'});
    // }
    // Send the user information to the next middleware
    return done(null, user, { message : 'Logged in Successfully'});
  } catch (error) {
    return done(error);
  }
}));

// This verifies that the token sent by the user is valid
passport.use(new JWTStrategy({
  // secret we used to sign our JWT
  secretOrKey : 'top_secret',
  // we expect the user to send the token as a query parameter with the name 'secret_token'
  jwtFromRequest : ExtractJwt.fromUrlQueryParameter('secret_token')
}, async (token, done) => {
  try {
    // Pass the user details to the next middleware
    return done(null, token.user);
  } catch (error) {
    done(error);
  }
}));

// passport.use(
//   'bearer',
//   new BStrategy((token: any, done) => {
//     User.findOne({ token }, (err: any, user: any) => {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false);
//       }
//       return done(null, user, { scope: 'all' });
//     });
//   })
// );

interface IJWTStrategy {
  jwtFromRequest: any;
  secretOrKey: string;
  issuer?: string;
  audience?: string;
}