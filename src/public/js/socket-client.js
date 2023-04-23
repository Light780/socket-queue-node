const lblOnline = document.getElementById('lblOnline')
const lblOffline = document.getElementById('lblOffline')
const txtMsg = document.getElementById('txtMsg')
const btnSend = document.getElementById('btnSend')

// eslint-disable-next-line no-undef
const socket = io()

socket.on('connect', () => {
  lblOffline.style.display = 'none'
  lblOnline.style.display = 'inline'
})

socket.on('disconnect', () => {
  lblOffline.style.display = 'inline'
  lblOnline.style.display = 'none'
})

socket.on('send-message', (payload) => {
  console.log(payload)
})

btnSend.addEventListener('click', () => {
  const message = txtMsg.value
  const payload = {
    message,
    id: socket.id,
    date: new Date().getTime()
  }
  txtMsg.value = ''
  socket.emit('send-message', payload)
})
