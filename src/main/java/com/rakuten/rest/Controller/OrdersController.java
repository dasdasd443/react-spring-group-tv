package com.rakuten.rest.Controller;

import java.util.Date;
import java.util.List;

import com.rakuten.rest.Service.OrdersService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="api/orders")
@CrossOrigin(origins="http://localhost:3000", allowedHeaders = "*")
public class OrdersController {
    

    public final OrdersService ordersService;

    public OrdersController(OrdersService ordersService) {
        this.ordersService = ordersService;
    }

    @PostMapping("/checkout")
    public void checkout(@RequestParam("user_id") Long user_id, @RequestParam("quantity") List<Integer> quantity,@RequestParam("products") List<Long> products, @RequestParam("order_date") Date order_date){
        ordersService.checkout(user_id,quantity,products,order_date);
    }
}
