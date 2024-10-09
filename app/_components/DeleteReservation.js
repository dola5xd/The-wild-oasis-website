"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import SpinnerMini from "./SpinnerMini";
import { useTransition } from "react";

function DeleteReservation({ onDelete, bookingId }) {
  const [isPending, startTransition] = useTransition();
  function handleDelete() {
    startTransition(() => onDelete(bookingId));
  }

  return (
    <button
      onClick={handleDelete}
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
    >
      <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
      {isPending ? (
        <span className="mt-1 flex items-center gap-4 [&>div]:border-r-transparent [&>div]:border-primary-950">
          <SpinnerMini />
          Deleting...
        </span>
      ) : (
        <span className="mt-1">Delete</span>
      )}
    </button>
  );
}

export default DeleteReservation;
