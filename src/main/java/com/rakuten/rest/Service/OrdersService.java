package com.rakuten.rest.Service;

import com.rakuten.rest.Repository.OrderDetailsRepository;
import com.rakuten.rest.Repository.OrdersRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrdersService {
    public final OrdersRepository ordersRepository;
    public final OrderDetailsRepository orderDetailsRepository;

    @Autowired
    public OrdersService(OrdersRepository ordersRepository, OrderDetailsRepository orderDetailsRepository) {
        this.ordersRepository = ordersRepository;
        this.orderDetailsRepository = orderDetailsRepository;
    }
}
