
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Upload from "./pages/Upload";
import NotFound from "./pages/NotFound";
import { Toaster } from "sonner";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-center" />
    </Router>
  );
}

export default App;
