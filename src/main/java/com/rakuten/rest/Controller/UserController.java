
package com.rakuten.rest.Controller;

import com.rakuten.rest.JWTAuthorizationFilter;
import com.rakuten.rest.Model.AuthenticationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins="http://localhost:3000", allowedHeaders = "*")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
    }


    @GetMapping("/")
    public User hello(){
        return new User(
                "#ffffff",
                "Victor Chiong",
                "12345678",
                "cjvicro@gmail.com",
                "",
                "",
                "ADM",
                "092512354",
                "USSS"
        );
    }

    @GetMapping("/users")
    public List<User> users(){
        return userService.userList();
    }

    @GetMapping("/users/{role}")
    public List<User> users(@PathVariable("role") String role){
        return userService.getByRole(role);
    }

    @PutMapping("/update-user")
    public void updateUser(@RequestBody User user){
        userService.updateUser(user);
    }

    @DeleteMapping("/delete-user/{id}")
    public void deleteUser(@PathVariable("id") Long id){
        userService.deleteUser(id);
    }

    @GetMapping("/get-user/{id}")
    public Optional<User> user(@PathVariable("id") Long id){
        return userService.getUser(id);
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody User user){
        String user_obj = userService.registerUser(user);
        String token="";
        if(token==""){
            if(userService.loginUser(user).isPresent()){
                token = getJWTToken(user.getEmail());
            }else{
                token= "not found";
            }
        }
        return "{\"token\":\""+token+"\",\"user\":"+user_obj+"}";
    }

    @PostMapping("/login")
    // @RequestBody User user
    public String signInUser(@RequestBody User user){
        String token="";
        if(token==""){
            if(userService.loginUser(user).isPresent()){
                token = getJWTToken(user.getEmail());
            }else{
                token= "not found";
            }
        }
        return "{\"token\":\""+token+"\",\"user\":"+userService.loginUser(user).get().toString()+"}";
    }
    @PostMapping("/oauthenticate")
    public ResponseEntity<?> createOAuthenticationToken(@RequestBody User user) throws Exception {
        if (user.getEmail() != null) {
            final String jwt = getJWTToken(user.getEmail());
            return ResponseEntity.ok().body(new AuthenticationResponse(jwt));
        }
        return ResponseEntity.badRequest().body(null);
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

