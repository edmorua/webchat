var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

app.use(express.static(path.join(__dirname,'dist')));

app.get('/', (res,req) => {
  res.sendFile('./dist/index.html');
})

let numUsers = 0;

io.on('connection', (socket) => {
  let addedUser = false;
  /**
   * things to do when you add a new message
   */
  socket.on('new message', (data)  => {
    
    io.emit('new message', {
      username: socket.username,
      message: data.message
    });
  });

  /**
   * things to do whe you add a user
   */
  socket.on('add user', (username) => {
    if(addedUser) return;


    socket.username = username;
    ++numUsers;
    addedUser = true;
    console.log("welcome " + username);
    /* socket.emit('login', {
      numUsers: numUsers
    }); */

    io.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });

  });


  socket.on('typing', ()=> {
    io.emit('typing', {
      username: socket.username
    });
  });

  socket.on('stop typing', () => {
    io.emit('stop typing', {
      username: socket.username
    });
  });


  socket.on('disconnect', () => {
    if(addedUser){
      --numUsers;

      io.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });


});


