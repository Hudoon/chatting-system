package com.chatroom.system.controllers;

import com.chatroom.system.Excepetions.ResourceNotFoundException;
import com.chatroom.system.Repositories.UserInRoomRepository;

import com.chatroom.system.Services.UserInRoomService;
import com.chatroom.system.entities.UsersInRoom;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/groups")
public class UserInRoomController {
    private static final Logger logger = LoggerFactory.getLogger(UserInRoomController.class);
    @Autowired
    private UserInRoomRepository userInRoomRepository;
//    private UserInRoomService userInRoomService;

    @GetMapping("/getAllUsersInRoom")
    public List<UsersInRoom> getAllUsersInRoom(){
        logger.info("get all users");
        return userInRoomRepository.findAll();
    }

    @PostMapping("/addNewUserToRoom")
    public UsersInRoom addNewUserToRoom(@RequestBody UsersInRoom newUserInRoom) {
        logger.info("add new user"+newUserInRoom);

        return userInRoomRepository.save(newUserInRoom);
    }
    @GetMapping("/getuserByRoom/{roomName}")
    public List<UsersInRoom> getUserInRoomById(@PathVariable("roomName") String roomName) {
                  logger.info("get all user in room : "+roomName);
        return userInRoomRepository.findAllByRoomName(roomName);
    }

    @DeleteMapping("deleteUserFromGroup/{id}")
    public void  deleteUserFromGroup(@PathVariable("id") Long id){
        logger.info("delete "+id);
         userInRoomRepository.deleteById(id);

    }

}
