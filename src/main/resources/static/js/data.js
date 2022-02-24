 const url="http://localhost:8080/api"

//     const rooms = document.getElementById("roomsSelection");
//     console.log({ rooms });
//     const getPost = async () => {
//     const response = await fetch(url+"/getAllRooms");
//     const data = await response.json();
//     console.log({ data });
//     return data;
// };
//
//     const displayOption = async () => {
//     const options = await getPost();
//     for (option of options.data) {
//     const newOption = document.createElement("option");
//     newOption.value = option.roomName;
//     newOption.text = option.roomName;
//         rooms.appendChild(newOption);
// }
// };
//
//     displayOption();

 let dropdown = document.getElementById('roomsSelection');
 dropdown.length = 0;

 let defaultOption = document.createElement('option');
 defaultOption.text = 'Choose Room';

 dropdown.add(defaultOption);
 dropdown.selectedIndex = 0;


 const request = new XMLHttpRequest();
 request.open('GET', url+"/getAllRooms", true);

 request.onload = function() {
     if (request.status === 200) {
         const data = JSON.parse(request.responseText);
         let option;
         for (let i = 0; i < data.length; i++) {
             option = document.createElement('option');
             option.text = data[i].roomName;
             option.value = data[i].roomName;
             dropdown.add(option);
         }
     } else {
         // Reached the server, but it returned an error
     }
 }

 request.onerror = function() {
     console.error('An error occurred fetching the JSON from ' + url);
 };

 request.send();

 // add new room
 function addNewRoom(){

     let result = document.querySelector('.result');
     let newRoom = document.querySelector('#newRoom');
        console.log(newRoom.value);
     // Creating a XHR object
     let xhr = new XMLHttpRequest();

     // open a connection
     xhr.open("POST", url+"/addNewRoom", true);

     // Set the request header i.e. which type of content you are sending
     xhr.setRequestHeader("Content-Type", "application/json");

     // Create a state change callback
     xhr.onreadystatechange = function () {
         if (xhr.readyState === 4 && xhr.status === 200) {

             // Print received data from server
             result.innerHTML = this.responseText;

         }
     };

     // Converting JSON data to string
     var data = JSON.stringify({ "roomName": newRoom.value});

     // Sending data with the request
     xhr.send(data);
 }
