import headerImage from "../../assets/header-image.webp";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header
      className="relative w-full aspect-[4/3] md:h-[500px] bg-cover bg-center"
      style={{ backgroundImage: `url(${headerImage})` }}
    >
      <div className="p-6 h-full flex flex-col items-start justify-between">
        <div className="my-6 mx-12">
          <h1 className="text-bg font-bold mb-4 tracking-wide text-2xl md:text-6xl">
            Timeless Pieces,
            <br /> Tailored to You
          </h1>
          <p className="text-bg text-2xl mt-2 leading-10 tracking-wide">
            Shop from a wide range of luxury, <br /> classic, and contemporary
            watches
          </p>
        </div>
        <button className="bg-bg hover:bg-accent/40 hover:text-bg font-semibold my-6 mx-12 text-xl tracking-wide py-6 px-12 m-6 border border-bg">
          <Link to="/">Discover Now</Link>
        </button>
      </div>
    </header>
  );
}
