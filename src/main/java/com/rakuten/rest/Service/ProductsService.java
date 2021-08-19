package com.rakuten.rest.Service;

import com.rakuten.rest.Bucket.Buckets;
import com.rakuten.rest.ImageStore.ImageStore;
import com.rakuten.rest.Model.Products;
import com.rakuten.rest.Repository.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductsService {

    @Autowired
    public final ProductsRepository productsRepository;

    public final ImageStore imageStore;

    @Autowired
    public ProductsService(ProductsRepository productsRepository, ImageStore imageStore) {
        this.productsRepository = productsRepository;
        this.imageStore = imageStore;
    }

    public List<Products> getProducts(){
        return productsRepository.findAll();
    }

    public List<Products> getSellerProducts(Long id){
        return productsRepository.getSellerProducts(id);
    }

    public Products saveProduct(Products product){
        return productsRepository.saveAndFlush(product);
    }

    public void deleteProduct(Long id){
        productsRepository.deleteById(id);
    }

    public void updateProduct(Products product){
        productsRepository.findById(product.getProduct_id()).map(
                products -> {
                    products.setProduct_name(product.getProduct_name());
                    products.setBrand(product.getBrand());
                    products.setDiscount_price(product.getDiscount_price());
                    products.setSeller_id(product.getSeller_id());
                    products.setImage(product.getImage());
                    products.setQuantity(product.getQuantity());
                    products.setThumbnail(product.getThumbnail());
                    products.setPrice(product.getPrice());
                    products.setWeight(product.getWeight());
                    products.setDescriptions(product.getDescription());
                    products.setCategory(product.getCategory());
                    products.setCreated_date(product.getCreated_date());
                    return productsRepository.save(products);
                }
        );
    }

    public byte[] getImage(String product_name, String filename) {
        
        String path = String.format("%s/%s", Buckets.PROFILE_IMAGE.getBucket(), product_name);
        return imageStore.getImage(path,filename);
    }

    public Optional<Products> getProduct(Long product_id) {
        return productsRepository.findById(product_id);
    }
}
