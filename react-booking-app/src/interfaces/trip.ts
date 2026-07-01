export interface Trip {
    id: string;
    title: string;
    description: string;
    level: 'easy' | 'moderate' | 'difficult';
    duration: number;
    price: number;
    image: string;
    createdAt: string;
}