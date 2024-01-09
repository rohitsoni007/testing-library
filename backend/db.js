const mongoose = require('mongoose');


async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/testing-library');
        console.log('===== mongoDB connected =====');
    } catch (error) {
        console.log('error', error);
    }
}
connect();