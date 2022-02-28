package com.chatroom.system.entities;
import javax.persistence.GeneratedValue;
import javax.persistence.Entity;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Room {

    private @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
     long ID;
    private String roomName;



    public Room() {
    }

    public Room(Long ID, String roomName) {
        this.ID = ID;
        this.roomName = roomName;
    }

    public String getRoomName() {

        return roomName;
    }

    public void setRoomName(String roomName) {

        this.roomName = roomName;
    }

    public void setID(Long ID) {
        this.ID = ID;
    }
    public Long getID() {
        return ID;
    }

    @Override
    public String toString() {
        return "Room{" +
                "ID=" + ID +
                ", roomName='" + roomName + '\'' +
                '}';
    }
}
