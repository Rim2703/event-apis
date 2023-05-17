const express = require('express')
const app = express()
const mongoose = require('mongoose')
const route = require('./route')
app.use(express.json())


mongoose.connect("mongodb+srv://Rimsha:RimAtlas@cluster0.ij9mujl.mongodb.net/dt-assignment", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/api/v3/app', route)


app.listen(3000, () => {
    console.log('serveer is running on port 3000')
})