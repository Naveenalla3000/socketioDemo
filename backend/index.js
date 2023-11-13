const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server,{
    cors:{
        origin:"http://localhost:3000",
        methods: ["*"],
        credentials: true,
    }
});

io.on('connection', (socket) => {
    console.log('what is socket',socket,'\nsocket connected');
    socket.on('chat', (data) => {
        console.log('what is data',data);
        io.emit('chat',data);
    });
});

server.listen(8080,()=>{
    console.log('server is running on port 8080....');
})