"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";
export default function Demo() {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [readKey, setReadKey] = useState("");
  const [readResult, setReadResult] = useState("");

  useEffect(() => {
    const initServer = async () => {
      try {
        const res = await fetch("/api/start-server", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
      } catch (e) {
        console.log(e);
      }
    };
    initServer();
  }, []);

  useEffect(() => {
    const initSocket = () =>{
    const socket = io("http://localhost:5006");
    socket.on("value-received", (data) => {
      console.log("Received from server:", data);
      setReadResult(data);
    });

    return () => socket.disconnect();
  }
    initSocket();
  }, []);
  async function writeValue() {
    try {
      const res = await fetch("/api/write", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_uuid: "86394b22-fd0e-4f59-9c1b-bf2e4e0b8a1d", // Change as needed
          key,
          value,
        }),
      });
      const data = await res.json();
      console.log("WRITE response:", data);
      alert("✅ Write Successful");
    } catch (err) {
      console.error("WRITE error:", err);
      alert("❌ Write Failed");
    }
  }

  async function readValue() {
    try {
      const res = await fetch("/api/read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_uuid: "86394b22-fd0e-4f59-9c1b-bf2e4e0b8a1d", // Change as needed
          key: readKey,
        }),
      });
      const data = await res.json();
      console.log("READ response:", data);
      setReadResult(data?.value || "No value found");
    } catch (err) {
      console.error("READ error:", err);
      alert("❌ Read Failed");
    }
  }

  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center font-mono bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900">
      <div className="font-mono text-4xl flex w-full items-center justify-center bg-gradient-to-r from-cyan-100 via-sky-300 to-blue-800 bg-clip-text text-transparent mb-10">
        <p className="font-mono">DTP Online Demo</p>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-white text-xl">🔐 Write Key-Value</h2>
        <input
          type="text"
          placeholder="Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="px-4 py-2 rounded bg-neutral-800 text-white"
        />
        <input
          type="text"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="px-4 py-2 rounded bg-neutral-800 text-white"
        />
        <button
          onClick={writeValue}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800"
        >
          ➤ Write
        </button>

        <h2 className="text-white text-xl mt-10">📥 Read Value</h2>
        <input
          type="text"
          placeholder="Key"
          value={readKey}
          onChange={(e) => setReadKey(e.target.value)}
          className="px-4 py-2 rounded bg-neutral-800 text-white"
        />
        <button
          onClick={readValue}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-800"
        >
          ➤ Read
        </button>
        {readResult && (
          <p className="text-cyan-300 mt-4">🔍 Result: {readResult}</p>
        )}
      </div>
    </div>
  );
}
