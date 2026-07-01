export interface Booking {
    id: string;
    userId: string;
    tripId: string;
    guests: number;
    date: string;
    totalPrice: number;
    trip: {
        title: string;
        duration: number;
        price: number;
    };
}