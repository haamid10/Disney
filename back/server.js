const express = require ("express")
const app = express();
const mongoose = require('mongoose')
const dotenv= require('dotenv')
const authRoute = require('./routes/auth')

dotenv.config()
mongoose.connect(process.env.MONGO,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> console.log('db connection successful!'))
.catch(()=> console.log(err));

app.use(express.json())
app.use("/api/auth", authRoute)
app.listen(8080,() => {
    console.log("Server is running on port 8080")
})