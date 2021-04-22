const socket = io();

socket.on('message', (data) => {
  console.log(data);
});

const sendButton = document.querySelector('#sendMessage');
const messageContent = document.querySelector('#message');

sendButton.addEventListener('click', () => {
  socket.emit('sentMessage', messageContent.value);
});

const sendLocation = document.querySelector('#send-location');
sendLocation.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation isnt supported');
  }
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
  });
});
