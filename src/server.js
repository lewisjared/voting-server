import Server from 'socket.io';

export default function startServer(store) {
  const io = new Server().attach(8090);

  /**
   * Send changes to rooms to only those who care
   */
  store.subscribe(
    () => {
      const state = store.getState();
      const changedRoom = state.get('changedRoom');
      if (changedRoom) {
        io.to(changedRoom).emit(store.get(changedRoom).toJS())
      }
    }
  );

  io.on('connection', (socket) => {
    //socket.emit('state', store.getState().toJS());
    socket.on('action', store.dispatch.bind(store));

    socket.on('joinRoom', function (room) {
      socket.join(socket);
      console.log('joining room', room);
      socket.emit('joinRoomSuccess', store.getState().toJS());
    });

    socket.on('leaveRoom', function (room) {
      socket.leave(room);
      socket.emit('leaveRoomSuccess');
    })
  })
}