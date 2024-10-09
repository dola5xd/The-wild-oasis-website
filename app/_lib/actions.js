"use server"; // we define here server action not server component (return from client to server)

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./Auth";
import { supabase } from "./supabase";
import { getBookings, getSettings } from "./data-service";
import { redirect } from "next/navigation";
import { differenceInDays } from "date-fns";

export async function uptadeGuest(formData) {
  const session = await auth();

  if (!session) throw new Error("You must be loogged in");

  const [nationality, countryFlag] = formData.get("nationality").split("%");
  const nationalID = formData.get("nationalID");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const uptadeData = { nationalID, nationality, countryFlag };

  const { error } = await supabase
    .from("guests")
    .update(uptadeData)
    .eq("id", session.userId);

  if (error) throw new Error("Guest could not be updated");
  revalidatePath("/account/profile");
}

export async function createReservations(cabin, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be loogged in");

  const { id: cabinId, regularPrice: cabinPrice } = cabin;
  const { breakfastPrice } = await getSettings();
  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");
  const from = formData.get("rangeFrom");
  const to = formData.get("rangeTo");
  const hasBreakfast = formData.get("breakfast") === "on" ? true : false;

  const newBooking = {
    created_at: new Date(),
    startDate: new Date(from),
    endDate: new Date(to),
    numNights: differenceInDays(to, from),
    numGuests,
    cabinPrice,
    totalPrice: cabinPrice * differenceInDays(to, from),
    status: "unconfirmed",
    isPaid: false,
    guestId: session.userId,
    cabinId,
    extrasPrice: hasBreakfast
      ? breakfastPrice * numGuests * differenceInDays(to, from)
      : 0,
    hasBreakfast,
    observations,
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  revalidatePath(`/cabins/${cabinId}`);

  redirect("/cabins/thankyou");
}

export async function deleteReservation(bookingId) {
  const session = await auth();

  if (!session) throw new Error("You must be loogged in");

  // block unAuth users to delete reservations
  const guestBookings = await getBookings(session.userId);
  const bookingsIDs = guestBookings.map((booking) => booking.id);

  if (!bookingsIDs.includes(bookingId))
    throw new Error("You are not allowed to delete this reservation!");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Guest could not be updated");
  revalidatePath("/account/reservations");
}

export async function editReservations(formData) {
  const id = formData.get("id");
  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");

  const session = await auth();
  if (!session) throw new Error("You must be loogged in");

  // block unAuth users to delete reservations
  const guestBookings = await getBookings(session.userId);
  const bookingsIDs = guestBookings.map((booking) => booking.id);

  if (!bookingsIDs.includes(+id))
    throw new Error("You are not allowed to delete this reservation!");

  const updatedFields = { observations, numGuests };

  const { error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
