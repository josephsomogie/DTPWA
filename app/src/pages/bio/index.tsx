import { useEffect, useState } from "react";

export default function Bio() {
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/auth/me", { credentials: "include" });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        window.location.href = "/login"; // Redirect to login if unauthorized
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="text-white">
      {user ? <p>Welcome, {user.email}! You can update your bio.</p> : <p>Loading...</p>}
    </div>
  );
}
