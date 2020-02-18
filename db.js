const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const connect = () => {
    return mongoose.connect(
        process.env.DB_CONNECT, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false
        })
        .then(() => {
            console.log('MONGODB CONNECTED')
        })
        .catch(err => {
            console.log(err)
        })
};

module.exports = connect;