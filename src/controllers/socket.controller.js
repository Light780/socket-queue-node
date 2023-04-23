export const socketController = (socket) => {
  console.log('Client connected', socket.id)

  socket.on('send-message', (payload) => {
    socket.broadcast.emit('send-message', payload)
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id)
  })
}
