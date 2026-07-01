import React, { FC } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Визначаємо, чи перебуває користувач на сторінках авторизації
    const isAuthPage: boolean = location.pathname === '/sign-up' || location.pathname === '/sign-in';

    const handleSignOut = (): void => {
        // Тимчасовий редірект на сторінку логіну
        navigate('/sign-in');
    };

    return (
        <header className="header">
            <div className="header__inner">
                <Link data-test-id="header-logo" to="/" className="header__logo">
                    Travel App
                </Link>

                {!isAuthPage && (
                    <nav data-test-id="header-nav" className="header__nav">
                        <ul className="nav-header__list">
                            <li className="nav-header__item" title="Bookings">
                                <Link
                                    data-test-id="header-bookings-link"
                                    to="/bookings"
                                    className="nav-header__inner"
                                >
                                    <span className="visually-hidden">Bookings</span>
                                    <img src="/assets/images/briefcase.svg" alt="bookings" />
                                </Link>
                            </li>
                            <li className="nav-header__item" title="Profile">
                                <div
                                    data-test-id="header-profile-nav"
                                    className="nav-header__inner profile-nav"
                                    tabIndex={0}
                                >
                                    <span className="visually-hidden">Profile</span>
                                    <img src="/assets/images/user.svg" alt="profile" />
                                    <ul
                                        data-test-id="header-profile-nav-list"
                                        className="profile-nav__list"
                                    >
                                        <li
                                            data-test-id="header-profile-nav-username"
                                            className="profile-nav__item"
                                        >
                                            John Doe
                                        </li>
                                        <li className="profile-nav__item">
                                            <button
                                                data-test-id="header-profile-nav-sign-out"
                                                className="profile-nav__sign-out button"
                                                onClick={handleSignOut}
                                            >
                                                Sign Out
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    );
};

export { Header };