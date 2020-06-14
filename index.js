const express = require('express') // package.json의 dependencies의 express
const app = express()
const port = 5000


const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://groo83:Wqalmn70!@youtubeclone-kjiiw.mongodb.net/YoutubeClone?retryWrites=true&w=majority',{
    useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))



app.get('/', (req, res) => res.send('Hello World!')) // root dir일경우 hello

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))