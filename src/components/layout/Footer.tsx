import { Link } from "react-router-dom";
import { Facebook, Instagram, Telegram } from "../icons/Logos";

export default function Footer() {
  return (
    <footer className="bg-primary text-bg p-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col items-start justify-between">
          <div>
            <h2 className="text-4xl font-black ">Horea.co</h2>
            <p className="mt-2 text-lg tracking-wide">
              Timeless pieces, tailored to you.
            </p>
          </div>
          <div className="text-center mt-8 text-base opacity-70">
            © {new Date().getFullYear()} Horea.co. All rights reserved.
          </div>
        </div>

        <div>
          <h2 className="flex flex-col font-bold text-xl mb-2">
            Brands
            <span className="border border-b-bg/10 my-1"></span>
          </h2>
          <ul className="space-y-2 text-lg flex flex-col flex-wrap text-bg/70">
            <li className="hover:text-white">
              <Link to="/">Casio</Link>
            </li>
            <li className="hover:text-white">
              <Link to="/">Elegance</Link>
            </li>
            <li className="hover:text-white">
              <Link to="/">Orient</Link>
            </li>
            <li className="hover:text-white">
              <Link to="/">Timex</Link>
            </li>
            <li className="hover:text-white">
              <Link to="/">Rolex</Link>
            </li>
            <li className="hover:text-white">
              <Link to="/">Seiko</Link>
            </li>
            <li className="hover:text-white">
              <Link to="/">Citizen</Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h2 className="flex flex-col font-bold text-xl mb-2">
            Customer Care
            <span className="border border-b-bg/10 my-1"></span>
          </h2>
          <ul className="space-y-1 text-lg text-bg/70">
            <li className="hover:text-white">
              <Link to="/">shipping & delivery</Link>
            </li>
            <li className="hover:text-white">
              <Link to="/">Returns & Exchanges</Link>
            </li>
            <li className="hover:text-white">
              <Link to="/">Warranty</Link>
            </li>
            <li className="hover:text-white">
              <Link to="/">FAQ</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="flex flex-col font-bold text-xl mb-2">
            Stay Connected
            <span className="border border-b-bg/10 my-1"></span>
          </h2>
          <div className="flex space-x-4 mt-4">
            <Instagram className="w-8 h-8" />
            <Telegram className="w-8 h-8" />
            <Facebook className="w-8 h-8" />
          </div>
        </div>
      </div>
    </footer>
  );
}
