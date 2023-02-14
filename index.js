const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const morgan = require("morgan")


// Loading environment variables 
dotenv.config();

const app = express();
app.use(morgan("common"));


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log("DB connected"))
    .catch((e) => console.log(e))


// Parsing json body from the request
app.use(express.json());


const userRoute = require("./routes/userData")
app.use(userRoute)

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", (req, res) => {
        return res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(PORT)

// server file h yaha se run krra h server
