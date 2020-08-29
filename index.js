const express = require('express');
const app = express();
const port = 5000;
const {User} = require('./models/User');


const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://kimhakjun:gkrwns123@boilerplate.fidoa.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => {
    console.log('mongodb connected...');
}).catch((err)=>{
    console.log(err);
})

app.use(express.json());
app.use(express.urlencoded({extended: false}));

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

app.listen(port, () => {
    console.log(`listening on ${port}`);
})
