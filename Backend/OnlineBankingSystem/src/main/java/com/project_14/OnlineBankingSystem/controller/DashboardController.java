package com.project_14.OnlineBankingSystem.controller;

import com.project_14.OnlineBankingSystem.annotation.AuthAnnotation;
import com.project_14.OnlineBankingSystem.model.Customer;
import com.project_14.OnlineBankingSystem.repo.CustomerRepo;
import com.project_14.OnlineBankingSystem.service.DashboardService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/dashboard")
@AuthAnnotation
public class DashboardController {

    private final DashboardService dashboardService;

    @Autowired
    public DashboardController(DashboardService dashboardService){
        this.dashboardService = dashboardService;
    }

    @GetMapping("/")
    public ResponseEntity<Object> getCustomerDetails(HttpSession httpSession) {
        try{
            String email = (String) httpSession.getAttribute("email");
            System.out.println("session email");
            System.out.println(email);
            Object response = dashboardService.getCustomerDetails(email);

            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch(Exception e){
            e.printStackTrace();
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went wrong!!");
    }
}