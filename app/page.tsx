import Image from 'next/image';
import Link from 'next/link';
import { UserIcon } from '@heroicons/react/24/outline';
import styles from '@/app/ui/home.module.css';
import { kanit, anton, inter, lusitana } from '@/app/ui/fonts';

export default function Page() {
  return (
        <main className="flex min-h-screen flex-col relative">
      {/* Header */}
      <header className="flex justify-between items-center bg-white p-2 shadow-md">
        <div className="text-lg font-bold text-gray-800">
          <h1>Babipedia</h1>
        </div>  
        <div>
          <Link
            href="/login"
            className="px-5 py-2 bg-amber-600 text-white text-lg font-semibold rounded-md shadow-lg transition transform hover:bg-amber-950 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Background Image */}
      <div className="relative flex-1">
        <Image
          src="/ba.jpg"
          layout="fill"
          objectFit="cover"
          alt="Babipedia"
        />

        {/* Text Overlay */}
        <div className="absolute inset-0 flex justify-start items-center pl-6">
          <h1
            className="text-white text-5xl md:text-7xl font-extrabold tracking-wide"
            style={{
              textShadow: "4px 4px 8px rgba(0, 0, 0, 0.6)", // Efek bayangan teks
            }}
          >
            Babipedia
            <p className="text-sm text-white">Deliciously Spicy and Crispy</p>
          </h1>
        
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-300 py-4">
        <div className="container mx-auto text-center">
          <p className="text-sm text-gray-700">© 2024 Nashville Hot Chicken. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
