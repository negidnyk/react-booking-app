import { type FC, type ChangeEvent, type FormEvent, useState } from 'react';
import { useParams, Navigate, useOutletContext } from 'react-router-dom';
import tripsData from '../../assets/data/trips.json';
import { type Trip } from '../../interfaces/trip';
import { type Booking } from '../../interfaces/booking';


interface OutletContextType {
    bookings: Booking[];
    onAddBooking: (booking: Omit<Booking, 'id' | 'userId'>) => void;
}

const TripDetails: FC = () => {
    const { tripId } = useParams<{ tripId: string }>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [date, setDate] = useState<string>('');
    const [guests, setGuests] = useState<number>(1);

    const { onAddBooking } = useOutletContext<OutletContextType>();

    const trip = (tripsData as Trip[]).find((t) => t.id === tripId);

    if (!trip) {
        return <Navigate to="/" replace />;
    }

    const getTomorrowDateString = (): string => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

    const handleOpenModal = (): void => {
        setIsModalOpen(true);
    };

    const handleCloseModal = (): void => {
        setIsModalOpen(false);
        setDate('');
        setGuests(1);
    };

    const handleGuestsChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setGuests(Number(e.target.value));
    };

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setDate(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        const tomorrowStr = getTomorrowDateString();
        if (!date || date < tomorrowStr || guests < 1 || guests > 10) {
            return;
        }

        onAddBooking({
            tripId: trip.id,
            guests,
            date,
            totalPrice: trip.price * guests,
            trip: {
                title: trip.title,
                duration: trip.duration,
                price: trip.price,
            },
        });

        handleCloseModal();
    };

    const totalPrice = trip.price * guests;

    return (
        <>
            <main className="trip-page">
                <h1 className="visually-hidden">Travel App</h1>
                <div className="trip">
                    <img
                        data-test-id="trip-details-image"
                        src={trip.image}
                        className="trip__img"
                        alt={`${trip.title} photo`}
                    />
                    <div className="trip__content">
                        <div className="trip-info">
                            <h3 data-test-id="trip-details-title" className="trip-info__title">
                                {trip.title}
                            </h3>
                            <div className="trip-info__content">
                <span data-test-id="trip-details-duration" className="trip-info__duration">
                  <strong>{trip.duration}</strong> days
                </span>
                                <span data-test-id="trip-details-level" className="trip-info__level">
                  {trip.level}
                </span>
                            </div>
                        </div>
                        <div data-test-id="trip-details-description" className="trip__description">
                            {trip.description}
                        </div>
                        <div className="trip-price">
                            <span>Price</span>
                            <strong data-test-id="trip-details-price-value" className="trip-price__value">
                                ${trip.price}
                            </strong>
                        </div>
                        <button
                            data-test-id="trip-details-button"
                            className="trip__button button"
                            onClick={handleOpenModal}
                        >
                            Book a trip
                        </button>
                    </div>
                </div>
            </main>

            {isModalOpen && (
                <div>
                    <div className="modal">
                        <div data-test-id="book-trip-popup" className="book-trip-popup">
                            <button
                                data-test-id="book-trip-popup-close"
                                className="book-trip-popup__close"
                                onClick={handleCloseModal}
                            >
                                ×
                            </button>
                            <form className="book-trip-popup__form" autoComplete="off" onSubmit={handleSubmit}>
                                <div className="trip-info">
                                    <h3 data-test-id="book-trip-popup-title" className="trip-info__title">
                                        {trip.title}
                                    </h3>
                                    <div className="trip-info__content">
                    <span data-test-id="book-trip-popup-duration" className="trip-info__duration">
                      <strong>{trip.duration}</strong> days
                    </span>
                                        <span data-test-id="book-trip-popup-level" className="trip-info__level">
                      {trip.level}
                    </span>
                                    </div>
                                </div>
                                <label className="input">
                                    <span className="input__heading">Date</span>
                                    <input
                                        data-test-id="book-trip-popup-date"
                                        name="date"
                                        type="date"
                                        min={getTomorrowDateString()}
                                        value={date}
                                        onChange={handleDateChange}
                                        required
                                    />
                                </label>
                                <label className="input">
                                    <span className="input__heading">Number of guests</span>
                                    <input
                                        data-test-id="book-trip-popup-guests"
                                        name="guests"
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={guests}
                                        onChange={handleGuestsChange}
                                        required
                                    />
                                </label>
                                <span className="book-trip-popup__total">
                  Total:{' '}
                                    <output
                                        data-test-id="book-trip-popup-total-value"
                                        className="book-trip-popup__total-value"
                                    >
                    ${totalPrice}
                  </output>
                </span>
                                <button
                                    data-test-id="book-trip-popup-submit"
                                    className="button"
                                    type="submit"
                                >
                                    Book a trip
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export { TripDetails };