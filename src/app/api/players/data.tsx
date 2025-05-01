export interface Player {
    id: number;
    name: string;
    country: string;
    date_of_birth: string;
    racket_brand: string;
    ranking: number;
    number_of_titles: number;
    handedness: 'left-handed' | 'right-handed';
    imageUrl: string;
}