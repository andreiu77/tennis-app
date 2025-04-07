import { faker } from "@faker-js/faker";

export function generateRandomPlayer() {
  return {
    name: faker.person.fullName(),
    country: faker.location.country(),
    date_of_birth: faker.date.birthdate({ min: 18, max: 35, mode: 'age' }).toISOString().split("T")[0],
    racket_brand: faker.company.name(),
    ranking: Math.floor(Math.random() * 100) + 11,
    number_of_titles: Math.floor(Math.random() * 20),
    handedness: faker.helpers.arrayElement(["left-handed", "right-handed"]),
    imageUrl: "/images/default-player.jpeg" // You can also randomize this
  };
}
