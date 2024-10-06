package com.project_14.OnlineBankingSystem.repo;

import com.project_14.OnlineBankingSystem.model.RecurringTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RecurringTransactionRepo extends JpaRepository<RecurringTransaction, Long> {
    Optional<RecurringTransaction> findAllRecurringTransactionByAccountId(long accountId);
    Optional<RecurringTransaction> findAllRecurringTransactionByAccountIdAndBillType(long accountId, String billType);

}