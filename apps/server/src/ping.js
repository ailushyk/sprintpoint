export const ping = (io, socket) => {
  const ping = async () => {
    console.log(`ping ${Date.now()}`)
    socket.volatile.emit('pong')
  }

  const pong = () => {
    console.log(`pong ${Date.now()}`)
  }

  socket.on('ping', ping)
  socket.on('pong', pong)
}
