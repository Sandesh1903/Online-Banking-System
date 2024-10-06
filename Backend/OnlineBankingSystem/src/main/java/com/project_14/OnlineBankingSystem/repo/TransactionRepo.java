package com.project_14.OnlineBankingSystem.repo;

import com.project_14.OnlineBankingSystem.model.Transaction;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepo extends JpaRepository<Transaction, Long> {

    @Query("SELECT t FROM Transaction t JOIN t.accountList a WHERE a.customer.customerId = :customerId")
    List<Transaction> findAllTransactionsByCustomerId(@Param("customerId") Long customerId);
//    findAllRecentTransactionsByCustomerId
    @Query("SELECT t FROM Transaction t JOIN t.accountList a WHERE a.customer.customerId = :customerId ORDER BY t.transactionDate DESC")
    List<Transaction> findAllRecentTransactionsByCustomerId(@Param("customerId") Long customerId, Pageable pageable);
}
