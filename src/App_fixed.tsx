import { useState, useRef } from "react";

function App() {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  async function periodicAdd() {
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(`Before: Count: ${countRef.current}`);
      setCount((c) => c + 1);
      countRef.current += 1;
      console.log(`After: Count: ${countRef.current}`);
      if (countRef.current >= 10) {
        break;
      }
    }
  }

  return (
    <>
      <h1>Count: {count}</h1>
      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={() => setCount(count + 1)}>Add</button>
        <button onClick={periodicAdd}>Periodic Add (Fixed)</button>
      </div>
    </>
  );
}

export default App;
