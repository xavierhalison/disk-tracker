import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";

export default function generateFakeData(count: number) {
  const data = [];
  for (let i = 1; i <= count; i++) {
    data.push({
      id: uuidv4(),
      artist: faker.music.artist(),
      name: faker.music.album(),
      releaseDate: faker.date.anytime(),
      cover_art: faker.image.url({ width: 400, height: 400 }),
    });
  }
  return data;
}
