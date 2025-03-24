import { faker } from "@faker-js/faker";
import { Player } from "./hardcoded_entities";

const getRandomPlayer = (): Player => {
  return {
    id: faker.number.int({ min: 1000, max: 9999 }),
    name: faker.person.fullName(),
    country: faker.helpers.arrayElement(["Australia", "Spain", "United Kingdom", "United States"]),
    date_of_birth: faker.date.birthdate({ min: 18, max: 40, mode: "age" }).toISOString().split("T")[0], // YYYY-MM-DD format
    racket_brand: faker.helpers.arrayElement(["Wilson", "Babolat", "Head", "Yonex", "Dunlop"]),
    ranking: faker.number.int({ min: 1, max: 50 }),
    number_of_titles: faker.number.int({ min: 0, max: 20 }),
    handedness: faker.helpers.arrayElement(["left-handed", "right-handed"]),
    imageUrl: faker.image.avatar()
  };
};

export default getRandomPlayer;
