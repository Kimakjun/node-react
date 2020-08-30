const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

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

// 생성시 new User , 이로직 끝나고 save 로 넘어감.
// arrow function 에서는 this 를 못찾아서 작동을 안함.
userSchema.pre('save', function (next){
    let user = this;

    // 비밀번호가 변경될때만 실행.
    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, (err, salt)=> {
            if(err){
                return next(err);
            }
            bcrypt.hash(user.password, salt, (err, hash)=>{
                if(err) return next(err);
                user.password = hash;
                next();
            });
        })
    }else{
        next();
    }


})

userSchema.methods.comparePassword = function(plainPassword, cb){
    bcrypt.compare(plainPassword, this.password, (err, isMatch)=>{
        if(err) return cb(err);
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function(cb){

    let user = this;

    const token = jwt.sign(user._id.toHexString(), 'secretToken');

    user.token = token;
    user.save((err, user)=>{
        if(err) return cb(err);
        cb(null, user);
    })

}

// 모델은 스키마를 감싸주는 역활...
const User = mongoose.model('User', userSchema);

module.exports = {User};