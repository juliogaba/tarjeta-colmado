
import { differenceInDays, addMonths, format } from 'date-fns';

export const INTEREST_RATE_NORMAL = 0.15;
export const PENALTY_RATE_31_60_DAYS = 0.05; 
export const PENALTY_RATE_61_PLUS_DAYS = 0.05; 

export const calculateDaysSince = (dateString) => {
  if (!dateString) return 0;
  return differenceInDays(new Date(), new Date(dateString));
};

export const calculateInterestAndPenalty = (consumedAmount, creditStartDate, lastPaymentDate = null) => {
  if (consumedAmount <= 0) {
    return { interestRate: 0, penaltyRate: 0, totalRate: 0, totalAmountDue: consumedAmount, statusMessage: "Sin consumo." };
  }

  const daysSinceCreditStart = calculateDaysSince(creditStartDate);
  let effectiveLastActivityDate = lastPaymentDate || creditStartDate;
  
  let currentInterestRate = INTEREST_RATE_NORMAL;
  let currentPenaltyRate = 0;
  let statusMessage = "Interés mensual aplicado.";

  if (daysSinceCreditStart > 90) {
    statusMessage = "Crédito suspendido (más de 90 días sin regularizar).";
    currentInterestRate = INTEREST_RATE_NORMAL + PENALTY_RATE_31_60_DAYS + PENALTY_RATE_61_PLUS_DAYS; 
  } else if (daysSinceCreditStart > 60) {
    currentPenaltyRate = PENALTY_RATE_31_60_DAYS + PENALTY_RATE_61_PLUS_DAYS;
    statusMessage = "Penalización final aplicada.";
  } else if (daysSinceCreditStart > 30) {
    currentPenaltyRate = PENALTY_RATE_31_60_DAYS;
    statusMessage = "Penalización adicional por impago.";
  }
  
  const totalRate = currentInterestRate + currentPenaltyRate;
  const interestAmount = consumedAmount * totalRate;
  const totalAmountDue = consumedAmount + interestAmount;

  return {
    baseInterestRate: INTEREST_RATE_NORMAL,
    penaltyRate: currentPenaltyRate,
    totalEffectiveRate: totalRate,
    interestAmount,
    totalAmountDue,
    daysSinceCreditStart,
    statusMessage,
    isSuspended: daysSinceCreditStart > 90,
  };
};

export const getNextPaymentDate = (creditStartDate, termInMonths) => {
  if (!creditStartDate || !termInMonths) return 'N/A';
  const startDate = new Date(creditStartDate);
  const nextPaymentDate = addMonths(startDate, termInMonths);
  return format(nextPaymentDate, 'yyyy-MM-dd');
};

export const applyPaymentToCredit = (credit, paymentAmount) => {
  if (!credit || paymentAmount <= 0) return credit;

  const consumedAmount = credit.amount - credit.remainingAmount;
  if (consumedAmount <= 0) return { ...credit, lastPaymentDate: new Date().toISOString().split("T")[0] };


  const { totalAmountDue } = calculateInterestAndPenalty(consumedAmount, credit.startDate, credit.lastPaymentDate);
  
  let newRemainingAmount = credit.remainingAmount;
  let newConsumedAmountAfterPayment = consumedAmount;

  if (paymentAmount >= totalAmountDue) {
    newRemainingAmount = credit.amount; 
    newConsumedAmountAfterPayment = 0;
  } else {
    
    const remainingDebtAfterPayment = totalAmountDue - paymentAmount;
    
    const principalPortionCoveredByRemainingDebt = remainingDebtAfterPayment / (1 + calculateInterestAndPenalty(remainingDebtAfterPayment, credit.startDate, credit.lastPaymentDate).totalEffectiveRate) ;

    newConsumedAmountAfterPayment = principalPortionCoveredByRemainingDebt;
    newRemainingAmount = credit.amount - newConsumedAmountAfterPayment;
  }


  let newStatus = credit.status;
  const daysSinceCreditStartAfterPayment = calculateDaysSince(credit.startDate);

  if (newConsumedAmountAfterPayment === 0) {
     newStatus = "Activo"; 
  } else if (daysSinceCreditStartAfterPayment > 90) {
    newStatus = "Suspendido";
  } else if (daysSinceCreditStartAfterPayment > 0) {
    newStatus = "Activo"; 
  }


  return {
    ...credit,
    remainingAmount: parseFloat(newRemainingAmount.toFixed(2)),
    lastPaymentDate: new Date().toISOString().split("T")[0],
    status: newStatus,
    // Reset penalty related fields if applicable, or adjust next payment date
    // This part might need more complex logic based on how payment affects term/penalties
  };
};
