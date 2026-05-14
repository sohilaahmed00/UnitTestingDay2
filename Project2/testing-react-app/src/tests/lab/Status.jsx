import { useState } from "react";
import Button from "../../components/Button/Button";

export default function Status() {
  const [isOnline, setIsOnline] = useState(false);

  return (
    <div>
      <p>{isOnline ? "🟢 Online" : "🔴 Offline"}</p>
      <Button onClick={() => setIsOnline((prev) => !prev)}>
        Toggle Status
      </Button>
    </div>
  );
}
