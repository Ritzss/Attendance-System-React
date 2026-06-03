"use client";

import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import type { Settings } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function SettingsForm({
  initialSettings,
}: {
  initialSettings: Settings;
}) {
  const [settings, setSettings] = useState(initialSettings);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        Object.fromEntries(new FormData(event.currentTarget)),
      ),
    });
    const payload = await response.json();
    if (!response.ok)
      return toast.error(payload.error ?? "Settings update failed");
    setSettings(payload.settings);
    toast.success("Settings saved");
  }
  return (
    <Card className="max-w-2xl">
      <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">
          Office start time
          <Input
            type="time"
            name="officeStartTime"
            defaultValue={settings.officeStartTime}
            className="mt-2"
          />
        </label>
        <label className="text-sm font-medium">
          Late threshold (minutes)
          <Input
            type="number"
            name="lateThresholdMinutes"
            defaultValue={settings.lateThresholdMinutes}
            className="mt-2"
          />
        </label>
        <label className="text-sm font-medium">
          Auto absent cutoff
          <Input
            type="time"
            name="autoAbsentCutoff"
            defaultValue={settings.autoAbsentCutoff}
            className="mt-2"
          />
        </label>
        <label className="text-sm font-medium">
          Auto checkout time
          <Input
            type="time"
            name="autoCheckoutTime"
            defaultValue={settings.autoCheckoutTime}
            className="mt-2"
          />
        </label>
        <Button className="sm:col-span-2">Save settings</Button>
      </form>
    </Card>
  );
}
