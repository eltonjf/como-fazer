const express = require('express')
const app = express()

app.set('view engine', 'ejs')

const port = process.env.PORT || 3000

let i = 10
app.get('/', (req, response) => {
    i++
    response.send(`<h1>Olá Fullstack Lab ${i}</h1>`)
})

app.listen(port, (err) => {
    if(err){
        console.log('Error')
    }else{
        console.log("Como-fazer Server is Running...")
    }
})