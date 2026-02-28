import { Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const Landing = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to="/home" replace />;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,214,102,0.08),transparent_45%)]" />

      {/* Centered title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 font-display text-6xl font-black tracking-tight md:text-7xl"
      >
        Cine<span className="text-primary">Sphere</span>
      </motion.h1>

      {/* Fixed bottom section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="fixed bottom-12 z-10 flex flex-col items-center gap-4"
      >
        <p className="text-sm text-muted-foreground">Get started</p>
        <div className="flex gap-3">
          <Button asChild size="lg" className="min-w-[120px]">
            <Link to="/login">Sign in</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="min-w-[120px]">
            <Link to="/signup">Sign up</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Landing;
