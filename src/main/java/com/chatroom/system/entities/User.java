package com.chatroom.system.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity

public class User  {


    private @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long ID;
    private String userName;

    public User(long ID, String userName) {
        this.ID = ID;
        this.userName = userName;
    }

    public User() {
    }


    public long getID() {
        return ID;
    }

    public void setID(long ID) {
        this.ID = ID;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    @Override
    public String toString() {
        return "User{" +
                "ID=" + ID +
                ", userName='" + userName + '\'' +
                '}';
    }
}