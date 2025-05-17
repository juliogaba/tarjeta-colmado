
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, ShoppingCart, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

const StatCard = ({ title, value, icon, description, trend, bgColor = "bg-slate-800", textColor = "text-white" }) => {
  const IconComponent = icon;
  return (
    <Card className={`${bgColor} ${textColor} shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <IconComponent className={`h-5 w-5 ${textColor === "text-white" ? "text-slate-300" : "text-slate-500"}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{typeof value === 'number' ? `$${value.toLocaleString()}` : value}</div>
        {description && <p className={`text-xs ${textColor === "text-white" ? "text-slate-400" : "text-slate-600"} mt-1`}>{description}</p>}
        {trend && (
          <div className={`text-xs flex items-center mt-1 ${trend.direction === "up" ? "text-emerald-400" : "text-red-400"}`}>
            {trend.direction === "up" ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
            {trend.value} {trend.label}
          </div>
        )}
      </CardContent>
    </Card>
  );
};


const DashboardStats = ({ stats }) => {
  if (!stats) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="bg-slate-800 text-white shadow-lg rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Cargando...</CardTitle>
              <AlertCircle className="h-5 w-5 text-slate-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-400">---</div>
              <p className="text-xs text-slate-500 mt-1">Cargando datos...</p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
      <StatCard
        title="Crédito Total Otorgado"
        value={stats.totalCreditGiven || 0}
        icon={DollarSign}
        description="Suma total de crédito activo."
      />
      <StatCard
        title="Consumo Total (Histórico)"
        value={stats.totalConsumption || 0}
        icon={ShoppingCart}
        description="Suma de todos los consumos."
      />
      <StatCard
        title="Clientes Activos"
        value={stats.totalClients !== undefined ? stats.totalClients.toString() : '0'}
        icon={Users}
        description="Número de clientes con crédito."
        bgColor="bg-sky-600"
      />
    </div>
  );
};

export default DashboardStats;
