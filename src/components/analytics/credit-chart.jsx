const CreditChart = ({ data, title, description, color = "#3b82f6" }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title || "Sin datos"}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 text-center text-sm text-gray-500">
          No hay datos suficientes para mostrar el gráfico.
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card-hover"
    >
      <Card className="overflow-hidden h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{title}</CardTitle>
          {description && <p className="text-sm text-gray-500">{description}</p>}
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
  dataKey="name"
  tickFormatter={(value) => {
    const date = new Date(value);
    return !isNaN(date.getTime()) ? date.toLocaleDateString('es-DO', { month: 'short', day: 'numeric' }) : value;
  }}
  tick={{ fontSize: 12 }}
  tickLine={false}
  axisLine={{ stroke: "#e5e7eb" }}
/>

                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: "#e5e7eb" }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  formatter={(value) => [`$${value?.toLocaleString?.() || value}`, "Valor"]}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.375rem",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke={color} 
                  fill={color} 
                  fillOpacity={0.2} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
