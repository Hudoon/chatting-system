package com.chatroom.system.Repositories;

import com.chatroom.system.entities.UsersInRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserInRoomRepository extends JpaRepository<UsersInRoom,Long> {
    List<UsersInRoom> findAllByRoomName(String roomName);

}
