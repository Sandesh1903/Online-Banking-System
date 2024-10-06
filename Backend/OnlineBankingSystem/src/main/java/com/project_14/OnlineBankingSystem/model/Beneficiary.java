package com.project_14.OnlineBankingSystem.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Beneficiary {
    @Id
    private long beneficiaryId;
    @Column(nullable = false)
    private String beneficiaryName;
    @Column(nullable = false)
    private String beneficiaryBankName;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "customer_id", referencedColumnName = "customerId")
    private Customer customer;
}
