import { Link, useLocation, useNavigate } from "react-router-dom";
import { Film, Search, Menu, X, LogIn, LogOut, User, MapPin, ChevronDown, Ticket } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useCity } from "@/context/CityContext";
import { Button } from "@/components/ui/button";

const navLinks = [
  { to: "/home", label: "Home" },
  { to: "/theatres", label: "Theatres" },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { selectedCity, setSelectedCity, cities } = useCity();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCityDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link to="/home" className="flex items-center gap-2">
              <Film className="h-7 w-7 text-primary" />
              <span className="font-display text-xl font-bold tracking-tight">
                Cine<span className="text-primary">Sphere</span>
              </span>
            </Link>

            {/* City Selector */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center gap-1.5 rounded-full border border-border/60 bg-card/50 px-3 py-1.5 text-sm font-medium text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground"
              >
                <MapPin className="h-3.5 w-3.5 text-primary" />
                {selectedCity}
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", cityDropdownOpen && "rotate-180")} />
              </button>
              {cityDropdownOpen && (
                <div className="absolute left-0 top-full mt-1 z-50 min-w-[140px] overflow-hidden rounded-lg border border-border bg-card shadow-xl">
                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => { setSelectedCity(city); setCityDropdownOpen(false); }}
                      className={cn(
                        "flex w-full items-center gap-2 px-4 py-2.5 text-sm transition-colors hover:bg-primary/10",
                        selectedCity === city ? "text-primary font-semibold bg-primary/5" : "text-muted-foreground"
                      )}
                    >
                      <MapPin className="h-3.5 w-3.5" />
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === link.to ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="hidden items-center gap-3 md:flex">
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-muted-foreground hover:text-primary"
                >
                  <Link to="/my-bookings">
                    <Ticket className="h-4 w-4" />
                    {user?.name}
                  </Link>
                </Button>
                {user?.role === "admin" && (
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary/80"
                  >
                    <Link to="/admin">Admin Panel</Link>
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-muted-foreground hover:text-primary"
                  onClick={() => { logout(); navigate("/login"); }}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="hidden gap-1.5 border-primary/30 text-primary hover:bg-primary/10 md:inline-flex"
              >
                <Link to="/login">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Link>
              </Button>
            )}

            <button
              className="text-muted-foreground md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-border/50 bg-background px-4 py-4 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block py-2 text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === link.to ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated && (
              <Link
                to="/my-bookings"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block py-2 text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === "/my-bookings" ? "text-primary" : "text-muted-foreground"
                )}
              >
                My Bookings
              </Link>
            )}
            {isAuthenticated ? (
              <button
                onClick={() => { logout(); navigate("/login"); setMobileMenuOpen(false); }}
                className="block py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Logout ({user?.name})
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-primary transition-colors hover:text-primary"
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </header>

      <main>{children}</main>

      <footer className="border-t border-border/50 bg-background py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <Film className="h-5 w-5 text-primary" />
            <span className="font-display text-lg font-semibold">
              Cine<span className="text-primary">Sphere</span>
            </span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Your premium cinema booking experience
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
