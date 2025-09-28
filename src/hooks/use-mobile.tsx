import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile(breakingPoint = MOBILE_BREAKPOINT) {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakingPoint - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < breakingPoint);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < breakingPoint);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
