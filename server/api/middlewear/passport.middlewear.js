const passport = require('passport');
const JWTSrategy = require('passport-jwt').Strategy;
const assert = require('assert');

const { User } = require('../../db/Models');

const tokenExtractor = (req) => {
    // look for cookie "token" first
    const token = req.cookies?.token || req.get('Authorization').replace('Bearer ', '');

    return token;
};

passport.use(new JWTSrategy({
    jwtFromRequest: tokenExtractor,
    secretOrKey: process.env.JWT_SECRET
}, async (jwtPayload, done) => {
    try{
        const userId = jwtPayload.id;
        // fetch user by id
        const user = await User.findById(userId);
        assert(user, 'Please login again.');
        
        done(null, {
            ...user.toJSON(),
            id: user._id,
        });
    } catch(err){
        return done(err);
    }
}));