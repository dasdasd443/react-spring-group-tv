package com.rakuten.rest.Model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="orders")
public class Orders {
    private @Id
    @GeneratedValue @Column(name="id") long id;
    private @Column(name="customer_id", length=11) int customer_id;
    private @Column(name="order_date") Date order_date;
    private @Column(name="order_status") String order_status;

    
}
