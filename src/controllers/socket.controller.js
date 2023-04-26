import TicketControl from '../models/ticket-control.js'

const ticketControl = new TicketControl()

export const socketController = (socket) => {
  socket.emit('last-ticket', ticketControl.last)
  socket.emit('current-state', ticketControl.lastFour)
  socket.emit('pending-tickets', ticketControl.tickets.length)

  socket.on('next-ticket', (payload, fn) => {
    const next = ticketControl.next()
    fn(next)
    socket.broadcast.emit('pending-tickets', ticketControl.tickets.length)
  })

  socket.on('atender-ticket', ({ desktop }, fn) => {
    if (!desktop) {
      return fn({
        ok: false,
        msg: 'Desktop is required'
      })
    }

    const ticket = ticketControl.attendTicket(desktop)

    socket.broadcast.emit('current-state', ticketControl.lastFour)
    socket.emit('pending-tickets', ticketControl.tickets.length)
    socket.broadcast.emit('pending-tickets', ticketControl.tickets.length)

    if (!ticket) {
      fn({
        ok: false,
        msg: 'No more pending tickets'
      })
    } else {
      fn({
        ok: true,
        ticket
      })
    }
  })
}
