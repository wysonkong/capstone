package kong.com.capstone.controller;

import kong.com.capstone.dto.LoginDTO;
import kong.com.capstone.model.User;
import kong.com.capstone.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("api/user")
public class UserController {

    public final UserService userService;

    private final Map<String, User> sessions = new ConcurrentHashMap<>();

    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/new_user")
    public void saveNewUser(@RequestBody User user) {
        userService.saveNewUser(user);
    }

    @GetMapping("/findUser")
    public Map<String, Boolean> findUser(@RequestParam String username) {
        Boolean exists = userService.existsByUsername(username);
        return Map.of("exists", exists);
    }

    @PostMapping("/user")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginDTO login) {
        User user =  userService.findUserByName(login.username());

        if (user == null || !login.password().equals(user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String sessionId = UUID.randomUUID().toString();
        sessions.put(sessionId, user);

        return ResponseEntity.ok(Map.of("sessionId", sessionId, "username", user.getUsername(), "userId", Long.toString(user.getId())));
    }

    @GetMapping("/me")
    public ResponseEntity<User> me(@RequestHeader("X-Session-Id") String sessionId) {
        User user = sessions.get(sessionId);
        if (user == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return ResponseEntity.ok(user);
    }
}