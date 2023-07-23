export const DEMO_TABLE = 'table-1'

export const multiplayer = (io, socket) => {
  socket.join(DEMO_TABLE)

  const emitResult = async () => {
    const sockets = await io.fetchSockets()
    const players = sockets
      .filter((socket) => !!socket.player)
      .map((socket) => {
        return socket.player
      })
    // to all clients in room "DEMO_TABLE"
    io.in(DEMO_TABLE).emit('multiplayer:result', players)
  }

  const join = async (username) => {
    socket.player = {
      username,
      sp: null,
    }
    await emitResult()
  }

  const vote = async (payload) => {
    socket.player = payload
    await emitResult()
  }

  const check = async (value) => {
    io.in(DEMO_TABLE).emit('multiplayer:check', value)
    await emitResult()
  }

  const disconnect = async () => {
    await emitResult()
  }

  socket.on('multiplayer:join', join)
  socket.on('multiplayer:vote', vote)
  socket.on('multiplayer:check', check)
  socket.on('disconnect', disconnect)
}
