import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="options">
      <Outlet />
    </div>
  );
}

export default App;
