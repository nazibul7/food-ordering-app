import express from "express"
import CORS from "cors"
import "dotenv/config"

const app = express()

app.use(express.json())
app.use(CORS())

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is listening on port ${process.env.PORT || 3000}`);
})