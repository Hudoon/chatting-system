'use strict';


var stompClient = null;
//var usernamePage = document.querySelector('#userJoin');
var chatPage = document.querySelector('#chatPage');
var currentUrl = new URL(window.location.href);
const apiUrl="http://localhost:8080/api"
var room = currentUrl.searchParams.get("roomId");
var name = currentUrl.searchParams.get("username");
var waiting = document.querySelector('.waiting');
var roomIdDisplay = document.querySelector('#room-id-display');
var stompClient = null;
var currentSubscription;
var topic = null;
var username;
var chatUsersCount = document.querySelector("#chatUsersCount");
let chatUsersCtr = document.querySelector("#users");
let userInRoomId;
let users = [];

window.onload= function connect(event) {
    var name1 = name;
    Cookies.set('name', name1);
   // usernamePage.classList.add('d-none');
    chatPage.classList.remove('d-none');
    console.log("on connect function");
    var socket = new SockJS('/sock');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError);
    event.preventDefault();

}
function disconnect(event) {
    //stompClient.disconnect({}, onDisconnect,onError())
    onDisconnect();
    deleteUserFromRoom();
    console.log("Disconnected");

}

function onConnected() {
    console.log("onConnected function"+room)
    enterRoom(room);
    waiting.classList.add('d-none');

}

function onDisconnect() {
    exitRoom(room);
    waiting.classList.add('d-none');
    // var message = document.getElementById('#chat-container');
    // document.querySelector(".chat-header").classList.add('d-none');
}

function exitRoom(newRoomId)
{
    var roomId = newRoomId;

    Cookies.set('roomId', room);

    roomIdDisplay.textContent = roomId;
    topic = `/chat-app/chat/${newRoomId}`;

    currentSubscription = stompClient.subscribe(`/chat-room/${roomId}`, onMessageReceived);
    var username = name;
    stompClient.send(`${topic}/leaveUser`,
        {},
        JSON.stringify({sender: username, type: 'LEAVE'})
    );
    console.log('leave user');
    stompClient.disconnect();


}
function onError(error) {
    waiting.textContent = 'uh oh! service unavailable';
}

function enterRoom(newRoomId) {
    var roomId = newRoomId;

    Cookies.set('roomId', room);

    roomIdDisplay.textContent = roomId;
    topic = `/chat-app/chat/${newRoomId}`;

    currentSubscription = stompClient.subscribe(`/chat-room/${roomId}`, onMessageReceived);
    var username = name;
    stompClient.send(`${topic}/addUser`,
        {},
        JSON.stringify({sender: username, type: 'JOIN'})
    );
    console.log('adduser');



}

function addUserToRoom(username, roomname ){
    console.log(username +" "+roomname);
    // Creating a XHR object
    let xhr = new XMLHttpRequest();

    // open a connection
    xhr.open("POST", apiUrl+"/groups/addNewUserToRoom", true);

    // Set the request header i.e. which type of content you are sending
    xhr.setRequestHeader("Content-Type", "application/json");

    // Create a state change callback
    xhr.onreadystatechange = function () {
        console.log(xhr.readyState +""+ xhr.status );
        if (!(xhr.status === 200)) {

            alert(" There is an error, please try again");
        }
    };

    // Converting JSON data to string
    var data = JSON.stringify({ "username": username ,"roomName": roomname});

    // Sending data with the request
    xhr.send(data);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = xhr.response;

            var parsed = JSON.parse(response);
            userInRoomId=parsed.id;
            console.log(userInRoomId);
        }
    }

   // console.log("response"+xhr.response.json());

}

function deleteUserFromRoom( ){

    // Creating a XHR object
    let xhr = new XMLHttpRequest();

    // open a connection
    xhr.open("DELETE", apiUrl+"/groups/deleteUserFromGroup/"+userInRoomId, true);

    // Set the request header i.e. which type of content you are sending
    xhr.setRequestHeader("Content-Type", "application/json");

    // Create a state change callback
    xhr.onload = function () {
        console.log(xhr.readyState +""+ xhr.status );
        if (!(xhr.status === 200)) {

            alert(" There is an error, please try again");
        }

    };
    xhr.send(null);
}

function sendMessage(event) {
    var messageContent = $("#message").val().trim();
    var username = name;
    var newRoomId = room;
    topic = `/chat-app/chat/${newRoomId}`;
    if(messageContent && stompClient) {
        var chatMessage = {
            sender: username,
            content: messageContent,
            type: 'CHAT'
        };

        stompClient.send(`${topic}/sendMessage`, {}, JSON.stringify(chatMessage));
        document.querySelector('#message').value = '';
    }
    event.preventDefault();
}


// Join user to chat
function userJoin( username) {
    addUserToRoom(name,room)

    const user ={ username};
    chatUsersCount= chatUsersCount+1;
    users.push(user);
    chatUsersCtr.innerHTML = '';
    console.log("all users"+users.length);
    users.forEach((u) => {
        console.log("all users"+u.username);

        const userEl = document.createElement("div");
        userEl.className = "chat-user";
        userEl.innerHTML = u.username;
        chatUsersCtr.appendChild(userEl);
    });

}

function showOnlinUsers(){
    let xhr = new XMLHttpRequest();

    // open a connection
    xhr.open("GET", apiUrl+"/groups/getuserByRoom/"+room, true);

    // Set the request header i.e. which type of content you are sending
    xhr.setRequestHeader("Content-Type", "application/json");

    // Create a state change callback
    xhr.onload = function () {
        console.log(xhr.readyState +""+ xhr.status );
        if (!(xhr.status === 200)) {

            alert(" There is an error, please try again");
        }

    };
    xhr.send(null);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = xhr.response;

            var parsed = JSON.parse(response);

            console.log(parsed);
        }
    }
}

function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);
    console.log(payload.body);
    console.log("Message received ");


    var messageElement = document.createElement('li');
    var divCard = document.createElement('div');
    divCard.className = 'card';

    if(message.type === 'JOIN') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' joined!';
        console.log("/////////////////////type join "+message.content);
        userJoin(message.sender);


    } else if (message.type === 'LEAVE') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' left!';
        console.log(message.sender + ' left!');
        console.log("/////////////////////type leave"+message.content);
        // disconnect();
        deleteUserFromRoom();
    }
    else {
        messageElement.classList.add('chat-message');
        var usernameElement = document.createElement('span');
        var usernameText = document.createTextNode(message.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);

    }

    var divCardBody = document.createElement('div');
    divCardBody.className = 'card-body';
    divCardBody.appendChild(messageElement);
    divCard.appendChild(divCardBody);
    var textElement = document.createElement('p');
    var messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);
    messageElement.appendChild(textElement);
    var messageArea = document.querySelector('#messageArea');
    messageArea.appendChild(divCard);
    messageArea.scrollTop = messageArea.scrollHeight


}
//
// $(document).ready(function() {
//    // userJoinForm.addEventListener('submit', connect, true);
//     messagebox.addEventListener('submit', sendMessage, true);
//     userLeaveForm.addEventListener('submit', disconnect, true);
// });