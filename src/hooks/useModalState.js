
import { useState, useCallback } from 'react';

export const useModalState = (initialOpen = false) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);
  const handleOpenChange = useCallback((openState) => setIsOpen(openState), []);
  
  return {
    isOpen,
    setOpen: setIsOpen, 
    open,
    close,
    toggle,
    handleOpenChange,
  };
};
