import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import MovieDetail from "./pages/MovieDetail";
import TheatreExplorer from "./pages/TheatreExplorer";
import TheatreDetail from "./pages/TheatreDetail";
import SeatSelection from "./pages/SeatSelection";
import BookingConfirmation from "./pages/BookingConfirmation";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/theatres" element={<TheatreExplorer />} />
            <Route path="/theatre/:id" element={<TheatreDetail />} />
            <Route path="/book/:movieId/:theatreId/:time" element={<SeatSelection />} />
            <Route path="/confirm/:movieId/:theatreId/:time" element={<BookingConfirmation />} />
            <Route path="/feedback/:theatreId" element={<Feedback />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
