package com.project_14.OnlineBankingSystem.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AccountsListDTO {
    private long accountId;
    private String accountType;
    private double accountBalance;
    private int tenure;
    private double amountToBeCredited;
    private float interest;
    private Date accountCreationDate;
}
