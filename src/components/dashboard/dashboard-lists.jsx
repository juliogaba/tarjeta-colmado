
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const DashboardLists = ({ credits, consumptions }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Créditos Activos con Colmados</CardTitle>
          <CardDescription>Resumen de tus créditos actuales</CardDescription>
        </CardHeader>
        <CardContent>
          {credits.length > 0 ? (
            <div className="space-y-4">
              {credits.slice(0, 3).map((credit) => (
                <div key={credit.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{credit.name}</p>
                    <p className="text-sm text-gray-500">
                      Saldo: ${credit.remainingAmount.toLocaleString()} de ${credit.amount.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Próximo corte</p>
                    <p className="font-medium">
                      {credit.nextPaymentDate ? new Date(credit.nextPaymentDate).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No hay créditos activos
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Link to="/creditos">
            <Button variant="outline" size="sm" className="flex items-center">
              Ver todos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Consumos Recientes</CardTitle>
          <CardDescription>Últimos consumos realizados con tu tarjeta</CardDescription>
        </CardHeader>
        <CardContent>
          {consumptions.length > 0 ? (
            <div className="space-y-4">
              {consumptions.slice(0, 3).map((consumption) => (
                <div key={consumption.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{consumption.creditName || "Consumo"}</p>
                    <p className="text-sm text-gray-500">
                      {consumption.description} - {new Date(consumption.paymentDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${consumption.amount.toLocaleString()}</p>
                    <p className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full inline-block">
                      {consumption.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No hay consumos recientes
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Link to="/consumos">
            <Button variant="outline" size="sm" className="flex items-center">
              Ver todos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DashboardLists;
