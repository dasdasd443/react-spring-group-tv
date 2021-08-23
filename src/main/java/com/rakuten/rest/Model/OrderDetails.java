package com.rakuten.rest.Model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="orders_details")
public class OrderDetails {
    private @Id
    @GeneratedValue @Column(name="id") Long id;
    private @Column(name="order_id", length=11) Long order_id;
    private @Column(name="product_id", length=11) Long product_id;
    private @Column(name="quantity") Integer quantity;

    
    public OrderDetails() {
    }
    public OrderDetails(Long order_id, Long product_id, Integer quantity) {
        this.order_id = order_id;
        this.product_id = product_id;
        this.quantity = quantity;
    }
    public OrderDetails(Long id, Long order_id, Long product_id, Integer quantity) {
        this.id = id;
        this.order_id = order_id;
        this.product_id = product_id;
        this.quantity = quantity;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Long getOrder_id() {
        return order_id;
    }
    public void setOrder_id(Long order_id) {
        this.order_id = order_id;
    }
    public Long getProduct_id() {
        return product_id;
    }
    public void setProduct_id(Long product_id) {
        this.product_id = product_id;
    }
    public Integer getQuantity() {
        return quantity;
    }
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    
}
