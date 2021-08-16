package com.rakuten.rest.Controller;

import java.util.List;

import com.rakuten.rest.Model.Category;
import com.rakuten.rest.Repository.CategoryRepository;
import com.rakuten.rest.Service.CategoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(path="api/category")
public class CategoryController {
    
    private final CategoryService categoryService;


    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }



    @GetMapping("/")
    public List<Category> getCategories(){
        return categoryService.getCategories();
    }
    
}
