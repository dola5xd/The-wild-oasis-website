import Button from "@/app/_components/Button";
import { editReservations } from "@/app/_lib/actions";
import { getBooking, getSettings } from "@/app/_lib/data-service";

export const revalidate = 0;

export default async function Page({ params }) {
  const reservationId = params.id;
  const { maxGuests } = await getSettings();
  const { observations, numGuests } = await getBooking(reservationId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <form
        action={editReservations}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <input type="text" name="id" hidden defaultValue={reservationId} />
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
            defaultValue={numGuests}
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxGuests }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            defaultValue={observations}
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <Button>Update reservation</Button>
        </div>
      </form>
    </div>
  );
}
