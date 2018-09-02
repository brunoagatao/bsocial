const User = require('../../models/User');

const handlers = {
  signup: async (req, h) => {
    const user = await User.findOne({ 'email': req.payload.email });
    if (user) return h.response('This email has already been registered. Try again with another email.').code(500);

    const newUser = new User({
      name: req.payload.name,
      email: req.payload.email,
      password: req.payload.password
    });

    await newUser.save();
    return h.response('Successfully signed up!');
  },

  login: async (req, h) => {
    const user = await User.findOne({ 'email': req.payload.email, 'password': req.payload.password });
    if (!user) return h.response('Login credentials are invalid..').code(500);

    req.cookieAuth.set({
      'user': user.email,
      'memberId': user.memberId,
      'name': user.name
    });

    return h.response('Successfully logged in!');
  }
};

const routes = [
  {
    method: 'POST',
    path: '/signup',
    handler: (req, h) => {
      return handlers
        .signup(req, h)
        .catch((err) => h.response(err).code(500));
    }
  },
  {
    method: 'POST',
    path: '/login',
    handler: (req, h) => {
      return handlers
        .login(req, h)
        .catch((err) => h.response(err).code(500));
    }
  }
];

exports.routes = (server) => server.route(routes);