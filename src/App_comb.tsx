import { useState, useRef } from "react";

function App() {
  // This example show the issue of stale closures in React hooks.
  // When the periodicAdd function is called, it captures the initial value of count.
  // As a result, the console.log inside the loop always logs the initial count value + 1,
  // instead of the updated count value.
  const [count, setCount] = useState(0);
  async function periodicAddStale() {
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(`Before: Count: ${count}`);
      setCount((c) => c + 1);
      console.log(`After: Count: ${count}`);
      if (count >= 10) {
        break; // This will never be true due to stale closure.
      }
    }
  }

  // To fix the stale closure issue, we use a ref to always have access to the latest count value.
  const countRef = useRef(0);
  async function periodicAddFixed() {
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(`Before: Count: ${countRef.current}`);
      setCount((c) => c + 1);
      countRef.current += 1; // Manually update the ref to reflect the latest count.
      console.log(`After: Count: ${countRef.current}`);
      if (countRef.current >= 10) {
        break; // This will work correctly.
      }
    }
  }

  return (
    <>
      <h1>Count: {count}</h1>
      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={() => setCount(count + 1)}>Add</button>
        <button onClick={periodicAddStale}>Periodic Add</button>
        <button onClick={periodicAddFixed}>Periodic Add (Fixed)</button>
      </div>
    </>
  );
}

export default App;
