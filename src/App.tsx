import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { CityProvider } from "@/context/CityContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminRoute from "@/components/AdminRoute";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import MovieDetail from "./pages/MovieDetail";
import TheatreExplorer from "./pages/TheatreExplorer";
import TheatreDetail from "./pages/TheatreDetail";
import SeatSelection from "./pages/SeatSelection";
import BookingConfirmation from "./pages/BookingConfirmation";
import Feedback from "./pages/Feedback";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/** Wraps a page with auth guard + Layout (header/footer) */
const Protected = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute>
    <Layout>{children}</Layout>
  </ProtectedRoute>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CityProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public — marketing / auth */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected — all other pages require login */}
            <Route path="/home" element={<Protected><Index /></Protected>} />
            <Route path="/movie/:id" element={<Protected><MovieDetail /></Protected>} />
            <Route path="/theatres" element={<Protected><TheatreExplorer /></Protected>} />
            <Route path="/theatre/:id" element={<Protected><TheatreDetail /></Protected>} />
            <Route path="/book/:movieId/:theatreId/:time" element={<Protected><SeatSelection /></Protected>} />
            <Route path="/confirm/:movieId/:theatreId/:time" element={<Protected><BookingConfirmation /></Protected>} />
            <Route path="/feedback/:theatreId" element={<Protected><Feedback /></Protected>} />

            {/* Admin — requires admin role */}
            <Route path="/admin" element={<AdminRoute><Layout><AdminDashboard /></Layout></AdminRoute>} />

            <Route path="*" element={<Protected><NotFound /></Protected>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </CityProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
