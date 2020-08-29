const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, //빈공간을 없애주는 역활.
        unique: 1 // 유니크한역활.
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0,
    },
    image: String, // 축약표현.
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

// 모델은 스키마를 감싸주는 역활...
const User = mongoose.model('User', userSchema);

module.exports = {User};