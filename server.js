const express=require('express')
const app=express()
const mongoose = require('mongoose')
const{PORT, mongoUri}= require('./config')
const cors=require('cors')
const morgan = require('morgan')
const bodyParser=require('body-parser')
const TodoRoute= require('./routes/api/TodoList')

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())

mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })

    .then(()=>console.log('MongoDB connected'))
    .catch((err)=>console.log(err))

app.use('/api/TodoList', TodoRoute)
app.get('/',(req,res)=>res.send('Hello world'))

app.listen(PORT, ()=>console.log(`Listening at port ${PORT}`))
