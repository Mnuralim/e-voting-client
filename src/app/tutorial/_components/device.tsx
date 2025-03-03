"use client";
import React, { useState } from "react";
import { Android } from "./android";

export const Device = () => {
  const [selectDevice, setSelectDevice] = useState<
    "android" | "iphone" | "windows"
  >("android");

  return (
    <div>
      <p>Pilih device anda :</p>
      <div className="flex justify-between bg-[#111111] py-1.5 px-3 mt-3 rounded mb-5">
        <button onClick={() => setSelectDevice("android")}>Android</button>
        <button onClick={() => setSelectDevice("iphone")}>Iphone</button>
        <button onClick={() => setSelectDevice("windows")}>Windows</button>
      </div>
      {selectDevice === "android" && <Android />}
      {selectDevice === "iphone" && <div>Iphone</div>}
      {selectDevice === "windows" && <div>Windows</div>}
    </div>
  );
};
