import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('room', (data) => {
    socket.join(data);
  });

  socket.on('message', (data) => {
    socket.to(data.room).emit('responseMessage', data);
  });
});

const port = 4000;

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
