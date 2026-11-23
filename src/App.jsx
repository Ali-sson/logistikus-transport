
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dispatch from "./pages/Dispatch";
import BookingDetails from "./pages/BookingDetails";
import BookingReview from "./pages/BookingReview";
import Payment from "./pages/Payment";
import PaymentCallback from "./pages/PaymentCallback";
import AdminDashboard from "./pages/Admindashboard";
import TestTrips from "./TestTrips";
import AdminLogin from "./pages/AdminLogin";
import ScrollToHash from "./components/ScrollToHash";

function ProtectedAdminRoute({ children }) {
  const token = sessionStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
    <ScrollToHash/>
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<Home />} />
        {/* About Page */}
        <Route path="/about" element={<About />} />
         <Route path="/contact" element={<Contact />} />
           <Route path="/dispatch" element={<Dispatch />} />


  

        {/* Passenger details page */}
        <Route
          path="/booking-details"
          element={<BookingDetails />}
        />

        {/* Booking review page */}
        <Route
          path="/booking-review"
          element={<BookingReview />}
        />

        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-callback" element={<PaymentCallback />} />
        <Route
  path="/admin"
  element={
    <ProtectedAdminRoute>
      <AdminDashboard />
    </ProtectedAdminRoute>
  }
/>
        <Route path="/test-trips" element={<TestTrips />} />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
