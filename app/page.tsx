import Image from 'next/image';
import Link from 'next/link';
import { UserIcon } from '@heroicons/react/24/outline';
import styles from '@/app/ui/home.module.css';
import { kanit, anton, inter, lusitana } from '@/app/ui/fonts';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6 relative">
      {/* Background Image */}
      <Image
        src="/Nashville_Hot.jpg"
        layout="fill"
        objectFit="cover"
        alt="Nashville Hot Chicken"
      />

      {/* Text Overlay */}
      <div className="absolute inset-0 flex justify-center items-center">
        <h1
          className="text-white text-5xl md:text-7xl font-extrabold tracking-wide"
          style={{
            textShadow: "4px 4px 8px rgba(0, 0, 0, 0.6)", // Efek bayangan teks
          }}
        >
          Nashville Hot Chicken
        </h1>
      </div>

      {/* Login Button */}
      <div className="absolute bottom-12 right-16"> {/* Slightly moved left by changing right-4 to right-6 */}
        <Link
          href="/login"
          className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-full shadow-lg transition transform hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Login
        </Link>
      </div>
    </main>
  );
}
