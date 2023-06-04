import express  from "express"
import route from "./routes/voluntarioRoute.js"
import cors from 'cors'

const app = express()


app.use(cors({
    origins:"*",
    methods:"GET,HEAD,PATCH,POST,DELETE,PUT",
    preflightContinue: false,
    optionsSuccessStatus: 204
}))

app.use(express.urlencoded({extended:true}))

app.use(express.json())

app.use("/voluntario",route)

app.get("/",(req,res)=>{
    res.send("Olá")
})

app.listen(3000)