package com.project_14.OnlineBankingSystem.dto;


import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigInteger;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CustomerDTO {

    private long customerId;
    private String customerFirstName;
    private String customerLastName;
    private Date customerDateOfBirth;
    private String customerPANCardNumber;
    private double customerAadharCardNumber;
    private String customerGender;
    private String customerEmail;
    private double customerMobileNo;
    private String customerAddress;
    private Date customerRegistrationDate;
    private String customerPassword;
    private boolean isEmailVerified;
    private String accountType;
    private int tenure;
    private double amountToBeCredited;
    private float interest;

    public CustomerDTO(long customerId, String customerFirstName, String customerLastName, Date customerDateOfBirth, String customerPANCardNumber, double customerAadharCardNumber, String customerGender, String customerEmail, double customerMobileNo, String customerAddress, Date customerRegistrationDate, boolean isEmailVerified) {
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
        this.isEmailVerified=isEmailVerified;
    }

}