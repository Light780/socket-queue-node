import TicketControl from '../models/ticket-control.js'

const ticketControl = new TicketControl()

export const socketController = (socket) => {
  console.log('Client connected', socket.id)

  socket.on('send-message', (payload) => {
    socket.broadcast.emit('send-message', payload)
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id)
  })
}
