package com.project_14.OnlineBankingSystem.repo;

import com.project_14.OnlineBankingSystem.model.Account;
import com.project_14.OnlineBankingSystem.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepo extends JpaRepository<Account, Long> {

    Optional<Account> findByAccountId(long accountId);

    List<Account> findAllByCustomer_CustomerId(Long customerId);

}
