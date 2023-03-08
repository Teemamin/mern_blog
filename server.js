const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./db/connect')
const expressAsync = require('express-async-errors');


const app = express()
dotenv.config()

//routes
const postsRoutes = require('./routes/postRoutes')
const authRoutes = require('./routes/authRoutes')

//middleware
const errorMiddleware = require('./middleware/errorMiddleware')
const pageNotFound = require('./middleware/pageNotFound')


app.use(express.json())
app.use('/api/auth',authRoutes)
app.use('/api/posts',postsRoutes)

app.get('/', (req,res)=>{
    res.send('Welcome')
})

app.use(pageNotFound)
app.use(errorMiddleware)
const port = process.env.PORT || 5000


const start = async ()=>{
    try {
      await connectDB(process.env.MONGO_URL)  
      app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error)
    }
}

start()