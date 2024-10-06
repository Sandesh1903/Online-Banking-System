package com.project_14.OnlineBankingSystem.dto;

import com.project_14.OnlineBankingSystem.model.Customer;
import lombok.*;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AccountDTO {
    private long accountId;
    private String accountType;
    private double accountBalance;
    private Date accountCreationDate;
    private long customerId;
    private Customer customer;
    private int tenure;
    private double amountToBeCredited;
    private float interest;

    public AccountDTO(String accountType, double accountBalance, Date accountCreationDate, Customer customer,double amountToBeCredited, float interest, int tenure) {
        this.accountType = accountType;
        this.accountBalance = accountBalance;
        this.accountCreationDate = accountCreationDate;
        this.customer = customer;
        this.interest = interest;
        this.amountToBeCredited = amountToBeCredited;
        this.tenure = tenure;
    }
}
