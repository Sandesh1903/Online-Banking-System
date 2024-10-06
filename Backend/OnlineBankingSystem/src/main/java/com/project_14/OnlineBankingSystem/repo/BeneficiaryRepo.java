package com.project_14.OnlineBankingSystem.repo;

import com.project_14.OnlineBankingSystem.model.Beneficiary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BeneficiaryRepo extends JpaRepository<Beneficiary, Long> {
}
