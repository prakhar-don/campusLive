const express= require('express');

const app = express();
const cors= require('cors');
const dotenv= require('dotenv');
const {readdirSync}=require("fs");

const morgan= require("morgan");

app.use(morgan("dev"));
const connectDB= require("./Lib/connection");

const port=process.env.PORT || 8000;

dotenv.config();
connectDB();
app.use(cors({
    origin:process.env.CLIENT_URL,
}));
app.use(express.json());

readdirSync("./Routes").map((route)=>
    app.use("/api",require(`./Routes/${route}`)));
app.listen(port, ()=>(console.log(`Server is running on port ${port}`)));
