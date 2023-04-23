import http from 'http'
import express from 'express'
import { Server as SocketServer } from 'socket.io'
import cors from 'cors'
import { socketController } from '../controllers/socket.controller.js'

class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT
    this.server = http.createServer(this.app)
    this.io = new SocketServer(this.server)

    // Middlewares
    this.middlewares()

    // Routes
    this.routes()

    // Sockets
    this.sockets()
  }

  routes () {
  }

  sockets () {
    this.io.on('connection', socketController)
  }

  middlewares () {
    this.app.use(cors())
    this.app.use(express.static('./src/public'))
  }

  listen () {
    this.server.listen(this.port, async () => {
      console.log('Socket server running at port:', this.port)
    })
  }
}

export default Server
