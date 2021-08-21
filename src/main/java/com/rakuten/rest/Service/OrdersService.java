package com.rakuten.rest.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.rakuten.rest.Model.OrderDetails;
import com.rakuten.rest.Model.Orders;
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

    public void checkout(Long user_id,List<Integer> quantity, List<Long> products, Date order_date) {
        Orders order = new Orders(
            user_id,
            order_date,
            "Paid"
        );
        Orders savedOrder = ordersRepository.saveAndFlush(order);

        for(int i=0; i<products.size(); i++){
            OrderDetails newOrderDetail = new OrderDetails(
                savedOrder.getId(),
                products.get(i),
                quantity.get(i)
            );
            orderDetailsRepository.save(newOrderDetail);
        }
    }

    public List<Orders> getPurchases(Long user_id) {
        return ordersRepository.getAllOrdersOfUser(user_id);
    }

    public List<OrderDetails> getOrderDetails(Long order_id) {
        return orderDetailsRepository.getOrderDetails(order_id);
    }

    public List<OrderDetails> getOrderDetailsByProductId(Long product_id) {
        return orderDetailsRepository.getOrderDetailsByProductId(product_id);
    }

    public Optional<Orders> getOrder(Long order_id) {
        return ordersRepository.findById(order_id);
    }
    
}
