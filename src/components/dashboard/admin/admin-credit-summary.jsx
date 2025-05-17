
import React from "react";
import CreditSummary from "@/components/dashboard/credit-summary";

const AdminCreditSummary = ({ totalCreditLimit, totalDebt, availableCreditGlobal, globalCreditHealth }) => {
  return (
    <div className="mb-8">
      <CreditSummary
        totalCredit={totalCreditLimit}
        usedCredit={totalDebt}
        availableCredit={availableCreditGlobal}
        creditScore={globalCreditHealth}
      />
    </div>
  );
};

export default AdminCreditSummary;
