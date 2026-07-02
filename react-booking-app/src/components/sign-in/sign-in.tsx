import React, { type FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignIn: FC = () => {
    const navigate = useNavigate();

    const handleSubmit = (event: React.SyntheticEvent): void => {
        event.preventDefault();
        navigate('/');
    };

    return (

        <main className="sign-in-page">
            <h1 className="visually-hidden">Travel App</h1>

            <form className="sign-in-form" autoComplete="off" onSubmit={handleSubmit}>
                <h2 className="sign-in-form__title">Sign In</h2>

                <label className="input">
                    <span className="input__heading">Email</span>
                    <input data-test-id="auth-email" name="email" type="email" required />
                </label>

                <label className="input">
                    <span className="input__heading">Password</span>
                    <input
                        data-test-id="auth-password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        minLength={3}
                        maxLength={20}
                        required
                    />
                </label>

                <button data-test-id="auth-submit" className="button" type="submit">
                    Sign In
                </button>

                <span>
                    Don't have an account?{' '}
                    <Link data-test-id="auth-sign-up-link" to="/sign-up" className="sign-in-form__link">
                        Sign Up
                    </Link>
                </span>
            </form>
        </main>
    );
};

export { SignIn };