import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { Dashboard } from "./pages/Dashboard";
import { Heatmap } from "./pages/Heatmap";
import { Simulator } from "./pages/Simulator";
import { Migration } from "./pages/Migration";
import { Risk } from "./pages/Risk";
import { Economic } from "./pages/Economic";
import { Reports } from "./pages/Reports";
import { Settings } from "./pages/Settings";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Landing } from "./pages/Landing";
import { About } from "./pages/About";
import { BrainDrainPrediction } from "./pages/ai-prediction/BrainDrainPrediction";
import { NepaliTalentIntelligence } from "./pages/ai-prediction/NepaliTalentIntelligence";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="heatmap" element={<Heatmap />} />
          <Route path="simulator" element={<Simulator />} />
          <Route path="migration" element={<Migration />} />
          <Route path="risk" element={<Risk />} />
          <Route path="economic" element={<Economic />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="heatmap" element={<Heatmap />} />
          <Route path="simulator" element={<Simulator />} />
          <Route path="migration" element={<Migration />} />
          <Route path="risk" element={<Risk />} />
          <Route path="economic" element={<Economic />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="ai-prediction/brain-drain" element={<BrainDrainPrediction />} />
          <Route path="ai-prediction/talent-intelligence" element={<NepaliTalentIntelligence />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
