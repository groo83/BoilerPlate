const mongoose = require('mongoose');
// schema를 감싸는 모델 생성 
const userSchema = mongoos.Schema({
    name: {
        type: String,
        maxlength : 50
    },
    email:{
        type: String,
        trim: true, // space 제거
        unique: 1
    },
    password:{
        type: String,
        maxlength : 5
    },
    lastname: {
        type: String,
        maxlength : 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp:{ // token 유효기간
        type: Number
    }

})

const User = mongoose.model('User', userSchema)

module.exports = {User}