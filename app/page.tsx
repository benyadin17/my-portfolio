import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white text-black">
      <main className="flex flex-col gap-4 row-start-2 items-center">
        {/* SVG Logo warna #ffc629 */}
        <svg
          className="w-20 h-20 animate-bounce"
          viewBox="0 0 21 21"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fill="#ffc629"
            d="M14.31 3.396H7.515a1.61 1.61 0 0 1-1.61-1.612c0-.89.72-1.612 1.61-1.612h6.793c.889 0 1.61.722 1.61 1.612 0 .89-.72 1.612-1.61 1.612ZM19.231 8.769H2.593C1.713 8.769 1 8.047 1 7.157c0-.89.713-1.612 1.593-1.612H19.23c.88 0 1.593.722 1.593 1.612 0 .89-.713 1.612-1.593 1.612ZM17.826 14.14H4a1.601 1.601 0 0 1-1.591-1.611c0-.89.712-1.612 1.59-1.612h13.828c.878 0 1.59.722 1.59 1.612 0 .89-.712 1.612-1.59 1.612ZM13.553 19.513h-5.28a1.61 1.61 0 0 1-1.61-1.612c0-.89.72-1.612 1.61-1.612h5.28c.888 0 1.609.722 1.609 1.612 0 .89-.72 1.612-1.61 1.612Z"
          />
        </svg>

        {/* Teks animasi fade in */}
        <p className="text-lg font-bold text-black animate-fadeIn">
          .....
        </p>

        <Link href="/profile">
          <button className="border border-black text-black py-2 px-4 rounded-full font-semibold">
            Start
          </button>
        </Link>
      </main>
    </div>
  );
}
