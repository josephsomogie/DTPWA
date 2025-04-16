import { useEffect, useState } from "react";

export default function Bio() {
  const [user, setUser] = useState<{ email: string; uid: string } | null>(null);
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/auth/me", { credentials: "include" });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);

        // Fetch user's bio
        const bioRes = await fetch(`/api/bio/${data.user.uid}`);
        const bioData = await bioRes.json();
        if (bioData.bio) setBio(bioData.bio);
      } else {
        window.location.href = "/login"; // Redirect to login if unauthorized
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const res = await fetch(`/api/bio/${user.uid}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bio }),
      });

      setMessage(res.ok ? "Bio updated successfully!" : "Failed to update bio.");
    } catch (err) {
      setMessage("Error updating bio.");
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center font-mono bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900">
      {/* Header section */}
      <div className="font-mono text-4xl flex w-full items-center justify-center bg-gradient-to-r from-cyan-100 via-sky-300 to-blue-800 bg-clip-text text-transparent">
        <p className="font-mono">DTP Online Bio</p>
      </div>

      {/* Bio form container */}
      <div className="bg-neutral-800 p-8 rounded-lg shadow-md w-1/3 mt-6">
        <h2 className="text-white text-2xl mb-4 text-center">
          {user ? `Welcome, ${user.email}!` : "Loading..."}
        </h2>

        {!loading && user && (
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <textarea
              placeholder="Write something about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={6}
              className="p-2 rounded bg-neutral-700 text-white border border-neutral-600 focus:outline-none resize-none"
            />

            <button
              type="submit"
              className="p-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold"
            >
              Save Bio
            </button>
          </form>
        )}

        {message && (
          <p className="text-center text-sm text-green-400 mt-4">{message}</p>
        )}
      </div>
    </div>
  );
}
