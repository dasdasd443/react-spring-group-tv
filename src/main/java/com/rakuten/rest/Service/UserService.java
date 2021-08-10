
package com.rakuten.rest.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import com.rakuten.rest.Model.User;
import com.rakuten.rest.Repository.UserRepository;

@Service
public class UserService {


    @Autowired
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User userData() {
        return new User(
                "Victor Chiong",
                "12345678",
                "cjvicro@gmail.com",
                "asdasd",
                "q",
                "ADM",
                "092956363"
        );
    }
    public List<User> userList(){
        return userRepository.findusers();
    }

    public Optional<User> loginUser(User user){
        return userRepository.findUser(user.getEmail(), user.getPassword());
    }

    public String registerUser(User user){
        User user1 = new User(
                user.getName(),
                user.getPassword(),
                user.getEmail(),
                user.getBilling_address(),
                user.getShipping_address(),
                user.getRole(),
                user.getPhone()
                
        );

        userRepository.save(user1);

        return user1.toString();
    }


}

