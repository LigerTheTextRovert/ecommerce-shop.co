import { Magnifer } from "../icons/Magnifer";

export default function InputBox() {
  return (
    <div className="relative w-full max-w-md">
      <button className="absolute right-3 top-1/2 -translate-y-1/2 text-accent">
        <Magnifer className="w-6 h-6" />
      </button>
      <input
        type="text"
        placeholder="Search over 100 watches"
        className="w-full p-2 pl-6 rounded-2xl leading-none text-lg bg-muted/50"
      />
    </div>
  );
}
