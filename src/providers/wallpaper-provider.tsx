"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type BackgroundContextType = {
  backgroundUrl: string;
  setBackgroundUrl: (url: string) => void;
};

const BackgroundContext = createContext<BackgroundContextType | undefined>(
  undefined
);

const DEFAULT_BACKGROUND = "/bg-sun-5.jpg";

type BackgroundProviderProps = {
  children: ReactNode;
};

export const BackgroundProvider = ({ children }: BackgroundProviderProps) => {
  const [backgroundUrl, setBackgroundUrlState] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem("backgroundUrl");
    if (saved) {
      setBackgroundUrlState(saved);
    } else {
      setBackgroundUrlState(DEFAULT_BACKGROUND);
      localStorage.setItem("backgroundUrl", DEFAULT_BACKGROUND);
    }
  }, []);

  const setBackgroundUrl = (url: string) => {
    setBackgroundUrlState(url);
    localStorage.setItem("backgroundUrl", url);
  };

  return (
    <BackgroundContext.Provider value={{ backgroundUrl, setBackgroundUrl }}>
      <div className="relative h-screen w-screen bg-gradient-to-br from-gray-100 to-black p-2 transition-all xl:p-4 dark:from-gray-700 dark:to-black">
        {backgroundUrl && (
          <div className="absolute inset-0 z-0">
            <img
              src={backgroundUrl}
              alt="Background"
              className="h-full w-full object-cover opacity-60 transition-opacity duration-700"
            />
          </div>
        )}
        {children}
      </div>
    </BackgroundContext.Provider>
  );
};

export const useBackground = (): BackgroundContextType => {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error("useBackground must be used within a BackgroundProvider");
  }
  return context;
};
