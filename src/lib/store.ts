import * as React from "react";

export type Profile = {
  name: string;
  village: string;
  land: string;
  crops: string;
  contacts: string;
};

export type ScanRecord = {
  id: string;
  at: number;
  image: string;
  disease: string;
  severity: string;
};

const PROFILE_KEY = "rk_profile";
const SCANS_KEY = "rk_scans";

const emptyProfile: Profile = { name: "", village: "", land: "", crops: "", contacts: "" };

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function useProfile() {
  const [profile, setProfile] = React.useState<Profile>(emptyProfile);

  React.useEffect(() => {
    setProfile(read<Profile>(PROFILE_KEY, emptyProfile));
  }, []);

  const save = React.useCallback((next: Profile) => {
    setProfile(next);
    window.localStorage.setItem(PROFILE_KEY, JSON.stringify(next));
  }, []);

  return { profile, save };
}

export function useScans() {
  const [scans, setScans] = React.useState<ScanRecord[]>([]);

  React.useEffect(() => {
    setScans(read<ScanRecord[]>(SCANS_KEY, []));
  }, []);

  const add = React.useCallback((record: ScanRecord) => {
    setScans((prev) => {
      const next = [record, ...prev].slice(0, 20);
      window.localStorage.setItem(SCANS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { scans, add };
}

export function getProfileSnapshot(): Profile {
  return read<Profile>(PROFILE_KEY, emptyProfile);
}
