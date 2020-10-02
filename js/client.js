
//connect with the server
const socket = io('http://localhost:8000');

//Iterating the html elements
const form = document.getElementById('form-send');
const msgInput = document.getElementById('msgInput');
const msgContainer = document.querySelector(".container");

var audio=new Audio('../assets/notification.mp3');

//appending message and position of the msg send by the user
const append = (message, position) => {
    const msgElement = document.createElement('div');
    msgElement.innerText = message;
    msgElement.classList.add('message');
    msgElement.classList.add(position);
    msgContainer.append(msgElement);

    if(position=='left'){
        audio.play();
    }
    
};

//this is the event listener for message sending
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = msgInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    msgInput.value = '';
});

//prompt is opening
const name = prompt("Enter your name to join the chat");

//this is for the new user joined event
socket.emit('new-user-joined', name);
socket.on('user-joined', name => {
    append(`${name} has joined the chat now`, 'right');
});

//handle the receive event in client side
socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')
});

//handle the left event when someone leave the chat
socket.on('left', name => {
    append(`${name}: has left the chat now`, 'right');
})
