package com.rakuten.rest.Controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.rakuten.rest.Model.OrderDetails;
import com.rakuten.rest.Model.Orders;
import com.rakuten.rest.Model.Products;
import com.rakuten.rest.Service.OrdersService;
import com.rakuten.rest.Service.ProductsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="api/orders")
@CrossOrigin(origins="https://localhost:3000", allowedHeaders = "*")
public class OrdersController {
    

    public final OrdersService ordersService;
    public final ProductsService productsService;

    @Autowired
    public OrdersController(OrdersService ordersService, ProductsService productsService) {
        this.ordersService = ordersService;
        this.productsService = productsService;
    }

    @PostMapping("/checkout")
    public void checkout(@RequestParam("user_id") Long user_id, @RequestParam("quantity") List<Integer> quantity,@RequestParam("products") List<Long> products, @RequestParam("order_date") Date order_date){
        for(int i=0; i <products.size();i++){
            Optional<Products> newProd = productsService.getProduct(products.get(i));
            if(newProd.isPresent()){
                newProd.get().setQuantity(newProd.get().getQuantity() - quantity.get(i));
                productsService.updateProduct(newProd.get());
            }
            
        }
        ordersService.checkout(user_id,quantity,products,order_date);
    }

    @GetMapping("/get-purchases/{id}")
    public List<Orders> getPurchases(@PathVariable("id") Long user_id){
        return ordersService.getPurchases(user_id);
    }

    @GetMapping("/get-order-details/{id}")
    public List<OrderDetails> getOrderDetails(@PathVariable("id") Long order_id){
        return ordersService.getOrderDetails(order_id);
    }

    @GetMapping("/get-order-details-by-product-id/{id}")
    public List<OrderDetails> getOrderDetailsByProductId(@PathVariable("id") Long product_id){
        return ordersService.getOrderDetailsByProductId(product_id);
    }

    @GetMapping("/get-order/{order_id}")
    public Optional<Orders> getOrder(@PathVariable("order_id") Long order_id){
        return ordersService.getOrder(order_id);
    }
    
}
