import Server from 'socket.io';
import models from './models'

export default function startServer(store) {
  models.sequelize.sync({force: true})
    .then(() => {
      const io = new Server().attach(8090);

      /**
       * Send changes to rooms to only those who care
       */
      store.subscribe(
        () => {
          const state = store.getState();
          const changedRoom = state.get('changedRoom');
          if (changedRoom) {
            io.in(changedRoom).emit('state', state.getIn(['rooms', changedRoom]).toJS())
          }
        }
      );

      io.on('connection', (socket) => {
        //socket.emit('state', store.getState().toJS());
        socket.on('action', store.dispatch.bind(store));

        socket.on('joinRoom', function (room) {
          socket.join(room);
          console.log('joining room', room);
          socket.emit('joinRoomSuccess', store.getState().getIn(['rooms', room]).toJS());
        });

        socket.on('leaveRoom', function (room) {
          socket.leave(room);
          socket.emit('leaveRoomSuccess');
        })
      })
    });


}