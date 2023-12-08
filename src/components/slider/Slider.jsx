import { React, useEffect, useState } from "react";
import { slides } from "./links";

export default function Slider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(current === slides.length - 1 ? 0 : current + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [current, slides.length]);

  return (
    <div className="flex flex-col relative z-0">
      <img
        className="rounded-md object-cover h-[400px]"
        src={slides[current].img}
        alt="pic"
      />
      <div className="flex gap-2 items-center absolute bottom-4 left-1/2 transform -translate-x-1/2">
        {slides.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrent(index)}
            className={`${
              index === current ? "h-3 w-3 bg-white" : "h-2 w-2 bg-white"
            } cursor-pointer rounded-full transition-all`}
          ></span>
        ))}
      </div>
    </div>
  );
}
