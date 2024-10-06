package com.project_14.OnlineBankingSystem.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransactionDTO {
    private TransactionDetails sender;
    private TransactionDetails recipient;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TransactionDetails {
        private Long accountId;
        private String transactionType;
        private double transactionAmount;

        private Date transactionDate;

        private String transferNote;
    }
}
