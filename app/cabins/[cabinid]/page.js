import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import { getCabin } from "@/app/_lib/data-service";

export async function generateMetadata({ params }) {
  const { cabinid } = params;

  const { name } = await getCabin(cabinid);
  return { title: `Cabin ${name}` };
}

export default async function Page({ params }) {
  const { cabinid } = params;
  const cabin = await getCabin(cabinid);
  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-500">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
      </div>
      <Reservation cabin={cabin} />
    </div>
  );
}
