const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const keys = require("./keys");

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(new JwtStrategy(options, (jwt_payload, done) => {}));
};

/*  Info about this passport Strategy

1) options:
    is an object literal containing options to control
    how the token is extracted from the request or verified.
2) secretOrKey:
    is a string or buffer containing the secret (symmetric)
    or PEM-encoded public key (asymmetric) for verifying the token's
    signature. REQUIRED unless secretOrKeyProvider is provided.
3) jwtFromRequest:
    (REQUIRED) Function that accepts a request as the
    only parameter and returns either the JWT as a string or null.
4) jwt_payload:
     is an object literal containing
    the decoded JWT payload
5) done:
    is a passport error first callback accepting arguments done(error, user, info)


Go here for docs:
https://github.com/themikenicholson/passport-jwt

*/
