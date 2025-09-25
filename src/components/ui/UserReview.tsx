import { Star } from "lucide-react"; // or any star icon lib

interface UserReviewProps {
  username: string;
  date: string;
  rating: number;
  caption: string;
  image: string;
}

export default function UserReview({
  username,
  date,
  rating,
  caption,
  image,
}: UserReviewProps) {
  return (
    <div className="max-w-xl min-h-xs p-6 rounded-2xl border-4 border-muted/40 bg-white/60 backdrop-blur shadow-md hover:shadow-lg transition">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            className="w-16 h-16 rounded-full object-cover"
            src={image}
            alt={`${username}-profile`}
          />
          <div>
            <h1 className="text-lg font-semibold">{username}</h1>
            <p className="text-sm text-gray-500">{date}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 my-4" />

      <p className="text-gray-700 text-xl leading-relaxed">{caption}</p>
    </div>
  );
}
