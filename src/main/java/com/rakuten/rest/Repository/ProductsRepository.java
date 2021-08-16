package com.rakuten.rest.Repository;

import java.util.List;

import com.rakuten.rest.Model.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface ProductsRepository extends JpaRepository<Products, Long> {

    @Query("SELECT p FROM Products p WHERE p.seller_id = ?1")
    List<Products> getSellerProducts(Long id);
}
