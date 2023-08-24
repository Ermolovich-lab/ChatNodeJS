const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
var orders = []

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('update', () => {
    io.emit('chat message', orders);
  })
  socket.on('chat message', (departure, arrival, date) => {
    
    order = new Order(departure, arrival, date, socket.id)
    orders.push(order)

    io.emit('chat message', orders);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

class Order{
  constructor(departure, arrival, date, id){
      this.departure = departure
      this.arrival = arrival
      this.date = date
      this.id = id
  }

  get getDeparture(){
      return this.departure
  }

  get getArrival(){
      return this.arrival
  }

  get getDate(){
      return this.date
  }

  string(){
    return `departure: ${this.departure}; arrival: ${this.arrival}; date: ${this.date}; id: ${this.id};`
  }
}