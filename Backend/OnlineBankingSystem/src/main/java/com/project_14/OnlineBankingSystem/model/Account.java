package com.project_14.OnlineBankingSystem.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Account {
    @Id
    private long accountId;
    @Column(nullable = false)
    private String accountType;
    @Column(nullable = false)
    private double accountBalance;
    private int tenure;
    private double amountToBeCredited;
    private float interest;
    @Column(nullable = false)
    private Date accountCreationDate;

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "customerId", nullable = false)
    @JsonBackReference
    @ToString.Exclude
    private Customer customer;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable( name = "account_transaction_table" ,
        joinColumns = {
            @JoinColumn(name = "account_id", referencedColumnName = "accountId")
        },
            inverseJoinColumns = {
            @JoinColumn(name = "transaction_id", referencedColumnName = "transactionId")
            }
    )
    @ToString.Exclude
    private List<Transaction> transactionList;

    public Account(Long accountId, String accountType, double accountBalance, Date accountCreationDate, Customer customer,double amountToBeCredited, float interest, int tenure) {
        this.accountId = accountId;
        this.accountType = accountType;
        this.accountBalance = accountBalance;
        this.accountCreationDate = accountCreationDate;
        this.customer = customer;
        this.amountToBeCredited = amountToBeCredited;
        this.interest = interest;
        this.tenure = tenure;
    }
}