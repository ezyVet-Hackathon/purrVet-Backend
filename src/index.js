import express from 'express'
import http from 'http'
import socketIo from 'socket.io'
import config from './config'
import { vetRoute } from './routes'
// import { checkFirebaseToken } from './middleware'
// import { onConnection } from './socket'
import cors from 'cors'
import morgan from 'morgan'

const PORT = config.port || 5000

const app = express()
app.use(cors({
  origin: "*",
  methods: "*",
  allowedHeaders: "*",
  optionsSuccessStatus: 204
}))
const server = http.createServer(app)
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

// io.use(handleAuth)
// onConnection(io)

if (config.NODE_ENV !== "production") {
  app.use(morgan('dev'))
}

app.get("", async (req, res) => {
  return res.status(200).send(
    "<p>Welcome to purrVet Finder's Backend :)</p>" +
    "<p>Bye. Have a good day!</p>"
  )
})
app.use(express.json())
// app.use("", checkFirebaseToken)

app.use(
  "",
  vetRoute
)

server.listen(PORT, () => {
  console.log(`purrVet Finder Server is running on port ${PORT}`)
})

export default app