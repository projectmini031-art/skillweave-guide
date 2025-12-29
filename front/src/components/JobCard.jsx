export default function JobCard({ title, score }) {
  return (
    <div className="p-4 bg-card border border-white/10 rounded-lg">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-primary mt-2">{score}% Match</p>
    </div>
  );
}
