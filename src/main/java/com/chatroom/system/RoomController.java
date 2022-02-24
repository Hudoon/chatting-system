package com.chatroom.system;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin(origins = "http://localhost:63342")
@RestController
@RequestMapping("/api")
public class RoomController {

    private static final Logger logger = LoggerFactory.getLogger(RoomController.class);
    @Autowired
    private RoomRepository roomRepository;


    @GetMapping("/getAllRooms")
       public List<Room> getAllRooms(){
        logger.info("get all rooms");
    return roomRepository.findAll();
    }

    @PostMapping("/addNewRoom")
    public Room addNewRoom(@RequestBody Room newRoom) {
        logger.info("add new rooms"+newRoom);
        return roomRepository.save(newRoom);
    }


    @GetMapping("getRoomById/{id}")
    public ResponseEntity<Room> getRoomById(@PathVariable("id") Long roomId)
         throws ResourceNotFoundException {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found for this id :: " + roomId));
        return ResponseEntity.ok().body(room);

    }
//
//    public  static <T> ResponseEntity<T> or404(T result){
//        if(result == null){
//            return  ResponseEntity.notFound().build();
//        }
//        return ResponseEntity.ok(result);
//    }
}
