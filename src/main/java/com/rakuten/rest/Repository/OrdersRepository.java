package com.rakuten.rest.Repository;

import com.rakuten.rest.Model.Orders;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OrdersRepository extends JpaRepository<Orders, Long>{
    
}
