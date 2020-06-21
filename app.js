const express = require('express')
const bodyParser = require('body-parser')
const config = require('config')
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/api/auth', require('./routes/auth'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

if(process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}
const PORT = config.get('port') || 5000

async function start() {
    try {

        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

            
        console.log('Connected') 
        app.listen(5000, ()=> {console.log(`App is on ${PORT}`)})
    }
        catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}
start()


