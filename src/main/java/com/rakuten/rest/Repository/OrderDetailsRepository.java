package com.rakuten.rest.Repository;

import java.util.List;

import com.rakuten.rest.Model.OrderDetails;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Long>{
    @Query("SELECT od FROM OrderDetails od WHERE od.order_id = ?1")
    List<OrderDetails> getOrderDetails(Long order_id);

    @Query("SELECT od FROM OrderDetails od WHERE od.product_id = ?1")
    List<OrderDetails> getOrderDetailsByProductId(Long order_id);
}
