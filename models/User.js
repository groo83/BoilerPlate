const mongoose = require('mongoose'); // npm install module
const bcrypt = require('bcrypt');
const saltRounds = 10;// 자리수


// schema를 감싸는 모델 생성 
const userSchema = mongoose.Schema({
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

userSchema.pre('save',function( next ){
    var user = this; // schema

    // 오직 비번값변경시에만 실행되도록.
    if(user.isModified('password')){
        // 비밀번호 암호화 (npmjs의 tech1 copy)
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash){ //(평문,)
                if(err) return next(err)
                // 성공이면 hash된 비번으로 변경
                user.password = hash 

                // next 함수 => index.js의 save 함수 로직타도록
                next()
            }) 
        })
    }else{
        next()
    }
})


userSchema.methods.comparePassword = function(plainPassword, callback){
    // 암호화시켜 비교
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return callback(err),
                callback(null, isMatch)
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }