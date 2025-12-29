import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";

export default function Jobs() {
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-20 grid grid-cols-2 gap-6">
        <JobCard title="Data Analyst" score={82} />
        <JobCard title="ML Engineer" score={74} />
      </div>
    </>
  );
}
