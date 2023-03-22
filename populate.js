const fs  = require('fs').promises
// import { readFile } from 'fs/promises';

const dotenv = require('dotenv')
dotenv.config();


const connectDB = require('./db/connect')
const Post = require('./model/post')
const Comment = require('./model/comment')


const start = async ()=>{

    try {
        await connectDB(process.env.MONGO_URL);
        let jsonPosts =  JSON.parse( await fs.readFile('mockData.json'))
        // await Comment.deleteMany();
        await Post.create(jsonPosts);
        console.log('Success!!!!');
        process.exit(0);
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()