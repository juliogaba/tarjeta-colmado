
<p>
  Fecha: {credit.nextPaymentDate && !isNaN(new Date(credit.nextPaymentDate))
    ? new Date(credit.nextPaymentDate).toLocaleDateString()
    : "Fecha no disponible"}
</p>

const DashboardUpcomingPayments = ({ upcomingPayments }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Próximos Pagos / Fechas de Corte</CardTitle>
        <CardDescription>Calendario de tus próximos compromisos</CardDescription>
      </CardHeader>
      <CardContent>
        {upcomingPayments.length > 0 ? (
          <div className="space-y-4">
            {upcomingPayments.map((credit) => (
              <div key={credit.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 mr-3 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-medium">{credit.name}</p>
                    <p className="text-sm text-gray-500">
                      Fecha: {new Date(credit.nextPaymentDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Monto / Saldo</p>
                  <p className="text-lg font-bold text-blue-600">${credit.nextPaymentAmount.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No hay pagos o cortes próximos programados
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardUpcomingPayments;
