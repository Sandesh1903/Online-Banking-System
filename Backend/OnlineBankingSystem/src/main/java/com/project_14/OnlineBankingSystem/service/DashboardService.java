package com.project_14.OnlineBankingSystem.service;

import com.project_14.OnlineBankingSystem.model.Customer;
import com.project_14.OnlineBankingSystem.repo.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DashboardService {

    private final CustomerRepo customerRepo;

    @Autowired
    public DashboardService(CustomerRepo customerRepo) {
        this.customerRepo = customerRepo;
    }

    public Object getCustomerDetails(String email) {
        System.out.println(email + "====================");
        Optional<Customer> customerDetails = customerRepo.findByCustomerEmail(email);
        if (customerDetails.isPresent()) {
            return customerDetails.get();
        }else {
            return "Not Found";
        }
    }
}
