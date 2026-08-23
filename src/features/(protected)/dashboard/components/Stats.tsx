import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BookmarkIcon, CalendarIcon, Briefcase } from "lucide-react";
import StatCard from "./StatCard";

export default async function Stats() {
  const supabase = await createClient();
 
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: applications, error } = await supabase
    .from("applications")
    .select("id, status")
    .eq("user_id", user.id);

  if (error) {
    console.error("Error fetching applications:", error);
  }

  const totalApplications = applications?.length ?? 0;

   const interviewsScheduled =
    applications?.filter((application) => application.status === "Interviewing")
      .length ?? 0;

     const applied =
    applications?.filter((application) => application.status === "Applied")
      .length ?? 0;

  const offers =
    applications?.filter((application) => application.status === "Offer")
      .length ?? 0;

    
        const stats = [
    {
      title: "Total Applications",
      value: totalApplications,
      icon: <Briefcase className="h-4 w-4" />,
    },
    {
      title: "Interview(s) Scheduled",
      value: interviewsScheduled,
      icon: <CalendarIcon className="h-4 w-4" />,
    },
    {
      title: "Applied Jobs",
      value: applied,
      icon: <BookmarkIcon className="h-4 w-4" />,
    },
    {
      title: "Offers",
      value: offers,
      icon: <BookmarkIcon className="h-4 w-4" />,
    },
  ];

  return (
    <main className="bg-brand-bg min-h-screen space-y-6 p-2">
     

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>
    </main>
  );
}
