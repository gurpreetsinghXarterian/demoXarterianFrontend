import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [showPage, setShowPage] = useState(false);

  const publicRoutes = ["/login"];

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user && !publicRoutes.includes(router.pathname)) {
      router.push("/login");
    }
    setShowPage(true);
  }, [router]);

  return showPage ?
    <Component {...pageProps} />
    :
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-lg">Loading...</p>
    </div>
    ;
}
