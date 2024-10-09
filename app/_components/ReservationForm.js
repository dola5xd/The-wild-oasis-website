/* eslint-disable @next/next/no-img-element */
"use client";
import { useSession } from "next-auth/react";
import UserAvatar from "./UserAvatar";
import LoginMessage from "./LoginMessage";
import { createReservations } from "../_lib/actions";
import { useResrvation } from "./ReservationContext";
import Button from "./Button";

function ReservationForm({ cabin }) {
  const { data: session } = useSession();
  const { range } = useResrvation();
  if (!session) return <LoginMessage />;

  const { maxCapacity } = cabin;
  const createBookingwithData = createReservations.bind(null, cabin);
  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <UserAvatar />
          <p>{session?.user.name}</p>
        </div>
      </div>

      <form
        action={createBookingwithData}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
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
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <input type="text" hidden name="rangeFrom" defaultValue={range.from} />
        <input type="text" hidden name="rangeTo" defaultValue={range.to} />

        <div className="flex items-center gap-2">
          <input
            id="breakfast"
            name="breakfast"
            type="checkbox"
            className="accent-accent-500 h-5 w-5"
          />
          <label
            htmlFor="breakfast"
            className="text-lg font-bold text-primary-100 cursor-pointer"
          >
            Want breakfast?
          </label>
        </div>
        <div className="flex justify-end items-center gap-6">
          {!(range.from && range.to) ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <Button>Reserve now</Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
