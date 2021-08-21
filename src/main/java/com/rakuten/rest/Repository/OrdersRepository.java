package com.rakuten.rest.Repository;

import java.util.List;

import com.rakuten.rest.Model.Orders;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrdersRepository extends JpaRepository<Orders, Long>{
    @Query("SELECT o FROM Orders o WHERE o.customer_id = ?1")
    List<Orders> getAllOrdersOfUser(Long user_id);
}
