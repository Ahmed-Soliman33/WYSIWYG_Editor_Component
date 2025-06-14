import { useState } from "react";
import Header from "./components/ui/Header";
import SwitchButton from "./components/ui/SwitchButton";
import DemoPage from "./demo/DemoPage";

function App() {
  return (
    <>
      <Header />
      <main className="px-8 py-5 lg:px-20 xl:px-32">
        <DemoPage />
      </main>
    </>
  );
}

export default App;
