
import React from "react";
import StatsCard from "@/components/dashboard/stats-card";
import { CreditCard, ShoppingBag, TrendingUp, Calendar, Store } from "lucide-react";

const DashboardStatsGrid = ({ totalDebt, totalConsumed, activeCredits, upcomingPaymentAmount, upcomingPaymentDate, fourthCardData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="Deuda Total en Colmados"
        value={`$${totalDebt.toLocaleString()}`}
        icon={<CreditCard className="h-5 w-5" />}
        description="Saldo pendiente"
        trend={-1.5} 
        color="blue"
      />
      <StatsCard
        title="Total Consumido"
        value={`$${totalConsumed.toLocaleString()}`}
        icon={<ShoppingBag className="h-5 w-5" />}
        description="Este mes"
        trend={3.2}
        color="green"
      />
      <StatsCard
        title="Créditos Activos"
        value={activeCredits}
        icon={<TrendingUp className="h-5 w-5" />}
        description="Con colmados afiliados"
        trend={0}
        color="purple"
      />
      {fourthCardData ? (
         <StatsCard
            title={fourthCardData.title}
            value={fourthCardData.value}
            icon={fourthCardData.icon || <Store className="h-5 w-5"/>}
            description={fourthCardData.description}
            trend={0} 
            color="yellow"
         />
        ) : (
          <StatsCard
            title="Próximo Pago/Corte"
            value={upcomingPaymentAmount > 0 ? `$${upcomingPaymentAmount.toLocaleString()}` : "N/A"}
            icon={<Calendar className="h-5 w-5" />}
            description={upcomingPaymentDate ? new Date(upcomingPaymentDate).toLocaleDateString() : "Sin pagos próximos"}
            trend={0}
            color="yellow"
          />
      )}
    </div>
  );
};

export default DashboardStatsGrid;
