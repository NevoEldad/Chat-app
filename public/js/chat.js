const socket = io();

//Elements
const $sendButton = document.querySelector('#sendMessage');
const $messageContent = document.querySelector('#message');
const $sendLocation = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');

//Templates
const messageTmeplate = document.querySelector('#message-template').innerHTML;

socket.on('message', message => {
  console.log(message);
  const html = Mustache.render(messageTmeplate, {
    message
  });
  $messages.insertAdjacentHTML('beforeend', html);
});

$sendButton.addEventListener('click', () => {
  socket.emit('sendMessage', $messageContent.value, error => {
    $sendButton.setAttribute('disabled', 'disabled');
    $messageContent.value = '';
    $messageContent.focus();
    if (error) {
      $sendButton.removeAttribute('disabled');
      return console.log('error');
    }
    $sendButton.removeAttribute('disabled');
    console.log(`message was delivered`);
  });
});

$sendLocation.addEventListener('click', () => {
  $sendLocation.setAttribute('disabled', 'disabled');
  if (!navigator.geolocation) {
    $sendLocation.removeAttribute('disabled');
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
          $sendLocation.removeAttribute('disabled');
          return console.log('An error occured');
        }
        $sendLocation.removeAttribute('disabled');
        console.log(`Location has been sent`);
      }
    );
  });
});
