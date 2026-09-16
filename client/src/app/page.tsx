import { useQuery } from "@tanstack/react-query";
import { getMyDisks, MyDisk } from "../services/myDisks";

function getYearFromDate(date: string): string {
  const d = new Date(date);
  return d.getFullYear().toString();
}

export default async function Page() {
  const myDisks = await getMyDisks();

  if (!myDisks) return null;

  return myDisks.map((disk) => (
    <div
      key={disk.id}
      className="flex flex-col items-center justify-center text-center"
    >
      <img width={150} height={150} src={disk.cover_art} alt={disk.name} />
      <h1 className="text-lg font-black">{disk.name}</h1>
      <p className="text-sm font-bold">{disk.artist}</p>
      <p className="text-sm">{getYearFromDate(disk.releaseDate)}</p>
    </div>
  ));
}
