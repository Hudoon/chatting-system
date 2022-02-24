package com.chatroom.system;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RoomRepository  extends JpaRepository<Room, Long>{

}


//{
//    Room findById(long id);
//
//   Room rooms=new Room();
//   Long index=2L;
//   List<Room> findAll();
//
//static Room addRoom(long index, String room){
//   rooms.setID(index);
//   rooms.setRoomName(room);
//   return rooms;
//}
//}
