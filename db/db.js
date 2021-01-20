require('dotenv').config();
const mongoose = require('mongoose')

mongoose
    .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/userDB', { useNewUrlParser: true ,  useUnifiedTopology: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

mongoose.set("useCreateIndex", true)

const db = mongoose.connection

module.exports = db


