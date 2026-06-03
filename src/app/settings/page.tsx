<<<<<<< HEAD
import { requireAdmin } from "@/backend/services/auth";
=======
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
import { readDb } from "@/backend/services/database";
import { SettingsForm } from "@/components/dashboard/settings-form";

export default async function SettingsPage() {
<<<<<<< HEAD
  await requireAdmin();
  const db = await readDb();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-slate-500">
          Configure attendance rules used by admin reporting and Android app
          integrations.
        </p>
      </div>
      <SettingsForm initialSettings={db.settings} />
    </div>
  );
=======
  const db = await readDb();
  return <div className="space-y-6"><div><h1 className="text-3xl font-bold">Settings</h1><p className="text-slate-500">Configure attendance rules used by admin reporting and Android app integrations.</p></div><SettingsForm initialSettings={db.settings} /></div>;
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
}
