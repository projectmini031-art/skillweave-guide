export default function StatCard({ label, value }) {
  return (
    <div className="text-center">
      <h3 className="text-3xl font-bold text-primary">{value}</h3>
      <p className="text-muted">{label}</p>
    </div>
  );
}
