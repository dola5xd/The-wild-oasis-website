import { Suspense } from "react";
import SideNavigation from "../_components/SideNavigation";
import Spinner from "../_components/Spinner";

function Layout({ children }) {
  return (
    <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
      <SideNavigation />
      <div className="py-1">
        <Suspense fallback={<Spinner />} key={children}>
          {children}
        </Suspense>
      </div>
    </div>
  );
}

export default Layout;
