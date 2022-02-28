package com.chatroom.system.Services;

import com.chatroom.system.Repositories.UserInRoomRepository;
import com.chatroom.system.entities.UsersInRoom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserInRoomService  {
    @Autowired
    private UserInRoomRepository userInRoomRepo;
public List<UsersInRoom> findAllByRoomName(String roomName){
return userInRoomRepo.findAllByRoomName(roomName);
}
}
