package com.project_14.OnlineBankingSystem.controller;

import com.project_14.OnlineBankingSystem.annotation.AuthAnnotation;
import com.project_14.OnlineBankingSystem.dto.AccountDTO;
import com.project_14.OnlineBankingSystem.model.Account;
import com.project_14.OnlineBankingSystem.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

//@CrossOrigin("*")

@AuthAnnotation
@RestController
@RequestMapping("/account")
public class AccountController {

    @Autowired
    private final AccountService accountService;

    public AccountController(AccountService accountService){
        this.accountService = accountService;
    }

    @PostMapping("/createAccount")
    public ResponseEntity<Map<String, Object>> createAccount(@RequestBody AccountDTO accountDTO) {
        try {
            Map<String, Object> response = accountService.createIndividualAccount(accountDTO);

            // Check if the "message" in the response is "NOT_FOUND"
            if ("NOT_FOUND".equals(response.get("message"))) {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(response);
            }

            // If creation is successful
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(response);
        } catch (Exception e) {
            // Return a consistent response format for errors
            Map<String, Object> errorResponse = Map.of("message", "Something went wrong..!", "error", e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(errorResponse);
        }
    }


    @GetMapping ("/getAccounts/{customerId}")
    public ResponseEntity<List<Account>> getAccounts(@PathVariable Long customerId){
        System.out.println(customerId);
        List<Account> accounts = accountService.getAllAccounts(customerId);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(accounts);
    }
}
