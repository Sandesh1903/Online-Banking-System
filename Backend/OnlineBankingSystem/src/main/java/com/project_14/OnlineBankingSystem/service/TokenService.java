package com.project_14.OnlineBankingSystem.service;

import com.project_14.OnlineBankingSystem.model.Customer;
import com.project_14.OnlineBankingSystem.model.Token;
import com.project_14.OnlineBankingSystem.repo.CustomerRepo;
import com.project_14.OnlineBankingSystem.repo.TokenRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Optional;
import java.util.UUID;
@Service
public class TokenService {

    @Autowired
    private TokenRepo tokenRepo;

    @Autowired
    private CustomerRepo customerRepo;

    public String generateVerificationToken(String customerEmail) {
        try{
            Optional<Customer> customerData = customerRepo.findByCustomerEmail(customerEmail);
            if (customerData.isPresent()) {
                Customer customer = customerData.get();
                Token token = customer.getToken();
                if (token == null) {
                    token = new Token();
                    token.setCustomer(customerData.get());
                }
                token.setToken(UUID.randomUUID().toString());
                tokenRepo.save(token);
                return token.getToken();
            }else {
               return "EMAIL NOT FOUND";
            }
        } catch (Exception e) {
            return "Something went wrong!! "+e.toString();
        }

    }
    public long getDifferenceInMilliseconds(LocalDateTime givenDate) {
        LocalDateTime now = LocalDateTime.now();
        long currentMilliseconds = now.toInstant(ZoneOffset.UTC).toEpochMilli();
        long givenDateAtMilliseconds = givenDate.toInstant(ZoneOffset.UTC).toEpochMilli();
        return currentMilliseconds - givenDateAtMilliseconds;
    }

    @Transactional
    public String verifyCustomerToken(String customerEmail,String tokenToBeVerified) {
        String msg = "";
        Optional<Customer> customerData = customerRepo.findByCustomerEmail(customerEmail);
        if(customerData.isPresent()){
            Customer customer = customerData.get();
            Token token = customer.getToken();
            if(token!=null && token.getToken().equals(tokenToBeVerified)) {
                long diff =  getDifferenceInMilliseconds(token.getCreatedAt());
                long thirtyMinutesInMilliseconds = 30 * 60 * 1000;
                System.out.println("30 minutes in milliseconds: " + thirtyMinutesInMilliseconds);
                if(diff>thirtyMinutesInMilliseconds){
                    msg="token expired";
                    tokenRepo.deleteById(token.getId());
                }
                else {
                    customer.setEmailVerified(true);
                    customerRepo.save(customer);
                    if(customer.isEmailVerified()) {
                        msg = "account verified";
                        customer.setToken(null);
                        tokenRepo.deleteById(token.getId());
                    }
                }
            }else {
                if(customer.isEmailVerified()) {
                    msg = "user already verified";
                }else {
                    msg = "token expired";
                }
            }
        }
    return msg;
    }
}
