package com.example.springboot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/employees")
public class EmployeeController
{
//    @Autowired
//    private EmployeeDAO employeeDao;

    @GetMapping
    public ResponseEntity<String> getEmployees()
    {
        return new ResponseEntity<>("Should be secured", HttpStatus.OK);
    }
}