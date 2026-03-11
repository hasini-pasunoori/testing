import { useState } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState(null);
  const [op, setOp] = useState(null);
  const [fresh, setFresh] = useState(false);

  const input = (val) => {
    if (fresh) { setDisplay(val); setFresh(false); return; }
    setDisplay(display === "0" ? val : display.length < 12 ? display + val : display);
  };

  const dot = () => {
    if (fresh) { setDisplay("0."); setFresh(false); return; }
    if (!display.includes(".")) setDisplay(display + ".");
  };

  const setOperator = (o) => {
    setPrev(parseFloat(display));
    setOp(o);
    setFresh(true);
  };

  const calculate = () => {
    if (op === null || prev === null) return;
    const cur = parseFloat(display);
    const ops = { "+": prev + cur, "-": prev - cur, "×": prev * cur, "÷": cur !== 0 ? prev / cur : "Error" };
    const result = ops[op];
    setDisplay(result === "Error" ? "Error" : parseFloat(result.toFixed(10)).toString());
    setPrev(null); setOp(null); setFresh(true);
  };

  const clear = () => { setDisplay("0"); setPrev(null); setOp(null); setFresh(false); };
  const toggleSign = () => setDisplay((parseFloat(display) * -1).toString());
  const percent = () => setDisplay((parseFloat(display) / 100).toString());

  const btn = (label, onClick, style) => (
    <button onClick={onClick} style={{
      background: style === "op" ? "#ff9f0a" : style === "fn" ? "#636366" : "#1c1c1e",
      color: "#fff", border: "none", borderRadius: "50%",
      width: 72, height: 72, fontSize: style === "op" ? 28 : 22,
      fontWeight: 400, cursor: "pointer", display: "flex",
      alignItems: "center", justifyContent: "center",
      transition: "filter 0.1s", fontFamily: "inherit",
    }}
    onMouseDown={e => e.currentTarget.style.filter = "brightness(1.4)"}
    onMouseUp={e => e.currentTarget.style.filter = "brightness(1)"}
    onMouseLeave={e => e.currentTarget.style.filter = "brightness(1)"}
    >{label}</button>
  );

  const zeroBtn = (onClick) => (
    <button onClick={onClick} style={{
      background: "#1c1c1e", color: "#fff", border: "none",
      borderRadius: 36, width: 156, height: 72,
      fontSize: 22, cursor: "pointer", display: "flex",
      alignItems: "center", paddingLeft: 26,
      transition: "filter 0.1s", fontFamily: "inherit",
    }}
    onMouseDown={e => e.currentTarget.style.filter = "brightness(1.4)"}
    onMouseUp={e => e.currentTarget.style.filter = "brightness(1)"}
    onMouseLeave={e => e.currentTarget.style.filter = "brightness(1)"}
    >0</button>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif" }}>
      <div style={{ background: "#000", borderRadius: 48, padding: "24px 16px 16px", width: 340, boxShadow: "0 32px 80px rgba(0,0,0,0.8)" }}>
        
        {/* Display */}
        <div style={{ textAlign: "right", padding: "0 12px 16px", minHeight: 96, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <div style={{ color: "#555", fontSize: 16, marginBottom: 4, minHeight: 20 }}>
            {prev !== null ? `${prev} ${op}` : ""}
          </div>
          <div style={{
            color: "#fff",
            fontSize: display.length > 9 ? 36 : display.length > 6 ? 52 : 72,
            fontWeight: 200, lineHeight: 1, letterSpacing: -2,
            transition: "font-size 0.1s"
          }}>{display}</div>
        </div>

        {/* Buttons */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {btn("AC", clear, "fn")}
          {btn("+/-", toggleSign, "fn")}
          {btn("%", percent, "fn")}
          {btn("÷", () => setOperator("÷"), "op")}
          {btn("7", () => input("7"))}
          {btn("8", () => input("8"))}
          {btn("9", () => input("9"))}
          {btn("×", () => setOperator("×"), "op")}
          {btn("4", () => input("4"))}
          {btn("5", () => input("5"))}
          {btn("6", () => input("6"))}
          {btn("−", () => setOperator("-"), "op")}
          {btn("1", () => input("1"))}
          {btn("2", () => input("2"))}
          {btn("3", () => input("3"))}
          {btn("+", () => setOperator("+"), "op")}
          
          {/* Zero spans 2 cols */}
          <div style={{ gridColumn: "span 2" }}>{zeroBtn(() => input("0"))}</div>
          {btn(".", dot)}
          {btn("=", calculate, "op")}
        </div>
      </div>
    </div>
  );
}