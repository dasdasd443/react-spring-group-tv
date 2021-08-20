package com.rakuten.rest.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="api/category")
@CrossOrigin(origins="http://localhost:3000", allowedHeaders = "*")
public class OrdersController {
    
}
