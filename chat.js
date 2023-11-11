document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
    let input = document.getElementById('input');
    let username = document.getElementById('username').value || 'Anonymous';
    if (input.value) {
        socket.send(username + ": " + input.value);
        input.value = '';
    }
});

let socket = new WebSocket('ws://localhost:3000');
socket.onopen = function(e) {
    console.log("[open] Connection established");
};

socket.onmessage = function(event) {
    let message = event.data;
    if (typeof message === 'string') {
        let messages = document.getElementById('messages');
        let messageElement = document.createElement('li');
        messageElement.textContent = message;
        messages.appendChild(messageElement);
    } else {
        // Assuming you do not expect to receive binary data, 
        // you can comment out or remove this part
        console.error('Received non-string message');
    }
};

socket.onclose = function(event) {
    if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
        console.log('[close] Connection died');
    }
};

socket.onerror = function(error) {
    console.log(`[error] ${error.message}`);
};
