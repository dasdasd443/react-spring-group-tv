package com.rakuten.rest.Controller;


import com.rakuten.rest.Bucket.Buckets;
import com.rakuten.rest.ImageStore.ImageStore;
import com.rakuten.rest.Model.Products;
import com.rakuten.rest.Service.ProductsService;

import org.apache.http.entity.ContentType;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Blob;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;


@Controller
@RestController
@RequestMapping(path="/product")
public class ProductsController {

    private final ProductsService productsService;
    private final ImageStore imageStore;

    @Autowired
    public ProductsController(ProductsService productsService, ImageStore imageStore) {
        this.productsService = productsService;
        this.imageStore = imageStore;
    }

    @PostMapping(value="/save")
    public void saveProduct(
        @RequestParam("product_name") String product_name,
        @RequestParam("brand") String brand,
        @RequestParam("discount_price") double discount_price,
        @RequestParam("price") double price,
        @RequestParam("description") String description,
        @RequestParam("weight") double weight,
        @RequestParam("thumbnail") String thumbnail,
        @RequestParam("image") MultipartFile image,
        @RequestParam("category") String category,
        @RequestParam("seller_id") Long seller_id,
        @RequestParam("quantity") int quantity,
        @RequestParam("created_date") Date created_date
        ){
            if(image.isEmpty()){
                throw new IllegalStateException("No image uploaded");
            }


            if(!Arrays.asList(ContentType.IMAGE_JPEG.getMimeType(), ContentType.IMAGE_PNG.getMimeType()).contains(image.getContentType())){
                throw new IllegalStateException("Must upload an image");
            }

            Map<String, String> metadata = new HashMap<>();
            metadata.put("Content-Type", image.getContentType());
            metadata.put("Content-Length", String.valueOf(image.getSize()));

            String path = String.format("%s/%s", Buckets.PROFILE_IMAGE.getBucket(), product_name);
            String filename = String.format("%s-%s", image.getName(), UUID.randomUUID());
            
            try{
                imageStore.save(path, filename, Optional.of(metadata),image.getInputStream());
            }catch (IOException e){
                throw new IllegalStateException(e);
            }

            Products newProduct = new Products(
                product_name,
                brand,
                discount_price,
                price,
                description,
                weight,
                thumbnail,
                filename,
                category,
                quantity,
                created_date,
                seller_id
            );
        productsService.saveProduct(newProduct);
    }

    @DeleteMapping("/delete")
    public void deleteProduct(@RequestBody Products product){

        productsService.deleteProduct(product.getProduct_id());
    }

    @PutMapping("/update")
    public void updateProduct(@RequestBody Products product){
        productsService.updateProduct(product);
    }

    @GetMapping("/get-seller-products/{id}")
    public List<Products> getSellerProducts(@PathVariable("id") Long id){
        return productsService.getSellerProducts(id);
    }

    @GetMapping("/get-image/{product_name}/{filename}")
    public byte[] getImage(@PathVariable("product_name") String product_name, @PathVariable("filename") String filename){
        return productsService.getImage(product_name,filename);
    }
}
