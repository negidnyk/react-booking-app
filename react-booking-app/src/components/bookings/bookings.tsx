import { type FC } from 'react';
import { useOutletContext } from 'react-router-dom';
import { type Booking } from '../../interfaces/booking';


interface OutletContextType {
    bookings: Booking[];
    onRemoveBooking: (id: string) => void;
}

const Bookings: FC = () => {

    const { bookings, onRemoveBooking } = useOutletContext<OutletContextType>();


    const sortedBookings = [...bookings].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return (
        <main className="bookings-page">
            <h1 className="visually-hidden">Travel App</h1>

            {sortedBookings.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', fontSize: '1.2rem' }}>
                    You don't have any bookings yet.
                </div>
            ) : (
                <ul className="bookings__list">
                    {sortedBookings.map((booking) => {

                        const formattedDate = booking.date.slice(0, 10);

                        return (
                            <li key={booking.id} data-test-id="booking" className="booking">
                                <h3 data-test-id="booking-title" className="booking__title">
                                    {booking.trip.title}
                                </h3>

                                <span data-test-id="booking-guests" className="booking__guests">
                  {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}
                </span>

                                <span data-test-id="booking-date" className="booking__date">
                  {formattedDate}
                </span>

                                <span data-test-id="booking-total" className="booking__total">
                  ${booking.totalPrice}
                </span>

                                <button
                                    data-test-id="booking-cancel"
                                    className="booking__cancel"
                                    title="Cancel booking"
                                    onClick={() => onRemoveBooking(booking.id)}
                                >
                                    <span className="visually-hidden">Cancel booking</span>
                                    ×
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </main>
    );
};

export { Bookings };