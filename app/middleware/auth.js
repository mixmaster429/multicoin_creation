import passport from 'passport'

export const auth = async (req, res, next) => {
  return passport.authenticate(
    'jwt',
    {
      session: false,
    },
    (err, user) => {
      if (err) {
        return next(err)
      }
      if (!user || user.deactivated) {
        return res.status(500).send({"error": "UnauthorizedError"})
      }
      req.user = user
      next()
    },
  )(req, res, next)
}

export const adminAuth = async (req, res, next) => {
  return passport.authenticate(
    'jwt',
    {
      session: false,
    },
    (err, user) => {
      if (err) {
        return next(err)
      }
      if (!user || user.deactivated) {
        return res.status(500).send({"error": "UnauthorizedError"})
      }
      if (user.type != 'admin') {
        return res.status(500).send({"error": "PermissionError"})
      }
      req.user = user
      next()
    },
  )(req, res, next)
}
