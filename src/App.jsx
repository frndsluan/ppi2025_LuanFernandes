import "./styles/theme.css";
import "./styles/global.css";

import MyHeader from "./components/MyHeader";
import MyMain from "./components/MyMain";
import MyFooter from "./components/MyFooter";

export default function App() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <MyHeader />
      <MyMain style={{ flex: 1 }} />
      <MyFooter />
    </div>
  );
}
