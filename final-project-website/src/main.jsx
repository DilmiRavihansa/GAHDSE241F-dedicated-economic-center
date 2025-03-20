import React from "react";
import { createRoot } from "react-dom/client";
import CategaryPageFarmer from "./CategaryPageFarmer/CategaryPageFarmer";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  {<CategaryPageFarmer/>}
  </React.StrictMode>
);
