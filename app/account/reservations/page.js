import ReservaitionList from "@/app/_components/ReservaitionList";
import { auth } from "@/app/_lib/Auth";
import { getBookings } from "@/app/_lib/data-service";

export const metadata = {
  title: "Reservations",
};

export default async function Page() {
  const session = await auth();
  const bookings = await getBookings(session.userId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ReservaitionList bookings={bookings} />
      )}
    </div>
  );
}
