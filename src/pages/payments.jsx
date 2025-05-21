
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Calendar, ArrowUpDown, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PaymentHistory from "@/components/payments/payment-history"; // Assuming this lists consumptions

const PaymentsPage = ({ consumptions: initialConsumptions }) => {
  const [consumptions, setConsumptions] = useState(initialConsumptions || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); 
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (initialConsumptions) {
      setConsumptions(initialConsumptions);
    } else {
      const storedConsumptions = localStorage.getItem("consumptions");
      if (storedConsumptions) {
        setConsumptions(JSON.parse(storedConsumptions));
      }
    }
    setLoading(false);
  }, [initialConsumptions]);

  const filteredConsumptions = consumptions.filter((consumption) => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearch = (consumption.creditName?.toLowerCase().includes(searchTermLower) ||
                          consumption.description?.toLowerCase().includes(searchTermLower) ||
                          consumption.colmadoName?.toLowerCase().includes(searchTermLower)); // Added colmadoName search
    
    if (activeTab === "all") {
      return matchesSearch;
    } else if (activeTab === "realizado") {
      return matchesSearch && consumption.status === "Realizado";
    } 
    // Add other statuses if needed e.g. "Pendiente de Pago" - currently consumptions are always "Realizado"
    return matchesSearch;
  });

  const sortedConsumptions = [...filteredConsumptions].sort((a, b) => {
    const dateA = new Date(a.paymentDate);
const dateB = new Date(b.paymentDate);

return (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime()))
  ? (sortOrder === "desc" ? dateB - dateA : dateA - dateB)
  : 0;


   
  });

  const totalConsumed = consumptions.reduce((sum, cons) => cons.status === "Realizado" ? sum + cons.amount : sum, 0);
  
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const consumedThisMonth = consumptions.reduce((sum, cons) => {
    const consDate = new Date(cons.paymentDate);
if (
  cons.status === "Realizado" &&
  !isNaN(consDate.getTime()) &&
  consDate.getMonth() === currentMonth &&
  consDate.getFullYear() === currentYear
) {
  return sum + cons.amount;
}
return sum;
(
      cons.status === "Realizado" &&
      consDate.getMonth() === currentMonth &&
      consDate.getFullYear() === currentYear
    ) ? sum + cons.amount : sum;
  }, 0);
  
  // This might be more relevant for "Credits" page if we track payment status of credits themselves
  const pendingPaymentAmount = 0; // Placeholder, as consumptions are direct and "Realizado"
  const pendingPaymentConsumptionsCount = 0;


  if (loading && consumptions.length === 0) {
    return <div className="container mx-auto px-4 py-8 text-center">Cargando consumos...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Historial Global de Consumos</h1>
          <p className="text-gray-500">Todos los consumos realizados en la red de colmados.</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-indigo-700">Total Consumido (General)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-indigo-800">${totalConsumed.toLocaleString()}</p>
            <p className="text-sm text-indigo-600 mt-1">Todos los consumos realizados</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-teal-700">Consumido este mes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-teal-800">${consumedThisMonth.toLocaleString()}</p>
            <p className="text-sm text-teal-600 mt-1">
              {new Date().toLocaleString('es-DO', { month: 'long' })} {currentYear}
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-orange-700">Consumos Pendientes (Global)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-800">${pendingPaymentAmount.toLocaleString()}</p>
            <p className="text-sm text-orange-600 mt-1">{pendingPaymentConsumptionsCount} items pendientes en la red</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar por cliente, colmado o descripción..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center"
            onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
          >
            <ArrowUpDown className="mr-2 h-4 w-4" />
            {sortOrder === "desc" ? "Más recientes" : "Más antiguos"}
          </Button>
          <Button variant="outline" className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filtros Avanzados
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-2 max-w-xs">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="realizado">Realizados</TabsTrigger>
          {/* <TabsTrigger value="pendiente_pago">Pendientes de Pago</TabsTrigger> */}
        </TabsList>
      </Tabs>

      {sortedConsumptions.length > 0 ? (
        <PaymentHistory payments={sortedConsumptions} />
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <ShoppingBag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay consumos</h3>
          <p className="text-gray-500">
            No se encontraron consumos que coincidan con los criterios.
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentsPage;
