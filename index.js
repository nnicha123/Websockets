const express = require('express')
const socket = require('socket.io')
// App setup
const app = express()
const server = app.listen(4000, () => console.log('Listening to requests on port 4000'))

// Static files
app.use(express.static('public'))

// Socket setup
const io = socket(server)

io.on('connection', (socket) => {
  // connects to unique socket everytime we refresh
  console.log('made socket connection', socket.id)

  // Listen for emit event (when 'chat' emitted)
  socket.on('chat', (data) => {
    // referring to all different sockets
    // emit data (chat message) to all sockets (all client)
    io.sockets.emit('chat', data)
  })
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data)
  })

})