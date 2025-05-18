export default function AnalyticsHeader({ title, description }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
