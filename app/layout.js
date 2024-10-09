import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";
import { SessionProvider } from "next-auth/react";

const josefin = Josefin_Sans({
  display: "swap",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: "Welcome / The Wild Oasis ",
  },

  description:
    "Luxurios cabin hotel, located in the hear of Itailian Dolomites, surrounded by beautiful mountains and dark forests",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionProvider>
        <body
          className={`${josefin.className} antialiased min-h-screen bg-primary-950 text-primary-100 flex flex-col relative`}
        >
          <Header />
          <div className="flex-1 px-8 py-12 grid">
            <main className="max-w-7xl mx-auto w-full">
              <ReservationProvider>{children}</ReservationProvider>
            </main>
          </div>
        </body>
      </SessionProvider>
    </html>
  );
}
