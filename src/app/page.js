import Link from "next/link";
import SearchBar from "./components/SearchBar";

export default function Home() {
  return (
    <div className="bg-[black] h-screen ">
      {/* logo */}
      <div className="pt-[50px] px-9 text-[#fff] flex justify-between items-center">
        <Link href={"https://lumalabs.ai/dream-machine/"}>
          <svg
            width="25"
            height="29"
            viewBox="0 0 25 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1784_519)">
              <path
                d="M12.3891 28.61L0 21.4568L12.3891 14.3037L24.7781 21.4568L12.3891 28.61Z"
                fill="white"
                fillOpacity="0.66"
              ></path>
              <path
                d="M0 7.15157L12.3891 0V28.611L0 21.4578V7.15157Z"
                fill="white"
                fillOpacity="0.66"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_1784_519">
                <rect width="25" height="29" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>
        </Link>

        <div className="max-w-[209px] w-full flex justify-between font-[900] text-[16px]">
          <Link
            href="/"
            className="text-gray-500 hover:scale-125 hover:text-white transition-transform transition-colors duration-300 ease-in-out"
          >
            Create
          </Link>
          <Link
            href="/"
            className="text-gray-500 hover:scale-125 hover:text-white transition-transform transition-colors duration-300 ease-in-out"
          >
            API
          </Link>
          <Link
            href="/"
            className="text-gray-500 hover:scale-125 hover:text-white transition-transform transition-colors duration-300 ease-in-out"
          >
            Account
          </Link>
        </div>
      </div>
      <SearchBar></SearchBar>
    </div>
  );
}
