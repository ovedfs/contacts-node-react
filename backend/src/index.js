import express from "express"
import mongoose from "mongoose"
import router from "./routes/contactsRoutes.js"
import cors from 'cors'
import "dotenv/config"

const app = express()

app.use(express.json())
app.use(cors())
app.use('/contacts', router)
app.use(express.static('public'))

mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('Connection to db success!!!')
  })
  .catch(error => {
    console.log(error)
  })

app.listen(process.env.PORT, () => {
  console.log(`Server running in port http://localhost:${process.env.PORT}`)
})
