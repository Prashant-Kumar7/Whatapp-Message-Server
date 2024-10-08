import express from "express"
import cors from "cors"

const port = 5000

const app = express()

app.use(express.json())
app.use(cors())


app.listen(5000 , ()=>{
    console.log(`bot server is running on port ${port}`)
})