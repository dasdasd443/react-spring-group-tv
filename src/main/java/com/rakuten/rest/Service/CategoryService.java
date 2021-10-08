package com.rakuten.rest.Service;

import java.util.List;

import com.rakuten.rest.Model.Category;
import com.rakuten.rest.Repository.CategoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class CategoryService {
    
    public final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getCategories(){
        return categoryRepository.findAll();
    }

    public void addCategory(Category category) {
        categoryRepository.save(category);
    }

    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }

    public void updateCategory(Category category) {
        categoryRepository.findById(category.getId()).map(
            newCategory -> {
                newCategory.setId(category.getId());
                newCategory.setCategory_name(category.getCategory_name());
                newCategory.setCategory_description(category.getCategory_description());
                return categoryRepository.save(newCategory);
            }
        );
    }
}
