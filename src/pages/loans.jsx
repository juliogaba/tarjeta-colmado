
import React, { useState, useEffect, useCallback } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

import LoanTabs from "@/components/loans/loan-tabs";
import ApproveCreditDialog from "@/components/loans/approve-credit-dialog";
import LoanFormDialog from "@/components/loans/dialogs/loan-form-dialog";
import LoanDetailsDialog from "@/components/loans/dialogs/loan-details-dialog";

const LoansPage = ({ credits: initialCredits, updateCredits, addCredit, colmados: allColmados }) => {
  const { toast } = useToast();
  const [credits, setCredits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Todos");
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  
  const [isApproveConfirmationOpen, setIsApproveConfirmationOpen] = useState(false);
  const [loanToApprove, setLoanToApprove] = useState(null);

  useEffect(() => {
    setCredits(initialCredits || []);
  }, [initialCredits]);

  const handleAddOrUpdateCredit = useCallback((loanData) => {
    if (loanData.id) {
      updateCredits(loanData);
      toast({ title: "Crédito Actualizado", description: `El crédito para ${loanData.clientName} ha sido actualizado.` });
    } else {
      const newLoan = {
        ...loanData,
        id: `credit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        status: loanData.status || "Pendiente Aprobación",
        remainingAmount: parseFloat(loanData.amount),
        type: loanData.type || "colmado", 
        createdAt: new Date().toISOString(),
      };
      addCredit(newLoan);
      toast({ title: "Crédito Agregado", description: `Nuevo crédito para ${newLoan.clientName} agregado y pendiente de aprobación.` });
    }
    setIsFormOpen(false);
    setSelectedLoan(null);
  }, [addCredit, updateCredits, toast]);
  
  const handleApproveCredit = useCallback((loanId) => {
    const loan = credits.find(c => c.id === loanId);
    if (loan) {
      setLoanToApprove(loan);
      setIsApproveConfirmationOpen(true);
    }
  }, [credits]);

  const confirmApproveCredit = useCallback(() => {
    if (!loanToApprove) return;
    
    const updatedLoan = { ...loanToApprove, status: "Activo", approvalDate: new Date().toISOString() };
    updateCredits(updatedLoan);

    toast({ title: "Crédito Aprobado", description: `El crédito para ${loanToApprove.clientName} ha sido aprobado.`, className: "bg-green-500 text-white" });
    setIsApproveConfirmationOpen(false);
    setLoanToApprove(null);
    
    if (selectedLoan && selectedLoan.id === loanToApprove.id) {
      setSelectedLoan(updatedLoan);
    }
  }, [loanToApprove, updateCredits, toast, selectedLoan]);

  const handleViewDetails = useCallback((loan) => {
    setSelectedLoan(loan);
    setIsDetailsOpen(true);
  }, []);
  
  const filteredCredits = credits.filter((credit) => {
    const clientNameMatch = credit.clientName?.toLowerCase().includes(searchTerm.toLowerCase());
    const colmadoNameMatch = credit.colmadoName?.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = filterStatus === "Todos" || credit.status === filterStatus;
    return (clientNameMatch || colmadoNameMatch) && statusMatch;
  });

  const pendingApprovalCredits = credits.filter(credit => credit.status === "Pendiente Aprobación");

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-sky-400 dark:to-indigo-400">
            Gestión de Créditos
          </h1>
          <Button onClick={() => { setSelectedLoan(null); setIsFormOpen(true); }} className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md dark:shadow-blue-500/50">
            <PlusCircle className="mr-2 h-5 w-5" /> Solicitar Nuevo Crédito
          </Button>
        </div>

        <LoanTabs
          credits={credits}
          pendingApprovalCredits={pendingApprovalCredits}
          filteredCredits={filteredCredits}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          onViewDetails={handleViewDetails}
          onApproveCredit={handleApproveCredit}
        />
      </motion.div>

      <LoanFormDialog
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        selectedLoan={selectedLoan}
        onSubmit={handleAddOrUpdateCredit}
        onCancel={() => { setIsFormOpen(false); setSelectedLoan(null); }}
        allColmados={allColmados}
      />

      <LoanDetailsDialog
        isOpen={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        loan={selectedLoan}
        onClose={() => setIsDetailsOpen(false)}
        onApproveCredit={handleApproveCredit}
      />
      
      <ApproveCreditDialog
        isOpen={isApproveConfirmationOpen}
        onOpenChange={setIsApproveConfirmationOpen}
        loanToApprove={loanToApprove}
        onConfirm={confirmApproveCredit}
      />
    </div>
  );
};

export default LoansPage;
