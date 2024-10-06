package com.project_14.OnlineBankingSystem.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Customer {

    @Id
    private long customerId;
    @Column(nullable = false)
    private String customerFirstName;
    @Column(nullable = false)
    private String customerLastName;
    @Column(nullable = false)
    private Date customerDateOfBirth;
    @Column(nullable = false)
    private String customerPANCardNumber;
    @Column(nullable = false)
    private double customerAadharCardNumber;
    @Column(nullable = false)
    private String customerGender;
    @Column(nullable = false)
    private String customerEmail;
    @Column(nullable = false)
    private double customerMobileNo;
    @Column(nullable = false)
    private String customerAddress;
    @Column(nullable = false)
    private Date customerRegistrationDate;
    @Column(nullable = false)
    private String customerPassword;
    @Column(nullable = false)
    private boolean isEmailVerified = false;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Account> account;

    @OneToOne(mappedBy = "customer", cascade = CascadeType.ALL,orphanRemoval = true)
    @JsonManagedReference
    private Token token;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Beneficiary> beneficiaryList;

    public Customer(long customerId, String customerFirstName, String customerLastName, Date customerDateOfBirth, String customerPANCardNumber, double customerAadharCardNumber, String customerGender, String customerEmail, double customerMobileNo, String customerAddress, Date customerRegistrationDate, String customerPassword) {
        this.customerId = customerId;
        this.customerFirstName = customerFirstName;
        this.customerLastName = customerLastName;
        this.customerDateOfBirth = customerDateOfBirth;
        this.customerPANCardNumber = customerPANCardNumber;
        this.customerAadharCardNumber = customerAadharCardNumber;
        this.customerGender = customerGender;
        this.customerEmail = customerEmail;
        this.customerMobileNo = customerMobileNo;
        this.customerAddress = customerAddress;
        this.customerRegistrationDate = customerRegistrationDate;
        this.customerPassword = customerPassword;
    }
}
