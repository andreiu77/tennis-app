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

const players: Player[] = [
    {
        id: 1,
        name: 'Roger Federer',
        country: 'Switzerland',
        date_of_birth: '1981-08-08',
        racket_brand: 'Wilson',
        ranking: 1,
        number_of_titles: 103,
        handedness: 'right-handed',
        imageUrl: '/images/federer.jpeg'
    },
    {
        id: 2,
        name: 'Rafael Nadal',
        country: 'Spain',
        date_of_birth: '1986-06-03',
        racket_brand: 'Babolat',
        ranking: 2,
        number_of_titles: 88,
        handedness: 'left-handed',
        imageUrl: null,
    },
    {
        id: 3,
        name: 'Novak Djokovic',
        country: 'Serbia',
        date_of_birth: '1987-05-22',
        racket_brand: 'Head',
        ranking: 3,
        number_of_titles: 85,
        handedness: 'right-handed',
        imageUrl: null,
    },
    {
        id: 4,
        name: 'Andy Murray',
        country: 'United Kingdom',
        date_of_birth: '1987-05-15',
        racket_brand: 'Head',
        ranking: 4,
        number_of_titles: 46,
        handedness: 'right-handed',
        imageUrl: null,
    },
    {
        id: 5,
        name: 'Pete Sampras',
        country: 'United States',
        date_of_birth: '1971-08-12',
        racket_brand: 'Wilson',
        ranking: 5,
        number_of_titles: 64,
        handedness: 'right-handed',
        imageUrl: null,
    },
    {
        id: 6,
        name: 'Andre Agassi',
        country: 'United States',
        date_of_birth: '1970-04-29',
        racket_brand: 'Head',
        ranking: 6,
        number_of_titles: 60,
        handedness: 'right-handed',
        imageUrl: null
    },
    {
        id: 7,
        name: 'Bjorn Borg',
        country: 'Sweden',
        date_of_birth: '1956-06-06',
        racket_brand: 'Donnay',
        ranking: 7,
        number_of_titles: 64,
        handedness: 'right-handed',
        imageUrl: null,
    },
    {
        id: 8,
        name: 'John McEnroe',
        country: 'United States',
        date_of_birth: '1959-02-16',
        racket_brand: 'Dunlop',
        ranking: 8,
        number_of_titles: 77,
        handedness: 'left-handed',
        imageUrl: null,
    },
    {
        id: 9,
        name: 'Jimmy Connors',
        country: 'United States',
        date_of_birth: '1952-09-02',
        racket_brand: 'Wilson',
        ranking: 9,
        number_of_titles: 109,
        handedness: 'left-handed',
        imageUrl: null,
    },
    {
        id: 10,
        name: 'Ivan Lendl',
        country: 'Czech Republic',
        date_of_birth: '1960-03-07',
        racket_brand: 'Adidas',
        ranking: 10,
        number_of_titles: 94,
        handedness: 'right-handed',
        imageUrl: null,
    }
];

export default players;