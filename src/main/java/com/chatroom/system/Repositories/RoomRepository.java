package com.chatroom.system.Repositories;


import com.chatroom.system.entities.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RoomRepository  extends JpaRepository<Room, Long>{

}

