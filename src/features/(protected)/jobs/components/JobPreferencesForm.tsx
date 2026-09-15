"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/features/auth/hooks/useUser";
import { useRouter } from "next/navigation";
import {
  createJobPreferences,
  getJobPreferences,
  updateJobPreferences,
} from "../services/jobPreferences";
import { formatText } from "../utils/formatText";

const categories = ["frontend", "ai", "backend", "fullstack"];

const workModes = ["remote", "hybrid", "onsite"];

export default function JobPreferencesForm() {
  const router = useRouter(); 
  const { user, loading } = useUser();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [keywords, setKeywords] = useState("");

  const [selectedWorkModes, setSelectedWorkModes] = useState<string[]>([]);

  const [locations, setLocations] = useState("");

  const [maxExperience, setMaxExperience] = useState("");

  const [includeInternships, setIncludeInternships] = useState(true);

  const [includeEntryLevel, setIncludeEntryLevel] = useState(true);

 useEffect(() => {
  if (!user) return;

  const userId = user.id;

  async function loadPreferences() {
    const preferences = await getJobPreferences(userId);

    if (!preferences) return;

    setSelectedCategories(preferences.categories ?? []);
    setKeywords(preferences.keywords?.join(", ") ?? "");
    setSelectedWorkModes(preferences.work_modes ?? []);
    setLocations(preferences.locations?.join(", ") ?? "");

    setMaxExperience(
      preferences.max_experience_years?.toString() ?? ""
    );

    setIncludeInternships(
      preferences.include_internships ?? true
    );

    setIncludeEntryLevel(
      preferences.include_entry_level ?? true
    );
  }

  loadPreferences();
}, [user]);

  function toggleItem(
    item: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>,
  ) {
    if (selected.includes(item)) {
      setSelected(selected.filter((value) => value !== item));
    } else {
      setSelected([...selected, item]);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    if (!user) {
      console.log("You must be logged in");
      return;
    }

    const preferences = {
      user_id: user.id,
      categories: selectedCategories,
      keywords: keywords
        .split(",")
        .map((keyword) => keyword.trim())
        .filter(Boolean),
      work_modes: selectedWorkModes,
      locations: locations
        .split(",")
        .map((location) => location.trim())
        .filter(Boolean),
      max_experience_years: maxExperience ? Number(maxExperience) : null,
      include_internships: includeInternships,
      include_entry_level: includeEntryLevel,
    };

    const existingPreferences = await getJobPreferences(user.id);

    if (existingPreferences) {
      await updateJobPreferences(user.id, preferences);
    } else {
      await createJobPreferences(preferences);
    }
    console.log("Preferences saved successfully:", preferences);
    router.push("/dashboard")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col p-8 gap-5 max-w-md border shadow-xl rounded-xl"
    >
      <div>
        <h3 className="text-base font-semibold mb-1">Job Categories</h3>

        {categories.map((category) => (
          <label key={category} className="mr-4 flex items-center gap-1">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() =>
                toggleItem(category, selectedCategories, setSelectedCategories)
              }
            />

            {formatText(category)}
          </label>
        ))}
      </div>

      <div>
        <h3 className="text-base font-semibold mb-1">Keywords</h3>

        <input
          type="text"
          className="w-full p-2 rounded border"
          value={keywords}
          onChange={(event) => setKeywords(event.target.value)}
          placeholder="React, Next.js, TypeScript, Python"
        />

        <p className="text-xs text-muted-foreground">
          Separate keywords with commas.
        </p>
      </div>

      <div>
        <h3 className="text-base font-semibold mb-1">Work Mode</h3>

        {workModes.map((mode) => (
          <label key={mode} className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={selectedWorkModes.includes(mode)}
              onChange={() =>
                toggleItem(mode, selectedWorkModes, setSelectedWorkModes)
              }
            />

            {formatText(mode)}
          </label>
        ))}
      </div>

      <div>
        <h3 className="text-base font-semibold mb-1">Locations</h3>

        <input
          type="text"
          className="w-full p-2 rounded border"
          value={locations}
          onChange={(event) => setLocations(event.target.value)}
          placeholder="Nigeria, Worldwide"
        />

        <p className="text-xs text-muted-foreground">
          Separate locations with commas.
        </p>
      </div>

      <div>
        <h3 className="text-base font-semibold mb-1">Maximum Experience</h3>

        <input
          type="number"
          min="0"
          className="w-full p-2 rounded border"
          value={maxExperience}
          onChange={(event) => setMaxExperience(event.target.value)}
          placeholder="e.g. 3"
        />
      </div>

      <div>
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={includeInternships}
            onChange={(event) => setIncludeInternships(event.target.checked)}
          />
          Include internships
        </label>
      </div>

      <div>
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={includeEntryLevel}
            onChange={(event) => setIncludeEntryLevel(event.target.checked)}
          />
          Include entry-level jobs
        </label>
      </div>

      <button
        type="submit"
        className="bg-brand text-white py-2 px-4 rounded hover:bg-brand-hover cursor-pointer transition-colors"
      >
        Save Preferences
      </button>
    </form>
  );
}
