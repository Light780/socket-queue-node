// HTML References
const lblDesktop = document.querySelector('h1')
const btnAttend = document.querySelector('button')
const lblTicket = document.querySelector('small')
const divAlert = document.querySelector('.alert')
const lblPendings = document.querySelector('#lblPendings')

const searchParams = new URLSearchParams(window.location.search)

if (!searchParams.has('desktop')) {
  window.location = 'index.html'
  throw new Error('Desktop is required')
}

const desktop = searchParams.get('desktop')
lblDesktop.innerText = desktop

divAlert.style.display = 'none'

// eslint-disable-next-line no-undef
const socket = io()

socket.on('connect', () => {
  btnAttend.disabled = false
})

socket.on('disconnect', () => {
  btnAttend.disabled = true
})

socket.on('pending-tickets', (pendings) => {
  if (pendings === 0) {
    lblPendings.style.display = 'none'
  } else {
    lblPendings.style.display = 'block'
    lblPendings.innerText = pendings
  }
})

btnAttend.addEventListener('click', () => {
  socket.emit('attend-ticket', { desktop }, ({ ok, ticket, msg }) => {
    if (!ok) {
      lblTicket.innerText = 'No one.'
      divAlert.style.display = 'block'
      return
    }

    lblTicket.innerText = 'Ticket ' + ticket.number
  })
})
