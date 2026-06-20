import express from 'express'
import env from 'dotenv'
import connectDB from './config/config.js';

env.config();

const app = express();
const PORT = process.env.PORT

app.use(express.json())

app.get('/', (req,res)=>{
   res.json({
     message: 'JobPortal API Ready! '
   })
})

connectDB().then(()=>{

    app.listen( PORT , ()=>{
    console.log(`Server: http://localhost:${PORT}`)
})

})
