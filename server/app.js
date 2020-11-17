const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const {User} = require('./models/User');
const {auth} = require('./middleware/auth');
const mongoose = require('mongoose');

const port = 5000;

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => {
    console.log('mongodb connected...');
}).catch((err)=>{
    console.log(err);
})

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.get('/api', (req, res) => {
    res.json({
        data: 'hello react'
    })
})

app.post('/api/users/register', (req, res) => {
    
    const user = new User(req.body);

    user.save((err, doc) => {
        if(err) return res.json({success: false, err});
        return res.status(200).json({
            success: true
        })
    })

});

app.post('/api/users/login', (req, res, next)=>{

    // 요청된 이메일을 데이터 베이스에서 찾는다.
    // 있다면 비밀번호가 일치하는지 확인.
    // 비밀번호가 맞다면 토큰 생성하기.
    User.findOne({email: req.body.email}, (err, user) => {
        if(!user){
            return res.json({
                loginSuccess: false,
                message: '이메일을 확인하세요.'
            })
        }

    user.comparePassword(req.body.password, (err, isMatch)=>{
        if(!isMatch){ 
            return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."});
        }
        
        user.generateToken((err, user)=>{
            if(err) return res.status(400).send(serr);

            res.cookie('user_auth', user.token)
                .status(200)
                .json({loginSuccess: true, userId: user._id});

         })
     })  
  })
})


app.get('/api/users/auth', auth, (req, res) => {
    
    // 인증성공하면 이 라우터로 옴.
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true, //정책같은 것은 바꿀수 있음.
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
    
})

app.get('/api/users/logout', auth, (req, res)=>{

    // 첫번째인자로 해당 유저찾고. 두번째가 update 내용
    // 세번째가 콜백함수.
    User.findOneAndUpdate({_id: req.user._id},
        {token: ""},
        (err, user) =>{
            if(err) return res.json({success: false, err});
            return res.status(200).send({
                success: true
            })
        })
})



app.listen(port, () => {
    console.log(`listening on ${port}`);
})
