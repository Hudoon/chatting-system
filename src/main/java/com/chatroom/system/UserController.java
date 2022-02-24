package com.chatroom.system;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    @Autowired
    private UserRepository userRepository;


    @GetMapping("/getAllUsers")
    public List<User> getAllUsers(){
        logger.info("get all users");
        return userRepository.findAll();
    }

    @PostMapping("/addNewUser")
    public User addNewUser(@RequestBody User newUser) {
        logger.info("add new user"+newUser);
        return userRepository.save(newUser);
    }


    @GetMapping("getUserById/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long userId)
            throws ResourceNotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found for this id :: " + userId));
        return ResponseEntity.ok().body(user);

    }
}
