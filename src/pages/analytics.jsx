
import React, { useEffect, useState } from "react";
import { DollarSign, Users, Percent } from "lucide-react";
import CreditChart from "@/components/analytics/credit-chart";
import CreditScoreChart from "@/components/analytics/credit-score-chart";
import AnalyticsHeader from "@/components/analytics/analytics-header.jsx";
import AnalyticsStatsGrid from "@/components/analytics/analytics-stats-grid";
import ConsumptionsByColmadoChart from "@/components/analytics/consumptions-by-colmado-chart";

const AnalyticsPage = ({ credits: initialCredits, consumptions: initialConsumptions }) => {
  const [credits, setCredits] = useState(initialCredits || []);
  const [consumptions, setConsumptions] = useState(initialConsumptions || []);
  const sanitizedCredits = credits.filter(c => c && typeof c.amount === "number" && c.amount >= 0);
const sanitizedConsumptions = consumptions.filter(c => c && typeof c.amount === "number" && c.amount >= 0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (initialCredits) setCredits(initialCredits);
    else {
      const storedCredits = localStorage.getItem("credits");
      if (storedCredits) setCredits(JSON.parse(storedCredits));
    }

    if (initialConsumptions) setConsumptions(initialConsumptions);
    else {
      const storedConsumptions = localStorage.getItem("consumptions");
      if (storedConsumptions) setConsumptions(JSON.parse(storedConsumptions));
    }

    setLoading(false);
  }, [initialCredits, initialConsumptions]);

  const totalCreditAmount = credits.reduce((sum, loan) => sum + loan.amount, 0);
  const totalRemainingAmount = credits.reduce((sum, loan) => sum + loan.remainingAmount, 0);
  const activeLoans = credits.filter((loan) => loan.status === "Activo").length;
  const creditUtilization =
    totalCreditAmount > 0
      ? ((totalCreditAmount - totalRemainingAmount) / totalCreditAmount) * 100
      : 0;

  const creditScoreHistoryData = [
    { month: "Ene", score: 650 },
    { month: "Feb", score: 680 },
    { month: "Mar", score: 670 },
    { month: "Abr", score: 700 },
    { month: "May", score: 710 },
    { month: "Jun", score: 730 },
  ];

  if (loading && credits.length === 0 && consumptions.length === 0) {
    return <div className="container mx-auto px-4 py-8 text-center">Cargando analíticas...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AnalyticsHeader
        title="Análisis de Créditos y Consumos"
        description="Visualiza el rendimiento y estado de la red de créditos."
      />

      <AnalyticsStatsGrid
        stats={[
          {
            title: "Capital Total Otorgado",
            value: `$${totalCreditAmount.toLocaleString()}`,
            icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
            description: "Suma de todos los límites de crédito.",
          },
          {
            title: "Saldo Total Pendiente",
            value: `$${(totalCreditAmount - totalRemainingAmount).toLocaleString()}`,
            icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
            description: "Total que los clientes deben actualmente.",
          },
          {
            title: "Créditos Activos",
            value: activeLoans,
            icon: <Users className="h-4 w-4 text-muted-foreground" />,
            description: "Clientes con créditos actualmente.",
          },
          {
            title: "Utilización de Crédito",
            value: `${creditUtilization.toFixed(1)}%`,
            icon: <Percent className="h-4 w-4 text-muted-foreground" />,
            description: "Porcentaje del crédito total utilizado.",
          },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <CreditChart data={sanitizedCredits} />
<ConsumptionsByColmadoChart consumptions={sanitizedConsumptions} credits={sanitizedCredits} />

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CreditScoreChart data={creditScoreHistoryData} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
//
// Forzar limpieza de caché
