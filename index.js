const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const port = 5000;

const config = require('./config/key');

const {User} = require('./models/User');
const mongoose = require('mongoose');

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

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.post('/register', (req, res) => {
    
    const user = new User(req.body);

    user.save((err, doc) => {
        if(err) return res.json({success: false, err});
        return res.status(200).json({
            success: true
        })
    })

});

app.post('/login', (req, res, next)=>{

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



app.listen(port, () => {
    console.log(`listening on ${port}`);
})
