package com.rakuten.rest.Service;

import com.rakuten.rest.Model.Products;
import com.rakuten.rest.Repository.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProductsService {

    public final ProductsRepository productsRepository;

    @Autowired
    public ProductsService(ProductsRepository productsRepository) {
        this.productsRepository = productsRepository;
    }

    public List<Products> getProducts(){
        return productsRepository.findAll();
    }

    public void saveProduct(Products product){
        productsRepository.save(product);
    }

    public void deleteProduct(Long id){
        productsRepository.deleteById(id);
    }

    public void updateProduct(Products product){
        productsRepository.findById(product.getProduct_id()).map(
                products -> {
                    products.setProduct_name(product.getProduct_name());
                    products.setBrand(product.getBrand());
                    products.setPrice(product.getPrice());
                    products.setDiscount_price(product.getDiscount_price());

                    return productsRepository.save(products);
                }
        );
    }
}
