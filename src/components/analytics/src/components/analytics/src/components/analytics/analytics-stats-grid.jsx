export default function AnalyticsStatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white shadow p-4 rounded">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            {stat.icon}
            {stat.title}
          </div>
          <div className="text-lg font-semibold">{stat.value}</div>
          <p className="text-xs text-muted-foreground">{stat.description}</p>
        </div>
      ))}
    </div>
  );
}
