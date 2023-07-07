import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import { connectDB,query } from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'
import cors from 'cors'



const port = process.env.PORT
const app = express()
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
connectDB(); 

app.use('/api/users', userRoutes)

app.get('/', (req,res) => res.send("Sever is ready"))

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Server start on port ${port}`) )