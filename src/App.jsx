import "./styles/theme.css";
import "./styles/global.css";

import MyHeader from "./components/MyHeader";
import MyMain from "./components/MyMain";
import MyFooter from "./components/MyFooter";
import { LuckyNumber } from "./components/LuckyNumber";

export default function App() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <MyHeader />
      <LuckyNumber />
    </div>
  );
}
