const express = require('express')
const app = express()
const cors = require('cors')
const userRouter = require('./routes/userRoute')
const applicationRouter = require('./routes/applicationRoute')
const noteRouter = require('./routes/noteRoute')
const db = require('./config/database-configuration')
const cookieParser = require('cookie-parser')

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.use('/user', userRouter)
app.use('/application', applicationRouter)
app.use('/notes', noteRouter )

app.listen(3000, () => console.log("Server started"))