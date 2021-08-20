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
    @GeneratedValue @Column(name="id") Long id;
    private @Column(name="customer_id", length=11) Long customer_id;
    private @Column(name="order_date") Date order_date;
    private @Column(name="order_status") String order_status;

    
    public Orders() {
    }
    public Orders(Long id, Long customer_id, Date order_date, String order_status) {
        this.id = id;
        this.customer_id = customer_id;
        this.order_date = order_date;
        this.order_status = order_status;
    }
    public Orders(Long customer_id, Date order_date, String order_status) {
        this.customer_id = customer_id;
        this.order_date = order_date;
        this.order_status = order_status;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Long getCustomer_id() {
        return customer_id;
    }
    public void setCustomer_id(Long customer_id) {
        this.customer_id = customer_id;
    }
    public Date getOrder_date() {
        return order_date;
    }
    public void setOrder_date(Date order_date) {
        this.order_date = order_date;
    }
    public String getOrder_status() {
        return order_status;
    }
    public void setOrder_status(String order_status) {
        this.order_status = order_status;
    }

    
}
