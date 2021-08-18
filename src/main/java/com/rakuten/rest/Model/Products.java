package com.rakuten.rest.Model;

<<<<<<< HEAD
=======
import java.util.Date;

>>>>>>> feature/user-crud
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
<<<<<<< HEAD
    private String description;
    private String image_name;
    private double discount_price;
    private double price;
=======
    private double discount_price;
    private double price;
    private String description;
    private double weight;
    private String thumbnail;
    private String image;
    private String category;
    private int quantity;
    private Date created_date;
    private Long seller_id;
>>>>>>> feature/user-crud

    public Products() {
    }
    
<<<<<<< HEAD
    public Products(Long product_id, String product_name, String brand, String description, String image_name,
            double discount_price, double price) {
        this.product_id = product_id;
        this.product_name = product_name;
        this.brand = brand;
        this.setDescription(description);
        this.setImage_name(image_name);
        this.discount_price = discount_price;
        this.price = price;
    }

    public Products(String product_name, String brand, String description, String image_name, double discount_price,
            double price) {
        this.product_name = product_name;
        this.brand = brand;
        this.setDescription(description);
        this.setImage_name(image_name);
        this.discount_price = discount_price;
        this.price = price;
=======
    public Products(Long product_id, String product_name, String brand, double discount_price, double price,
            String description, double weight, String thumbnail, String image, String category, int quantity,
            Date created_date, Long seller_id) {
        this.product_id = product_id;
        this.product_name = product_name;
        this.brand = brand;
        this.discount_price = discount_price;
        this.price = price;
        this.description = description;
        this.weight = weight;
        this.thumbnail = thumbnail;
        this.image = image;
        this.category = category;
        this.quantity = quantity;
        this.created_date = created_date;
        this.seller_id = seller_id;
    }

    public Products(String product_name, String brand, double discount_price, double price, String description,
            double weight, String thumbnail, String image, String category, int quantity, Date created_date, Long seller_id) {
        this.product_name = product_name;
        this.brand = brand;
        this.discount_price = discount_price;
        this.price = price;
        this.description = description;
        this.weight = weight;
        this.thumbnail = thumbnail;
        this.image = image;
        this.category = category;
        this.quantity = quantity;
        this.created_date = created_date;
        this.seller_id = seller_id;
>>>>>>> feature/user-crud
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

<<<<<<< HEAD
    public String getImage_name() {
        return image_name;
    }

    public void setImage_name(String image_name) {
        this.image_name = image_name;
    }

=======
    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    

>>>>>>> feature/user-crud
    public String getDescription() {
        return description;
    }

<<<<<<< HEAD
    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
=======
    public void setDescriptions(String descriptions) {
        this.description = descriptions;
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
    
    public Long getSeller_id() {
        return seller_id;
    }

    public void setSeller_id(Long seller_id) {
        this.seller_id = seller_id;
    }

    

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((image == null) ? 0 : image.hashCode());
        result = prime * result + ((product_id == null) ? 0 : product_id.hashCode());
        result = prime * result + ((product_name == null) ? 0 : product_name.hashCode());
        long temp;
        temp = Double.doubleToLongBits(weight);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Products other = (Products) obj;
        if (image == null) {
            if (other.image != null)
                return false;
        } else if (!image.equals(other.image))
            return false;
        if (product_id == null) {
            if (other.product_id != null)
                return false;
        } else if (!product_id.equals(other.product_id))
            return false;
        if (product_name == null) {
            if (other.product_name != null)
                return false;
        } else if (!product_name.equals(other.product_name))
            return false;
        if (Double.doubleToLongBits(weight) != Double.doubleToLongBits(other.weight))
            return false;
        return true;
>>>>>>> feature/user-crud
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
