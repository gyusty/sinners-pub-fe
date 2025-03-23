import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Stock from "./pages/stock";
import Header from "./components/Header";

const AppRouter = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stock" element={<Stock />} />

        {/* Rutas protegidas */}
        {/* <Route element={<PrivateRoute isAuthenticated={storedEmail} />}>
          <Route path="/home" element={<Home />} />
        </Route> */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
