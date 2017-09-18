var app = require('http').createServer();
var io = require('socket.io')(app);

var PORT = 3000;
// 客户端计数  22配对
var clientCount = 0;
// 用来存储客户端socket
var socketMap = {};

app.listen(PORT);

var bindListener = function(socket, event) {
    socket.on(event, function(data) {
        if (socket.clientNum % 2 === 0) {
            if (socketMap[socket.clientNum - 1]) {
                socketMap[socket.clientNum - 1].emit(event,data);
            }
            
        } else {
            if (socketMap[socket.clientNum + 1]) {
                socketMap[socket.clientNum + 1].emit(event,data);
            }
        }
    });
};

io.on('connection', function(socket) {
    console.log(clientCount)
    
    clientCount += 1;
    socket.clientNum = clientCount;
    socketMap[clientCount] = socket;

    if (clientCount % 2 === 1) {
        socket.emit('waiting', 'waiting for another person')
    } else {
        if (socketMap[(clientCount - 1)]) {
            socket.emit('start');
            socketMap[(clientCount - 1)].emit('start');
        } else {
            socket.emit('leave');
        }
    }

    // 接受local.js初始化时候保存的参数
    // socket.on('init', function(data) {
    //     if (socket.clientNum % 2 === 0) {
    //         socketMap[socket.clientNum - 1].emit('init',data);
    //     } else {
    //         socketMap[socket.clientNum + 1].emit('init',data);
    //     }
    // });
    bindListener(socket, 'init');
    bindListener(socket, 'next');
    // socket.on('next', function(data) {
    //     if (socket.clientNum % 2 === 0) {
    //         socketMap[socket.clientNum - 1].emit('next',data);
    //     } else {
    //         socketMap[socket.clientNum + 1].emit('next',data);
    //     }
    // });
    bindListener(socket, 'rotate');
    bindListener(socket, 'right');
    bindListener(socket, 'down');
    bindListener(socket, 'left');
    bindListener(socket, 'fall');
    bindListener(socket, 'fixed');
    bindListener(socket, 'line');
    bindListener(socket, 'time');
    bindListener(socket, 'lose');
    bindListener(socket, 'bottomLines');
    bindListener(socket, 'addTailLines');
    socket.on('disconnect', function() {
        if (socket.clientNum % 2 === 0) {
            if (socketMap[socket.clientNum - 1]) {
                socketMap[socket.clientNum - 1].emit('leave');
            }
            
        } else {
            if (socketMap[socket.clientNum + 1]) {
                socketMap[socket.clientNum + 1].emit('leave');
            }
        }
        delete(socketMap[socket.clientNum]);
    });
})

console.log('websocket listening on port ' + PORT);
