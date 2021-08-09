package com.rakuten.rest.Controller;


import com.rakuten.rest.Model.Products;
import com.rakuten.rest.Service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@Controller
@RestController
@RequestMapping(path="/product")
public class ProductsController {

    private final ProductsService productsService;

    @Autowired
    public ProductsController(ProductsService productsService) {
        this.productsService = productsService;
    }

    @PostMapping("/save")
    public String saveProduct(@RequestBody Products product){
        productsService.saveProduct(product);
        return product.toString();
    }

    @DeleteMapping("/delete")
    public void deleteProduct(@RequestBody Products product){

        productsService.deleteProduct(product.getProduct_id());
    }

    @PutMapping("/update")
    public void updateProduct(@RequestBody Products product){
        productsService.updateProduct(product);
    }
}
