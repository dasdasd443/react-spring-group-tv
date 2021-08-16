package com.rakuten.rest.Model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="category")
public class Category {
    private @Id
    @GeneratedValue @Column(name="id") long id;
    private @Column(name="category_name", length=50) String category_name;
    private @Column(name="category_description", length=100) String category_description;

    public Category() {
    }

    public Category(long id, String category_name, String category_description) {
        this.id = id;
        this.category_name = category_name;
        this.category_description = category_description;
    }

    public Category(String category_name, String category_description) {
        this.category_name = category_name;
        this.category_description = category_description;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCategory_name() {
        return category_name;
    }

    public void setCategory_name(String category_name) {
        this.category_name = category_name;
    }

    public String getCategory_description() {
        return category_description;
    }

    public void setCategory_description(String category_description) {
        this.category_description = category_description;
    }

    @Override
    public String toString() {
        return "Category [category_description=" + category_description + ", category_name=" + category_name + ", id="
                + id + "]";
    }

    
    

    
}
