import { useEffect, useState } from "react";
interface Mouse {
  x: number;
  y: number;
}

export const useMousePosition = (ref: React.RefObject<HTMLDivElement>) => {
  const [mousePosition, setMousePosition] = useState<Mouse>({ x: 0, y: 0 });
  const updatePosition = (e: MouseEvent) => {
    setTimeout(() => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }, 100);
  };

  useEffect(() => {
    ref.current!.addEventListener("mousemove", updatePosition);
    // return () => ref.current!.removeEventListener("mousemove", updatePosition);
  }, []);
  return mousePosition;
};
