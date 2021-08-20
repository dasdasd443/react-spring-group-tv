package com.rakuten.rest.Repository;

import com.rakuten.rest.Model.OrderDetails;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Long>{
    
}
