import passport, { session } from 'passport';
import BearerStrategy from 'passport-http-bearer';
import { User } from '../models/user.model';


const BStrategy = BearerStrategy.Strategy

passport.use(
  new BStrategy((token: any, done) => {
    User.findOne({ token }, (err: any, user: any) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      return done(null, user, { scope: 'all' });
    });
  })
);
