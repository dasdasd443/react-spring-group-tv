
package com.rakuten.rest.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.web.bind.annotation.*;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import com.rakuten.rest.Model.User;
import com.rakuten.rest.Repository.UserRepository;
import com.rakuten.rest.Service.UserService;

import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path="api/user")
@CrossOrigin(origins="http://localhost:3000")
public class UserController {

    private final UserService userService;



    @Autowired
    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
    }


    @GetMapping("/")
    public User hello(){
        return new User(
                "Victor Chiong",
                "victor",
                "12345678",
                "cjvicro@gmail.com"
        );
    }

    @GetMapping("/users")
    public List<User> users(){
        return userService.userList();
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody User user){
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    // @RequestBody User user
    public User loginUser(@RequestBody User user){
        String token = getJWTToken(user.getUsername());
        User loggedUser = new User();
        loggedUser.setEmail(user.getEmail());
        loggedUser.setToken(token);
        return loggedUser;
    }

    private String getJWTToken(String username) {
		String secretKey = "mySecretKey";
		List<GrantedAuthority> grantedAuthorities = AuthorityUtils
				.commaSeparatedStringToAuthorityList("ROLE_USER");
		
		String token = Jwts
				.builder()
				.setId("softtekJWT")
				.setSubject(username)
				.claim("authorities",
						grantedAuthorities.stream()
								.map(GrantedAuthority::getAuthority)
								.collect(Collectors.toList()))
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + 600000))
				.signWith(SignatureAlgorithm.HS512,
						secretKey.getBytes()).compact();

		return "Bearer " + token;
	}
}

