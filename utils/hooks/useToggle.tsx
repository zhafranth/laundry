"use client";

import { useCallback, useState } from "react";

/**
 * Hook for toggle state, use for modal, collapse, or anything else needs true or false value
 */

export const useToggle = (initialValue = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);

  const toggle = useCallback(() => setIsOpen((previous) => !previous), []);

  const close = useCallback(() => setIsOpen(false), []);

  const open = useCallback(() => setIsOpen(true), []);

  return { isOpen, toggle, close, open };
};

export default useToggle;
