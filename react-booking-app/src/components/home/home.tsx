import { type FC, type ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import tripsData from '../../assets/data/trips.json';


const Home: FC = () => {
    const [search, setSearch] = useState<string>('');
    const [duration, setDuration] = useState<string>('');
    const [level, setLevel] = useState<string>('');

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => setSearch(e.target.value);
    const handleDurationChange = (e: ChangeEvent<HTMLSelectElement>): void => setDuration(e.target.value);
    const handleLevelChange = (e: ChangeEvent<HTMLSelectElement>): void => setLevel(e.target.value);

    const filteredTrips = tripsData.filter((trip) => {
        const matchesSearch = trip.title.toLowerCase().includes(search.toLowerCase());
        const matchesLevel = level === '' || trip.level === level;

        let matchesDuration = true;
        if (duration === '0_x_5') {
            matchesDuration = trip.duration >= 1 && trip.duration <= 5;
        } else if (duration === '5_x_10') {
            matchesDuration = trip.duration >= 6 && trip.duration <= 10;
        } else if (duration === '10') {
            matchesDuration = trip.duration >= 11;
        }

        return matchesSearch && matchesLevel && matchesDuration;
    });

    return (
        <>
            <h1 className="visually-hidden">Travel App</h1>

            <section className="trips-filter">
                <h2 className="visually-hidden">Trips filter</h2>
                <form className="trips-filter__form" autoComplete="off" onSubmit={(e) => e.preventDefault()}>
                    <label className="trips-filter__search input">
                        <span className="visually-hidden">Search by name</span>
                        <input
                            data-test-id="filter-search"
                            name="search"
                            type="search"
                            placeholder="search by title"
                            value={search}
                            onChange={handleSearchChange}
                        />
                    </label>

                    <label className="select">
                        <span className="visually-hidden">Search by duration</span>
                        <select
                            data-test-id="filter-duration"
                            name="duration"
                            value={duration}
                            onChange={handleDurationChange}
                        >
                            <option value="">duration</option>
                            <option value="0_x_5">&lt; 5 days</option>
                            <option value="5_x_10">&lt; 10 days</option>
                            <option value="10">&ge; 10 days</option>
                        </select>
                    </label>

                    <label className="select">
                        <span className="visually-hidden">Search by level</span>
                        <select
                            data-test-id="filter-level"
                            name="level"
                            value={level}
                            onChange={handleLevelChange}
                        >
                            <option value="">level</option>
                            <option value="easy">easy</option>
                            <option value="moderate">moderate</option>
                            <option value="difficult">difficult</option>
                        </select>
                    </label>
                </form>
            </section>

            <section className="trips">
                <h2 className="visually-hidden">Trips List</h2>

                {filteredTrips.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>No trips found matching your criteria.</div>
                ) : (
                    <ul className="trip-list">
                        {filteredTrips.map((trip) => (
                            <li key={trip.id} data-test-id="trip-card" className="trip-card">
                                <img
                                    data-test-id="trip-card-image"
                                    src={trip.image}
                                    alt={`${trip.title} photo`}
                                />
                                <div className="trip-card__content">
                                    <div className="trip-info">
                                        <h3 data-test-id="trip-card-title" className="trip-info__title">
                                            {trip.title}
                                        </h3>
                                        <div className="trip-info__content">
                      <span data-test-id="trip-card-duration" className="trip-info__duration">
                        <strong>{trip.duration}</strong> days
                      </span>
                                            <span data-test-id="trip-card-level" className="trip-info__level">
                        {trip.level}
                      </span>
                                        </div>
                                    </div>
                                    <div className="trip-price">
                                        <span>Price</span>
                                        <strong data-test-id="trip-card-price-value" className="trip-price__value">
                                            ${trip.price}
                                        </strong>
                                    </div>
                                </div>
                                <Link data-test-id="trip-card-link" to={`/trip/${trip.id}`} className="button">
                                    Discover a trip
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </>
    );
};

export { Home };