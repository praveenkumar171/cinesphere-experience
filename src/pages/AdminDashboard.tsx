import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="ghost" size="sm" className="mb-6">
        <Link to="/home">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Link>
      </Button>

      <h1 className="font-display text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Movies Management */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="font-semibold text-lg mb-2">Movies</h2>
          <p className="text-sm text-muted-foreground mb-4">Manage movies in your system</p>
          <Button disabled className="w-full">Coming Soon</Button>
        </div>

        {/* Theatres Management */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="font-semibold text-lg mb-2">Theatres</h2>
          <p className="text-sm text-muted-foreground mb-4">Manage theatres and locations</p>
          <Button disabled className="w-full">Coming Soon</Button>
        </div>

        {/* Showtimes Management */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="font-semibold text-lg mb-2">Showtimes</h2>
          <p className="text-sm text-muted-foreground mb-4">Manage movie showtimes</p>
          <Button disabled className="w-full">Coming Soon</Button>
        </div>

        {/* Bookings */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="font-semibold text-lg mb-2">Bookings</h2>
          <p className="text-sm text-muted-foreground mb-4">View and manage all bookings</p>
          <Button disabled className="w-full">Coming Soon</Button>
        </div>

        {/* Reviews */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="font-semibold text-lg mb-2">Reviews</h2>
          <p className="text-sm text-muted-foreground mb-4">Manage movie and theatre reviews</p>
          <Button disabled className="w-full">Coming Soon</Button>
        </div>

        {/* Users */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="font-semibold text-lg mb-2">Users</h2>
          <p className="text-sm text-muted-foreground mb-4">View and manage user accounts</p>
          <Button disabled className="w-full">Coming Soon</Button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
