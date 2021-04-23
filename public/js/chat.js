const socket = io();

socket.on('message', data => {
  console.log('MESSAGE GOT IN');

  console.log(data);
});

const sendButton = document.querySelector('#sendMessage');
const messageContent = document.querySelector('#message');
const sendLocation = document.querySelector('#send-location');

sendButton.addEventListener('click', () => {
  socket.emit('sendMessage', messageContent.value, error => {
    if (error) {
      return console.log('error');
    }
    console.log(`message was delivered`);
  });
});

sendLocation.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation isnt supported');
  }
  navigator.geolocation.getCurrentPosition(position => {
    socket.emit(
      'sendLocation',
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      },
      error => {
        if (error) {
          return console.log('An error occured');
        }
        console.log(`Location has been sent`);
      }
    );
  });
});
