const User = require('../userModel');
const Counter = require('./counterDao');

module.exports = {
    findUserByAddress: async (
        publicAddress
    ) => {
        let user = await User.findOne({address: publicAddress});
        return user;
    },

    addNewUser: async (
        // username,
        publicAddress
    ) => {
        console.log('The user have not registered, add to database...');
        // console.log(Counter.GetNextSequenceValue('user_id'));

        var nonce = Math.floor(Math.random() * 1000000);
        var user = new User({
            _id: await Counter.GetNextSequenceValue('user_id'),
            // username: username,
            address: publicAddress,
            nonce: nonce
        });

        await user.save();
    },

    refreshNonce: async (
        publicAddress
    ) => {
        console.log('Login finish, going to refresh nonce...');
        var nonce = Math.floor(Math.random() * 1000000);
        let user = await User.findOne({address: publicAddress});
        user.nonce = nonce;
        await user.save();
    }

}
