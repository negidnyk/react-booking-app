import { type FC, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { type Booking } from '../../interfaces/booking';
import initialBookings from '../../assets/data/bookings.json';

export const Layout: FC = () => {
    const [bookings, setBookings] = useState<Booking[]>(initialBookings as Booking[]);

    const handleAddBooking = (newBooking: Omit<Booking, 'id' | 'userId'>) => {
        const bookingWithId: Booking = {
            ...newBooking,
            id: crypto.randomUUID(),
            userId: '1dd97a12-848f-4a1d-8a7d-34a2132fca94',
        };
        setBookings((prev) => [...prev, bookingWithId]);
    };

    const handleRemoveBooking = (id: string) => {
        setBookings((prev) => prev.filter((booking) => booking.id !== id));
    };

    return (
        <>
            <Header />
            <Outlet context={{ bookings, onAddBooking: handleAddBooking, onRemoveBooking: handleRemoveBooking }} />
            <Footer />
        </>
    );
};