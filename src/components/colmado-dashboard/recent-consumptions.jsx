<p className="text-sm text-gray-500">
  {cons.paymentDate || cons.createdAt
    ? new Date(cons.paymentDate || cons.createdAt).toLocaleDateString('es-DO', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : "Sin fecha"}
</p>


const RecentConsumptions = ({ consumptions, onPrintSimpleReceipt }) => {
  const recentConsumptions = consumptions.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0,10);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center"><ShoppingBag className="mr-2 text-gray-700"/> Consumos Recientes</CardTitle>
        <CardDescription>Últimos consumos registrados en este colmado.</CardDescription>
      </CardHeader>
      <CardContent className="max-h-[450px] overflow-y-auto">
        {recentConsumptions.length > 0 ? recentConsumptions.map(cons => (
          <div key={cons.id} className="flex justify-between items-center p-3 mb-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div>
              <p className="font-medium">{cons.clientName || cons.creditName} - <span className="text-gray-600">{cons.description || "Consumo"}</span></p>
              <p className="text-sm text-gray-500">{new Date(cons.paymentDate || cons.createdAt).toLocaleDateString('es-DO', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-green-600">${cons.amount.toLocaleString()}</p>
              {onPrintSimpleReceipt && (
                <Button size="sm" variant="ghost" className="h-auto p-1 text-xs text-gray-500 hover:text-gray-700" onClick={() => onPrintSimpleReceipt(cons)}>
                  <Printer className="h-3 w-3 mr-1"/> Imprimir Recibo
                </Button>
              )}
            </div>
          </div>
        )) : <p className="text-gray-500 text-center py-4">No hay consumos recientes registrados.</p>}
      </CardContent>
    </Card>
  );
};

export default RecentConsumptions;
