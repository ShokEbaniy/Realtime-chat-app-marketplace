import React, { useState, useEffect } from "react";
import { Users, HeartHandshake, Award } from "lucide-react";

const AuthImagePattern = ({ title, subtitle }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const features = [
    { icon: Users, label: "Community" },
    { icon: HeartHandshake, label: "Support" },
    { icon: Award, label: "Quality" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % features.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="flex items-center justify-center p-12 h-full">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {features.map((feature, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={index}
                className={`
                  aspect-square rounded-2xl flex items-center justify-center
                  transition-all duration-1000 ease-in-out
                  ${
                    isActive
                      ? "bg-green-600 scale-110 shadow-xl" // БЫЛО: bg-primary -> СТАЛО: bg-green-600
                      : "bg-green-600/10 scale-100"        // БЫЛО: bg-primary/10 -> СТАЛО: bg-green-600/10
                  }
                `}
              >
                <feature.icon
                  className={`size-10 transition-colors duration-1000 ${
                    isActive ? "text-white" : "text-green-600/40" // БЫЛО: text-primary/40 -> СТАЛО: text-green-600/40
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Текст тоже можно сделать зеленым или оставить адаптивным (base-content) */}
        <h2 className="text-3xl font-bold mb-2 text-base-content">
          {title || "Join our Community"}
        </h2>
        <p className="text-base-content/60">
          {subtitle || "Quality food, amazing support, and people who care."}
        </p>
      </div>
    </div>
  );
};

export default AuthImagePattern;