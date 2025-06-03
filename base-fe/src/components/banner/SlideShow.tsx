import { useState, useEffect } from "react";

const slides = [
  { image: "https://runnerexpert.com/wp-content/uploads/2021/04/Untitled-design-5-2-1536x804.jpg" },
  { image: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/4f30ec108220259.5fb8d3f3a297a.jpg" },
  { image: "https://i.pinimg.com/originals/06/74/09/06740933f364df76d9ee79e814afe55e.jpg" },
  { image: "https://th.bing.com/th/id/R.08c2a8cf3a4628c43c12989d63902086?rik=n7lph4lUDNbRNg&pid=ImgRaw&r=0" },
];

export function SlideShow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full">
      <img
        src={slides[current].image}
        className="w-full h-full object-cover"
        alt={`slide-${current}`}
      />
      <div className="absolute bottom-4 right-1/2 translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full ${current === idx ? "bg-black" : "bg-gray-400"}`}
            onClick={() => setCurrent(idx)}
            aria-label={`Chuyển đến slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}