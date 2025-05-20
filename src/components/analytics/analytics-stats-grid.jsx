import React from "react";

export default function AnalyticsStatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="p-4 border rounded shadow">
          <div className="text-muted-foreground mb-2">{stat.icon}</div>
          <h3 className="text-lg font-semibold">{stat.title}</h3>
          <p className="text-xl">{stat.value}</p>
          <p className="text-sm text-gray-500">{stat.description}</p>
        </div>
      ))}
    </div>
  );
}
