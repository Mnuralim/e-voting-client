"use client";

import { revalidateAll } from "@/actions";

export default function SettingPage() {
  return (
    <div>
      <button onClick={() => revalidateAll()}>Reload</button>
    </div>
  );
}
