
# CineSphere — Movie Ticket Booking with Theatre Intelligence

## Overview
A premium, cinema-themed web app (black & grey theme) that lets users browse movies, visually explore theatres, read/write reviews, and go through a simulated booking flow with interactive seat selection. Built frontend-only with sample data.

---

## Pages & Features

### 1. Home Page
- Hero banner with a featured/now-showing movie carousel
- "Now Showing" and "Coming Soon" movie sections as horizontally scrollable cards
- Quick search bar to find movies by name
- Top-rated theatres highlight section
- Premium black & grey cinematic design throughout

### 2. Movie Detail Page
- Movie poster, title, genre, duration, language, synopsis, cast
- IMDb-style rating display
- "Book Now" button leading to theatre/showtime selection
- List of theatres showing this movie with showtimes

### 3. Theatre Explorer Page
- List of all theatres (3–5) with thumbnail, name, location, and overall experience score
- Click into any theatre for full details

### 4. Theatre Detail Page
- **Visual Preview Gallery**: Image carousel showing screen views, seating areas, auditorium photos (using placeholder/sample images)
- **Experience Score**: Aggregated rating across screen quality, sound, and seating comfort
- **Reviews Section**: IMDb-style community reviews with star ratings and written feedback
- Currently showing movies at this theatre with showtimes

### 5. Showtime & Seat Selection Page
- Pick a date and showtime
- **Interactive Seat Map**: Visual grid layout showing available, occupied, and selected seats with pricing tiers (Standard, Premium, VIP)
- Real-time total price calculation
- "Proceed to Booking" button

### 6. Booking Confirmation Page
- Summary of selected movie, theatre, showtime, seats, and total price
- Simulated "Confirm Booking" action
- Booking success screen with a mock ticket/QR code

### 7. Post-Movie Feedback Form
- Rate screen quality, sound performance, and seating comfort (star ratings)
- Written review text area
- Submission adds to the theatre's experience score (in-memory for now)

---

## Sample Data
- **5–8 movies** with posters, genres, synopses, and cast info
- **3–5 theatres** with names, locations, placeholder gallery images, and pre-populated reviews
- Pre-set showtimes and seating layouts per theatre/screen

## Design
- **Dark cinematic theme**: Black and dark grey backgrounds, subtle accent color (gold or red) for CTAs and highlights
- Modern card-based layouts with smooth transitions
- Responsive design for desktop and mobile
- Consistent premium feel inspired by high-end cinema experiences
