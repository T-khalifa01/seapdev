import Image from "next/image";
import Link from "next/link";


const CardButton = ({ href, text }) => {
  return (
    <Link href={'/'} className="inline-flex items-center justify-center rounded-full border border-solid border-gray-300 bg-gray-100 px-6 py-3 text-sm font-medium text-blue-700 shadow-sm transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        {text}
        {/* Priority set to false as these buttons are likely not above the fold impacting LCP */}
        <Image src="/icons/chevronRight.svg" alt="icon" width={24} height={24} priority={true} className="ml-2 w-6 h-6" />
    </Link>
  );
}

export default CardButton;