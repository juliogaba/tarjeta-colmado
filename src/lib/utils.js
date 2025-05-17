
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { differenceInDays, addMonths, format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP' }).format(amount);
};

export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    return format(parseISO(dateString), "PPP", { locale: es });
  } catch (error) {
    console.error("Error formatting date:", error, "Input was:", dateString);
    return dateString; 
  }
};

export const calculateInterestAndPenalties = (credit, currentDate = new Date()) => {
  if (!credit || credit.status === 'Pagado' || credit.status === 'Rechazado' || credit.status === 'Pendiente Aprobación') {
    return {
      totalDue: credit.remainingAmount || 0,
      interestApplied: 0,
      penaltyApplied: 0,
      newStatus: credit.status,
      interestRateToApply: credit.interestRate || 0,
    };
  }

  const consumedAmount = credit.amount - credit.remainingAmount;
  if (consumedAmount <= 0) {
    return {
      totalDue: 0,
      interestApplied: 0,
      penaltyApplied: 0,
      newStatus: credit.status === 'Suspendido' ? 'Suspendido' : 'Activo', 
      interestRateToApply: credit.interestRate || 0,
    };
  }

  const startDate = parseISO(credit.startDate);
  const daysSinceStart = differenceInDays(currentDate, startDate);

  let baseInterestRate = credit.interestRate || 0.15; 
  let penaltyRateAddition = 0;
  let currentStatus = credit.status;
  
  if (credit.status === 'Suspendido' && daysSinceStart <=90) {
    // If it was suspended but now payment/time makes it fall into a category below "Suspendido"
    // it should re-evaluate. But if it's still over 90 days, it remains suspended.
  } else if (daysSinceStart > 90) {
    currentStatus = 'Suspendido';
    penaltyRateAddition = 0.10; // Total 10% penalty on top of base (e.g. 15% base + 10% penalty = 25%)
  } else if (daysSinceStart > 60) {
    penaltyRateAddition = 0.10; 
    if (currentStatus !== 'Suspendido') currentStatus = 'Con Penalidad Alta';
  } else if (daysSinceStart > 30) {
    penaltyRateAddition = 0.05;
    if (currentStatus !== 'Suspendido') currentStatus = 'Con Penalidad';
  } else {
     if (currentStatus !== 'Suspendido' && currentStatus !== 'Con Penalidad' && currentStatus !== 'Con Penalidad Alta') {
        currentStatus = 'Activo';
     }
  }
  
  // If status was changed from suspended due to time passing, update it
  if (credit.status === 'Suspendido' && currentStatus !== 'Suspendido' && daysSinceStart <= 90) {
    if (daysSinceStart <= 30) currentStatus = 'Activo';
    else if (daysSinceStart <= 60) currentStatus = 'Con Penalidad';
    else if (daysSinceStart <= 90) currentStatus = 'Con Penalidad Alta';
  }


  const interestRateToApply = baseInterestRate + penaltyRateAddition;
  const interestAmount = consumedAmount * baseInterestRate; // Interest is on base rate over consumed
  const penaltyAmount = consumedAmount * penaltyRateAddition; // Penalty is also on consumed
  
  const totalDue = consumedAmount + interestAmount + penaltyAmount;

  return {
    totalDue: parseFloat(totalDue.toFixed(2)),
    interestApplied: parseFloat(interestAmount.toFixed(2)),
    penaltyApplied: parseFloat(penaltyAmount.toFixed(2)),
    newStatus: currentStatus,
    interestRateToApply: parseFloat(interestRateToApply.toFixed(4)), // This is the effective rate including penalty
  };
};


export const generatePaymentDates = (startDate, termInMonths) => {
  const start = parseISO(startDate);
  const paymentDates = [];
  for (let i = 1; i <= termInMonths; i++) {
    paymentDates.push(format(addMonths(start, i), 'yyyy-MM-dd'));
  }
  return paymentDates;
};

export const calculateMonthlyPayment = (principal, annualInterestRate, termInMonths) => {
  if (termInMonths <= 0 || principal <= 0) return 0;
  
  if (annualInterestRate === 0) {
    return principal / termInMonths;
  }
  const monthlyRate = annualInterestRate / 12;
  if (monthlyRate === 0) return principal / termInMonths; // Avoid division by zero or issues if rate is extremely small

  const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, termInMonths)) / (Math.pow(1 + monthlyRate, termInMonths) - 1);
  return payment;
};
