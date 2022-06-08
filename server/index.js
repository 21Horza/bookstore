require('dotenv').config();
const cors = require('cors');
const express = require('express');

const userRouter = require('./routers/userRouter');
const bookRouter = require('./routers/bookRouter');
const fileRouter = require('./routers/fileRouter');

const PORT = process.env.PORT || 7000

const app = express();

app.use(cors());
app.use(express.json());


app.use("/user", userRouter)
app.use("/books", bookRouter)
app.use("/storage", fileRouter);

async function start() {
    try {
        app.listen(PORT, () => {
            console.log(`Server started on ${PORT} PORT`)
        })
    } catch (e) {
        console.log(e)
    }
}

start();