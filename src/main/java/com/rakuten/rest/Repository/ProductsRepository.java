package com.rakuten.rest.Repository;

import com.rakuten.rest.Model.Products;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductsRepository extends JpaRepository<Products, Long> {
}
