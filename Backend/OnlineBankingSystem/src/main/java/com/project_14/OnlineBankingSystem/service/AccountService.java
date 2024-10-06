package com.project_14.OnlineBankingSystem.service;

import com.project_14.OnlineBankingSystem.dto.AccountDTO;
import com.project_14.OnlineBankingSystem.model.Account;
import com.project_14.OnlineBankingSystem.model.Customer;
import com.project_14.OnlineBankingSystem.repo.AccountRepo;
import com.project_14.OnlineBankingSystem.repo.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class AccountService {

    @Autowired
    private AccountRepo accountRepo;

    @Autowired
    private CustomerRepo customerRepo;

    public String createAccount(AccountDTO accountDTO){
        Long accountId = generateUniqueAccountId();
        accountDTO.setAccountId(accountId);
        Account account = convertToEntity(accountDTO);
        System.out.println(account.getCustomer());
        if(account.getCustomer() == null){
            return "NOT_FOUND";
        }
        accountRepo.save(account);
        return "CREATED";
    }

    public Map<String, Object> createIndividualAccount(AccountDTO accountDTO) {
        Long accountId = generateUniqueAccountId();
        accountDTO.setAccountId(accountId);

        Optional<Customer> byCustomerId = customerRepo.findByCustomerId(accountDTO.getCustomerId());

        if(byCustomerId.isEmpty()) {
            // Return a message if customer is not found
            return Map.of("message", "NOT_FOUND");
        }

        // Set customer to accountDTO
        accountDTO.setCustomer(byCustomerId.get());

        // Convert DTO to entity
        Account account = convertToEntity(accountDTO);

        // Debugging log
        System.out.println(account.getCustomer());

        // Save the account
        accountRepo.save(account);

        // Return success message and account ID
        return Map.of("message", "CREATED", "accountId", accountId);
    }


    private Account convertToEntity(AccountDTO accountDTO){
        return new Account(accountDTO.getAccountId(),accountDTO.getAccountType(),accountDTO.getAccountBalance(),accountDTO.getAccountCreationDate(),accountDTO.getCustomer(),accountDTO.getAmountToBeCredited(),accountDTO.getInterest(),accountDTO.getTenure());
    }
    
    public Account getAccountDetailsByAccountId(long accountId) {
        Optional<Account> accountDetails = accountRepo.findByAccountId(accountId);
        return accountDetails.orElse(null);
    }

    public synchronized Long generateUniqueAccountId() {
        String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMM"));

        int count = 1;
        String uniqueAccountId = currentDate + count;
        while (accountRepo.findByAccountId(Long.parseLong(uniqueAccountId)).isPresent()) {
            count++;
            uniqueAccountId = currentDate + count;
        }
        return Long.parseLong(uniqueAccountId);
    }

    public List<Account> getAllAccounts(Long customerId) {
        List<Account> allAccounts = accountRepo.findAllByCustomer_CustomerId(customerId);
        return allAccounts;
    }


}