import express from 'express'
import env from 'dotenv'
import connectDB from './config/config.js';
import router from './Route/index.js'
import adminSeeder from './Seeders/admin.seeder.js'

env.config();

const app = express();
const PORT = process.env.PORT

app.use(express.json())
app.use('/api/v1', router)



connectDB().then( async ()=>{
  await adminSeeder()
    app.listen( PORT , ()=>{
    console.log(`Server: http://localhost:${PORT}`)
})

})
