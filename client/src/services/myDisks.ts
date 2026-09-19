import { AxiosResponse } from "axios";
import { fetcher } from "../lib/fetch";
import { BASE_URL } from "./user";

export type MyDisk = {
  id: string;
  artist: string;
  name: string;
  releaseDate: string;
  cover_art: string;
};

export const getMyDisks = async () =>
  await fetcher<MyDisk[]>(`${BASE_URL}/my-disks`);

export const getDiskById = async (id: string) =>
  await fetch(`${BASE_URL}/my-disks/${id}`).then((res) => res.json());
