import { useState, useEffect } from "react"

const useScreenWidth = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(screen.width);

    window.addEventListener('resize', () => {
      setWidth(screen.width);
    });
  }, []);

  return width < 600;
}

export default useScreenWidth