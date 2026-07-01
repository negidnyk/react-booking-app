import { type FC, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../header/header'; // чи як у вас називається хедер
import { Footer } from '../footer/footer';
import { type Booking } from '../../interfaces/booking';

export const Layout: FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);

    const handleAddBooking = (newBooking: Omit<Booking, 'id' | 'userId'>) => {
        const bookingWithId: Booking = {
            ...newBooking,
            id: crypto.randomUUID(),
            userId: 'user-john-doe', // тимчасовий мок користувача
        };
        setBookings((prev) => [...prev, bookingWithId]);
    };

    return (
        <>
            <Header />
            {/* Передаємо масив та функцію вниз усім дочірнім роутам */}
            <Outlet context={{ bookings, onAddBooking: handleAddBooking }} />
            <Footer />
        </>
    );
};