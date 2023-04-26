
const lblOnline = document.querySelector('#lblOnline')
const lblOffline = document.querySelector('#lblOffline')
const txtMensaje = document.querySelector('#txtMsg')
const btnEnviar = document.querySelector('#btnSend')

// eslint-disable-next-line no-undef
const socket = io()

socket.on('connect', () => {
  lblOffline.style.display = 'none'
  lblOnline.style.display = 'inline'
})

socket.on('disconnect', () => {
  lblOnline.style.display = 'none'
  lblOffline.style.display = 'inline'
})

btnEnviar.addEventListener('click', () => {
  const message = txtMensaje.value
  const payload = {
    message,
    id: socket.id,
    date: new Date().getTime()
  }

  socket.emit('send-message', payload)
})
