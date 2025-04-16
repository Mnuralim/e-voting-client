import { getStudentsCount } from "@/lib/api";
import { AdminDashboard } from "./_components/dashboard";

export default async function Page() {
  const studentCount = await getStudentsCount();

  return (
    <div className="min-h-screen bg-[#FFFFF0] p-8">
      <div className="bg-white border-[3px] border-[#111111] shadow-[6px_6px_0px_#111111] p-6">
        <AdminDashboard studentCount={studentCount} />
      </div>
    </div>
  );
}
