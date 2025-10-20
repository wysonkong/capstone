package kong.com.capstone.service;

import kong.com.capstone.model.User;
import kong.com.capstone.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public void saveNewUser(User user) {
        userRepository.save(user);
    }

    public User findUserByName(String username) {
        return userRepository.findUserByUsername(username).orElse(null);
    }

    public Boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public Object findById(Long userId) {
        return userRepository.findById(userId);
    }
}
