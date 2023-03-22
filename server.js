const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./db/connect')
const expressAsync = require('express-async-errors');
const cookieParser = require('cookie-parser')
const fs = require('fs');
const path = require('path');


const app = express()
dotenv.config()


//routes
const postsRoutes = require('./routes/postRoutes')
const authRoutes = require('./routes/authRoutes')

//middleware
const errorMiddleware = require('./middleware/errorMiddleware')
const pageNotFound = require('./middleware/pageNotFound')


// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });
 
// const upload = multer({ storage: storage });

app.use(express.json())
app.use(cookieParser())
app.get('/api',(req,res)=>{
    res.json({msg: 'hello from express'})
})
app.use('/api/auth',authRoutes)
app.use('/api/posts', postsRoutes)


 


app.get('/api', (req,res)=>{
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