import passport from 'passport'
import 'dotenv/config'
import { ExtractJwt as ExtractJWT, Strategy as JWTStrategy } from 'passport-jwt'
const db = require("../db/models");
const User = db.User;
const Op = db.Sequelize.Op;

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_TOKEN,
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findByPk(jwtPayload.id)
        return done(null, user)
      } catch (error) {
        return done(error)
      }
    },
  ),
)
