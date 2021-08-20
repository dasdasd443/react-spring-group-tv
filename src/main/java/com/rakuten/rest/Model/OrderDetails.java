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
    private @Column(name="product_id") Long product_id;
    private @Column(name="quantity") Integer quantity;

    
}
