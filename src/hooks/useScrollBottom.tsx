import { useEffect, useRef } from "react";

interface ScrollConfig {
  behavior?: ScrollBehavior;
  deps?: any[];
}

const useScrollBottom = ({
  behavior = "smooth",
  deps = [],
}: ScrollConfig = {}) => {
  const endRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom();
  }, deps);

  return { endRef, scrollToBottom };
};

export default useScrollBottom;
