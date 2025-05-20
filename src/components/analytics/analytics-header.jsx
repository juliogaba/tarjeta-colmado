import React from "react";

export default function AnalyticsHeader({ title, description }) {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      <p className="text-muted-foreground mt-2">{description}</p>
    </div>
  );
}
