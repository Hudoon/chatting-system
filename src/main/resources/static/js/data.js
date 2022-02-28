 const url="http://localhost:8080/api"
 let currentUser =null;
 let roomId=null;
 // document.getElementById("roomsSelection").onload = function() {selectRom()};
 // document.getElementById("roomsSelection").addEventListener("load", selectRom);
 function selectRom() {
    console.log("in loading data");
     var currentUrl = new URL(window.location.href);
      currentUser = currentUrl.searchParams.get("username");
     console.log(currentUser);
    let dropdown = document.getElementById('roomsSelection');
    dropdown.length = 0;

    let defaultOption = document.createElement('option');
    defaultOption.text = 'Choose Room';

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;


    const request = new XMLHttpRequest();
    request.open('GET', url + "/getAllRooms", true);

    request.onload = function () {
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

    request.onerror = function () {
        console.error('An error occurred fetching the JSON from ' + url);
    };

    request.send();
}
//Join to Room
 function joinToRoom(){
     const select = document.getElementById('roomsSelection');
      roomId = select.options[select.selectedIndex].text;
     console.log(roomId);
     window.location.href="Chatting Page.html?username="+currentUser+"&roomId="+roomId;
 }
 // add new room
 function addNewRoom(){

     // let result = document.querySelector('.result');
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
             // result.innerHTML = this.responseText;
             window.location.href="Chatting Page.html?username="+currentUser+"&roomId="+newRoom.value;
         }
     };

     // Converting JSON data to string
     var data = JSON.stringify({ "roomName": newRoom.value});

     // Sending data with the request
     xhr.send(data);

 }


 // add new user
 function addNewUse(){

     let result = document.querySelector('.result');
     let newUser = document.querySelector('#username');
     console.log(newUser.value);
     // Creating a XHR object
     let xhr = new XMLHttpRequest();

     // open a connection
     xhr.open("POST", url+"/user/addNewUser", true);

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
     var data = JSON.stringify({ "userName": username.value});

     // Sending data with the request
     xhr.send(data);
     console.log("go to chat group");
     window.location.href="../Chat Group.html?username="+username.value;
 }

