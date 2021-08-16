package com.rakuten.rest.Repository;

import com.rakuten.rest.Model.Category;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long>{
    
}
