import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  async function periodicAdd() {
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(`Before: Count: ${count}`);
      setCount((c) => c + 1);
      console.log(`After: Count: ${count}`);
      if (count >= 10) {
        break;
      }
    }
  }

  return (
    <>
      <h1>Count: {count}</h1>
      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={() => setCount(count + 1)}>Add</button>
        <button onClick={periodicAdd}>Periodic Add</button>
      </div>
    </>
  );
}

export default App;
