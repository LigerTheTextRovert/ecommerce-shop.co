import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-primary text-bg py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-4xl font-black ">Horea.co</h2>
          <p className="mt-2 text-sm">Timeless pieces, tailored to you.</p>
        </div>

        {/* Shop Links */}
        <div>
          <h2 className="flex flex-col font-semibold mb-2">
            Brands
            <span className="border border-b-bg/10 my-1"></span>
          </h2>
          <ul className="space-y-2 text-sm flex flex-col flex-wrap">
            <li>
              <Link to="/">Casio</Link>
            </li>
            <li>
              <Link to="/">Elegance</Link>
            </li>
            <li>
              <Link to="/">Orient</Link>
            </li>
            <li>
              <Link to="/">Timex</Link>
            </li>
            <li>
              <Link to="/">Rolex</Link>
            </li>
            <li>
              <Link to="/">Seiko</Link>
            </li>
            <li>
              <Link to="/">Citizen</Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h2 className="flex flex-col font-semibold mb-2">
            Customer Care
            <span className="border border-b-bg/10 my-1"></span>
          </h2>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#">Shipping & Delivery</a>
            </li>
            <li>
              <a href="#">Returns & Exchanges</a>
            </li>
            <li>
              <a href="#">Warranty</a>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="flex flex-col font-semibold mb-2">
            Stay Connected
            <span className="border border-b-bg/10 my-1"></span>
          </h2>
          <div className="flex space-x-4 mt-4">{/* social icons here */}</div>
        </div>
      </div>
      <div className="text-center mt-8 text-xs opacity-70">
        © {new Date().getFullYear()} Ovalen. All rights reserved.
      </div>
    </footer>
  );
}
