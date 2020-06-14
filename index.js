const express = require('express') // package.json의 dependencies의 express
const app = express()
const port = 5000

const { User } = require("./models/User");
const bodyParser = require('body-parser'); // 서버에서 데이터를 끌어오는 역할

const config = require('./config/key');


// bodyParser 옵션추가
// application/x-www-form-urlencoded 형태의 데이터를 가지고오기위해 
app.use(bodyParser.urlencoded({extended: true}));
// application/json 형태의 데이터를 가지고오기위해 
app.use(bodyParser.json());


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))



app.get('/', (req, res) => res.send('Hello World! 안녕하세오')) // root dir일경우 hello

//route
app.post('/register',(req, res) => {
    // 회원가입시 필요한 정보들을 client에서 가져오면
    // DB에 넣어준다.
    
    const user = new User(req.body)

    user.save((err, userInfo) => {
        if(err) return res.json({success: false, err})
        // 성공시
        return res.status(200).json({
            success : true
        })
    })
})



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))