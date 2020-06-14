if(process.env.NODE_ENV === 'production'){
    // 배포환경일 경우
    module.exports = require('./prod');
}else{
    // 개발환경일 경우
    module.exports = require('./dev');
}