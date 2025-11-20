'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotfoundButtons() {
  const router = useRouter();

  return (
    <div className="flex sm:flex-row justify-between w-72 md:w-120">
      <Link href="/">
        <p className="font-poppins inline-flex items-center justify-center text-nowrap
                      rounded-full border border-solid transition-colors
                      focus:outline-none
                      px-4 py-2 gap-2 border-[1.5px] text-sm font-medium border-green-800 bg-green-accent
                      text-whitish-secondary hover:bg-bleus-secondary
                      focus:border-bleus-secondary"
                    >
          Home page
        </p>
      </Link>
      <button
        onClick={() => router.back()} // Use router.back() which is safer
        className="font-poppins inline-flex items-center justify-center text-nowrap
                    rounded-full border border-solid transition-colors
                    focus:outline-none
                    px-4 py-2 gap-2 border-[1.5px] text-sm font-medium border-green-accent text-green-accent
                    hover:border-green-700 hover:text-green-700
                    focus:border-green-700
                    bg-transparent"
                  >
        Go Back
      </button>
    </div>
  );
}