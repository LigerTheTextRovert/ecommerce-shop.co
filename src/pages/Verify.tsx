import { useState, useRef } from "react";

export default function VerifyOtp() {
  const length = 6; // number of OTP digits
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return; // only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    console.log("Entered OTP:", code);
    // TODO: send OTP to Supabase to verify
  };

  return (
    <div className="w-full h-[100vh] flex items-center justify-center transition duration-300">
      <div className="min-w-lg bg-accent/5 p-6 rounded-xl border-2 border-primary/25">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-1">Verify Code</h1>
          <p className="mb-6 text-lg text-primary/80 text-center">
            Enter the 6-digit code we sent to your email
          </p>

          <div className="flex gap-3 mb-6">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="w-12 h-12 text-center text-2xl border border-primary rounded-lg outline-none focus:ring-2 focus:ring-primary"
              />
            ))}
          </div>

          <button className="flex items-center justify-center gap-2 text-xl tracking-wide bg-primary/90 hover:bg-primary text-bg font-semibold py-2 px-10 rounded-lg">
            Verify
          </button>

          <p className="text-center mt-4 tracking-wide">
            Didn’t get a code?
            <button
              type="button"
              className="font-semibold ml-1 hover:underline"
              onClick={() => console.log("Resend OTP")}
            >
              Resend
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
