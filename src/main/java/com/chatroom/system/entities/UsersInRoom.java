package com.chatroom.system.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@Entity
public class UsersInRoom {

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    private @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    private String username;
    private String roomName;

    public UsersInRoom(long id,String username, String roomName) {
        this.id=id;
        this.username = username;
        this.roomName = roomName;
    }

    public UsersInRoom() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRoomName() {
        return roomName;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }

    @Override
    public String toString() {
        return "UsersInRoom{" +
                "username='" + username + '\'' +
                ", roomName='" + roomName + '\'' +
                '}';
    }
}
