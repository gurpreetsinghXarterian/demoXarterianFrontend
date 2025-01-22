import { useDispatch } from 'react-redux';
import { selectShowNavbar } from "@/store/selectors/casualSelectors";
import { useEffect } from 'react';
import { setNavbar } from '@/store/actions/casualActions';
export default function Unauthorized() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setNavbar(false));
  },[])

  return (
    <div className="absolute top-0 left-0  w-screen flex flex-col items-center gap-4 mt-8 mb-8">
      <h1 className="text-3xl font-bold mb-4">No permission</h1>
      <p className="text-gray-600 text-center">
        The page you&apos;re trying to access has restricted access.
        <br />
        Please refer to your system administrator.
      </p>
      <a
        href="/"
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition z-50"
      >
        Go to Home
      </a>
      <svg
        className="w-screen h-screen absolute"
        viewBox="0 0 480 360"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="BG" x1="19.496%" x2="77.479%" y1="71.822%" y2="16.69%">
            <stop offset="0%" stopColor="#0009" />
            <stop offset="100%" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          fill="url(#BG)"
          fillRule="nonzero"
          d="M0 198.78c0 41.458 14.945 79.236 39.539 107.786 28.214 32.765 69.128 53.365 114.734 53.434a148.44 148.44 0 0056.495-11.036c9.051-3.699 19.182-3.274 27.948 1.107a75.779 75.779 0 0033.957 8.01c5.023 0 9.942-.494 14.7-1.433 13.58-2.67 25.94-8.99 36.09-17.94 6.378-5.627 14.547-8.456 22.897-8.446h.142c27.589 0 53.215-8.732 74.492-23.696 19.021-13.36 34.554-31.696 44.904-53.224C474.92 234.58 480 213.388 480 190.958c0-76.93-59.774-139.305-133.498-139.305-7.516 0-14.88.663-22.063 1.899C305.418 21.42 271.355 0 232.499 0a103.651 103.651 0 00-45.88 10.661c-13.24 6.487-25.011 15.705-34.64 26.939-32.698.544-62.931 11.69-87.676 30.291C25.351 97.155 0 144.882 0 198.781z"
        />
        <image
          href="/assets/illustrations/characters/character_4.png"
          height="300"
          x="220"
          y="30"
        />
      </svg>
    </div>
  );
}
