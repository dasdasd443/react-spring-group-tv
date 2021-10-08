
package com.rakuten.rest.Model;




import javax.persistence.*;

@Entity
@Table(name="user")
public class User {
    private @Id
    @GeneratedValue @Column(name="id") long id;
    private @Column(name="name", length=50) String name;
    private @Column(name="password", length=50) String password;
    private @Column(name="email",unique = true, length=50) String email;
    private @Column(name="billing_address", length=100) String billing_address;
    private @Column(name="shipping_address", length=100) String shipping_address;
    private @Column(name="role", length=3) String role;
    private @Column(name="phone",length=11) String phone;
    private @Column(name="seller_name", length=11) String seller_name;
    private String token;

    public User() {
    }

    @Override
    public String toString() {
        return "{\"id\":\""+id+"\",\"name\":\""+name+"\",\"email\":\""+email+"\",\"billing_address\":\""+billing_address+"\",\"shipping_address\":\""+shipping_address+"\",\"role\":\""+role+"\",\"phone\":\""+phone+"\",\"seller_name\":\""+seller_name+"\"}";
    }


    

    public User(long id, String name, String password, String email, String role, String phone, 
                String seller_name, String token) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.email = email;
        this.role = role;
        this.phone = phone;
        this.seller_name = seller_name;
        this.token = token;
    }

    

    public User(String name, String password, String email, String billing_address, String shipping_address,
                String seller_name, String role, String phone) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.billing_address = billing_address;
        this.shipping_address = shipping_address;
        this.role = role;
        this.phone = phone;
        this.seller_name = seller_name;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getBilling_address() {
        return billing_address;
    }

    public void setBilling_address(String billing_address) {
        this.billing_address = billing_address;
    }

    public String getShipping_address() {
        return shipping_address;
    }

    public void setShipping_address(String shipping_address) {
        this.shipping_address = shipping_address;
    }

    public String getSeller_name() {
        return seller_name;
    }

    public void setSeller_name(String seller_name) {
        this.seller_name = seller_name;
    }

    
    
}
