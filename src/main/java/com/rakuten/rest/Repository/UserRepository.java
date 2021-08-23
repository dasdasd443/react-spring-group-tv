
package com.rakuten.rest.Repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import com.rakuten.rest.Model.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    @Query("SELECT u FROM User u")
    List<User> findusers();

    @Query("SELECT u FROM User u WHERE u.role = ?1")
    List<User> findByRole(String role);


    @Query("SELECT u FROM User u WHERE u.email = ?1 AND u.password = ?2")
    Optional<User> findUser(String email, String password);
}

