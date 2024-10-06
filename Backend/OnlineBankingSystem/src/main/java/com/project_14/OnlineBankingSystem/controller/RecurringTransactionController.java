package com.project_14.OnlineBankingSystem.controller;

import com.project_14.OnlineBankingSystem.annotation.AuthAnnotation;
import com.project_14.OnlineBankingSystem.model.RecurringTransaction;
import com.project_14.OnlineBankingSystem.service.RecurringTransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AuthAnnotation
@RestController
@RequestMapping("recurring_txn")
//@AuthAnnotation
public class RecurringTransactionController {

    @Autowired
    private RecurringTransactionService recurringTransactionService;

    @PostMapping("/isValidAccountId")
    public ResponseEntity<String> checkAccountId(@RequestBody RecurringTransaction recurringTransaction) {
        String isPresent = recurringTransactionService.checkAccountId(recurringTransaction.getAccountId(), recurringTransaction.getBillType());
        if(isPresent=="FOUND") {
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid Billing Account!");
        }

    }

    @PostMapping("/check_autopay_status")
    public ResponseEntity<String> checkAutoPayStatus(@RequestBody RecurringTransaction recurringTransaction) {
        String isEnabled = recurringTransactionService.isSetOnAutoPay(recurringTransaction.getAccountId(), recurringTransaction.getBillType());
        if(isEnabled=="ENABLED"){
            return ResponseEntity.status(HttpStatus.OK).body("true");
        }else if(isEnabled=="DISABLED")
            {
                return ResponseEntity.status(HttpStatus.OK).body("false");
            }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid Id");
        }

    }

    @PostMapping("/update_autopay_status")
    public ResponseEntity<Object> updateAutoPayStatus(@RequestBody RecurringTransaction recurringTransaction) {
        try {
            RecurringTransaction updatedRecurringTxn = recurringTransactionService.updateAutopayStatus(recurringTransaction);
            return ResponseEntity.status(HttpStatus.OK).body(updatedRecurringTxn);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
