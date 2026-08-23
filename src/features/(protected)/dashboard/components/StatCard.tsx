export default function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-4 shadow-md">
            <p className="text-6xl font-bold text-navy">{value}</p>

      <div className="flex items-center gap-2">
        <div className="text-navy">{icon}</div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
      </div>
    </div>
  );
}
