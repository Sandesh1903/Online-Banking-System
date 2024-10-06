package com.project_14.OnlineBankingSystem.service;

import com.project_14.OnlineBankingSystem.dto.AccountDTO;
import com.project_14.OnlineBankingSystem.dto.CustomerDTO;
import com.project_14.OnlineBankingSystem.model.Customer;
import com.project_14.OnlineBankingSystem.repo.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Optional;
//@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@Service
public class CustomerService {

    @Autowired
    private CustomerRepo customerRepo;

    public CustomerService(CustomerRepo customerRepo){
        this.customerRepo = customerRepo;
    }

    @Autowired
    private AccountService accountService;

    @Autowired
    private PasswordGeneratorService passwordGeneratorService;

    // add Customer to DataBase
    public String addCustomerDto(CustomerDTO customerDTO){
        String msg;
        Optional<Customer> findCustomerEmail = customerRepo.findByCustomerEmail(customerDTO.getCustomerEmail());
        if(findCustomerEmail.isPresent()){
            msg="EXISTS";
            return msg;
        }
        customerDTO.setCustomerId(generateUniqueCustomerId());
        System.out.println("customer dto id");
        System.out.println(customerDTO.getCustomerId());
        String password = passwordGeneratorService.generateRandomPassword();
        System.out.println(password);
        customerDTO.setCustomerPassword(password);
        Customer customer = convertToEntity(customerDTO);
        try {
            Customer newCustomer = customerRepo.save(customer);
            System.out.println("newCustomer");
            System.out.println(newCustomer);
            String response = accountService.createAccount(new AccountDTO(customerDTO.getAccountType(), 0.0, customerDTO.getCustomerRegistrationDate(), newCustomer,customerDTO.getAmountToBeCredited(), customerDTO.getInterest(),customerDTO.getTenure()));
            if(response.equals("CREATED")){
                msg="CREATED";
                return msg;
            }else {
                msg="FAILED";
                return msg;
            }
        }catch(Exception e) {
            e.printStackTrace();
            return "FAILED";
        }

    }

    // Converts DTO class to Entity class
    private Customer convertToEntity(CustomerDTO customerDTO) {
        return new Customer(customerDTO.getCustomerId(), customerDTO.getCustomerFirstName(),customerDTO.getCustomerLastName(),customerDTO.getCustomerDateOfBirth(),customerDTO.getCustomerPANCardNumber(),customerDTO.getCustomerAadharCardNumber(),customerDTO.getCustomerGender(),customerDTO.getCustomerEmail(),customerDTO.getCustomerMobileNo(),customerDTO.getCustomerAddress(),customerDTO.getCustomerRegistrationDate(),customerDTO.getCustomerPassword());
    }

    private CustomerDTO convertToDTO(Customer customer){
        return new CustomerDTO(customer.getCustomerId(),customer.getCustomerFirstName(),customer.getCustomerLastName(),customer.getCustomerDateOfBirth(),customer.getCustomerPANCardNumber(),customer.getCustomerAadharCardNumber(),customer.getCustomerGender(),customer.getCustomerEmail(),customer.getCustomerMobileNo(),customer.getCustomerAddress(),customer.getCustomerRegistrationDate(),customer.isEmailVerified());
    }

    public CustomerDTO verifyCredentials(CustomerDTO customerDTO) {
        Optional<Customer> verifyId = customerRepo.findByCustomerId(customerDTO.getCustomerId());
        if(verifyId.isPresent()){
            Customer customer = verifyId.get();
            boolean verifyPassword = customerDTO.getCustomerPassword().equals(customer.getCustomerPassword());
            if(verifyPassword){
                return convertToDTO(customerRepo.findByCustomerId(customerDTO.getCustomerId()).get());
            }
        }
        return null;
    }

    public synchronized Long generateUniqueCustomerId() {
        String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMM"));

        int count = 1;
        String uniqueCustomerId = currentDate + count;
        while (customerRepo.findByCustomerId(Long.parseLong(uniqueCustomerId)).isPresent()) {
            count++;
            uniqueCustomerId = currentDate + count;
        }
        return Long.parseLong(uniqueCustomerId);
    }

    public Optional<Customer> findEmail(CustomerDTO customerDTO) {
        return customerRepo.findByCustomerEmail(customerDTO.getCustomerEmail());
    }

    public String resetPassword(CustomerDTO customerDTO) {
        Optional<Customer> byCustomerEmail = customerRepo.findByCustomerEmail(customerDTO.getCustomerEmail());
        Customer customer = byCustomerEmail.get();
        customer.setCustomerPassword(customerDTO.getCustomerPassword());
        Customer savedCustomer = customerRepo.save(customer);
        System.out.println(savedCustomer.getCustomerPassword().equals(customerDTO.getCustomerPassword()));
        if(savedCustomer.getCustomerPassword().equals(customerDTO.getCustomerPassword())){
            return "UPDATED";
        }
        return "UPDATED_FAILED";
    }
}
