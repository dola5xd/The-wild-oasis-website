"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  // set filter
  const searchParams = useSearchParams();

  const activeFilter = searchParams.get("capacity") || "all";

  const router = useRouter();
  const pathname = usePathname();

  function handelFilter(filter) {
    const url = new URLSearchParams();
    url.set("capacity", filter);
    router.replace(`${pathname}?${url}`, { scroll: false });
  }

  return (
    <div className="flex ">
      <FilterBtn
        filter="all"
        activeFilter={activeFilter}
        handelFilter={handelFilter}
      >
        All Cabins
      </FilterBtn>
      <FilterBtn
        filter="small"
        activeFilter={activeFilter}
        handelFilter={handelFilter}
      >
        Small Cabins
      </FilterBtn>
      <FilterBtn
        filter="medium"
        activeFilter={activeFilter}
        handelFilter={handelFilter}
      >
        Medium Cabins
      </FilterBtn>
      <FilterBtn
        filter="large"
        activeFilter={activeFilter}
        handelFilter={handelFilter}
      >
        Large Cabins
      </FilterBtn>
    </div>
  );
}

function FilterBtn({ children, filter, activeFilter, handelFilter }) {
  return (
    <button
      onClick={() => handelFilter(filter)}
      className={`px-6 py-2 bg-primary-900 hover:bg-primary-800 ${
        activeFilter === filter ? "bg-primary-700 text-primary-100" : ""
      }`}
    >
      {children}
    </button>
  );
}

export default Filter;
