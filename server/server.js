import express from "express"
import cors from "cors"
import * as dotenv from 'dotenv' 
import bodyParser from "body-parser"
import connect from "./database/mongodb.js"
import passport from 'passport';
import passpostConfig from './config/passport.js';
import routes from './routes/index.js'


dotenv.config()

const PORT = 4000
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(passport.initialize())
passpostConfig(passport);

app.get('/', (req, res) => {
    res.json("Hello World")
})

app.use('/',routes)

await connect();


app.listen(PORT, () => {
    console.log(`Server Running at Port:${PORT}`)
})