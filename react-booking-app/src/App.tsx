import { type FC } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/layout';
import { SignUp } from './components/sign-up/sign-up';
import { SignIn } from './components/sign-in/sign-in';
import { Home } from './components/home/home';
import { TripDetails } from './components/trip-details/trip-details';

// Заглушка для Bookings, поки ми її не створили окремо
const Bookings: FC = () => <div>Список бронювань</div>;

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/sign-in',
                element: <SignIn />,
            },
            {
                path: '/sign-up',
                element: <SignUp />,
            },
            {
                path: '/trip/:tripId',
                element: <TripDetails />,
            },
            {
                path: '/bookings',
                element: <Bookings />,
            },
            {
                path: '*',
                element: <Navigate to="/" replace />,
            },
        ],
    },
]);

const App: FC = () => {
    return <RouterProvider router={router} />;
};

export { App };