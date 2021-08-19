package com.rakuten.rest.Controller;

import java.util.List;

import com.rakuten.rest.Model.Category;
import com.rakuten.rest.Repository.CategoryRepository;
import com.rakuten.rest.Service.CategoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @PostMapping("/add-category")
    public void addCategory(@RequestBody Category category){
        this.categoryService.addCategory(category);
    }

    @DeleteMapping("/delete-category/{id}")
    public void deleteCategory(@PathVariable("id") Long id){
        categoryService.deleteCategory(id);
    }

    @PutMapping("/update-category")
    public void updateCategory(@RequestBody Category category){
        categoryService.updateCategory(category);
    }
    
}
