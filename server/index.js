const { blueBright } = require('chalk');
const PORT = process.env.PORT || 8080;
const app = require('./app');
const db = require('./db');
const io = require('socket.io');

const init = async () => {
  await db.syncAndSeed();
  const server = app.listen(PORT, () =>
    console.log(blueBright(`Listening at http://localhost:${PORT}`))
  );
  const socketServer =  new io.Server(server);
  socketServer.on('connection', (socket)=> {
    socket.on('action', (action)=> {
      socket.broadcast.emit('action', action);
    });
  });
};

init();
