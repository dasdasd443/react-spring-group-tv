package com.rakuten.rest.Model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
public class Products {
    @Id
    @GeneratedValue
    private Long product_id;
    private String product_name;
    private String brand;
    private double discount_price;
    private double price;
    private String descriptions;
    private double weight;
    private String thumbnail;
    private String image;
    private String category;
    private int quantity;
    private Date created_date;

    public Products() {
    }
    
    public Products(Long product_id, String product_name, String brand, double discount_price, double price,
            String descriptions, double weight, String thumbnail, String image, String category, int quantity,
            Date created_date) {
        this.product_id = product_id;
        this.product_name = product_name;
        this.brand = brand;
        this.discount_price = discount_price;
        this.price = price;
        this.descriptions = descriptions;
        this.weight = weight;
        this.thumbnail = thumbnail;
        this.image = image;
        this.category = category;
        this.quantity = quantity;
        this.created_date = created_date;
    }

    public Products(String product_name, String brand, double discount_price, double price, String descriptions,
            double weight, String thumbnail, String image, String category, int quantity, Date created_date) {
        this.product_name = product_name;
        this.brand = brand;
        this.discount_price = discount_price;
        this.price = price;
        this.descriptions = descriptions;
        this.weight = weight;
        this.thumbnail = thumbnail;
        this.image = image;
        this.category = category;
        this.quantity = quantity;
        this.created_date = created_date;
    }

    public Long getProduct_id() {
        return product_id;
    }

    public void setProduct_id(Long product_id) {
        this.product_id = product_id;
    }

    public String getProduct_name() {
        return product_name;
    }

    public void setProduct_name(String product_name) {
        this.product_name = product_name;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public double getDiscount_price() {
        return discount_price;
    }

    public void setDiscount_price(double discount_price) {
        this.discount_price = discount_price;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    

    public String getDescriptions() {
        return descriptions;
    }

    public void setDescriptions(String descriptions) {
        this.descriptions = descriptions;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Date getCreated_date() {
        return created_date;
    }

    public void setCreated_date(Date created_date) {
        this.created_date = created_date;
    }

    @Override
    public String toString() {
        return "Products{" +
                "product_id=" + product_id +
                ", product_name='" + product_name + '\'' +
                ", brand='" + brand + '\'' +
                ", discount_price=" + discount_price +
                ", price=" + price +
                '}';
    }
}
