package com.project_14.OnlineBankingSystem.controller;

import com.project_14.OnlineBankingSystem.dto.TransactionDTO;
import com.project_14.OnlineBankingSystem.model.Transaction;
import com.project_14.OnlineBankingSystem.service.TransactionService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transaction")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    public TransactionController(TransactionService transactionService){
        this.transactionService = transactionService;
    }

    @PostMapping("/paymentTransfer")
    public ResponseEntity<String> paymentTransfer(@RequestBody TransactionDTO transactionDTO){
        String response = transactionService.paymentTransfer(transactionDTO);
        try {
            if(response.equals("NOT_FOUND")){
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(response);
            }else if(response.equals("NOT_ACCEPTED")){
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(response);
            } else if (response.equals("INSUFFICIENT_BALANCE")) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(response);
            }
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(response);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Something went wrong.");
        }
    }

    @GetMapping("/transactionDetails/{customerId}")
    public ResponseEntity<List<Transaction>> transactionList(@PathVariable long customerId){
        try {
            List<Transaction> transactionHistoryByCustomerId = transactionService.getTransactionHistoryByCustomerId(customerId);
            System.out.println(transactionHistoryByCustomerId);
            System.out.println(customerId);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(transactionHistoryByCustomerId);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(null);
        }

    }

    @GetMapping("/recent_transactions")
    public ResponseEntity<List<Transaction>> recentTransactions(HttpSession httpSession) {
        try {
            System.out.println("recent txns");
            String email = (String) httpSession.getAttribute("email");
            System.out.println("session email");
            List<Transaction> recentTransactions = transactionService.getRecentTransactionHistory(email);
            System.out.println(email);
            System.out.println(recentTransactions);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(recentTransactions);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(null);
        }
    }
}
