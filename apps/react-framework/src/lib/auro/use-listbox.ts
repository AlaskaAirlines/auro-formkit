import { type RefObject, useEffect, useRef, useState } from "react";

/**
 * Presentation-agnostic listbox mechanics shared by the select and combobox
 * render layers: the open flag, the roving `activeIndex`, the three element
 * refs, and outside-pointer dismissal. The owning hook (`useSelect`/`useCombobox`)
 * drives `setOpen`/`setActiveIndex` from its machine transitions — this hook holds
 * no component-specific selection logic.
 *
 * The dismiss check consults both the container and the listbox element, so it
 * stays correct when the listbox is rendered through a portal (Step 4) and is no
 * longer a DOM descendant of the container.
 */
export interface UseListboxReturn<TTrigger extends HTMLElement = HTMLElement> {
  isOpen: boolean;
  activeIndex: number;
  setOpen: (open: boolean) => void;
  setActiveIndex: (index: number) => void;
  containerRef: RefObject<HTMLDivElement | null>;
  /** The combobox element the popup anchors to — a `<button>` for select, an `<input>` for combobox. */
  triggerRef: RefObject<TTrigger | null>;
  listboxRef: RefObject<HTMLUListElement | null>;
}

export function useListbox<TTrigger extends HTMLElement = HTMLElement>(
  defaultOpen = false,
): UseListboxReturn<TTrigger> {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<TTrigger | null>(null);
  const listboxRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      const inContainer = containerRef.current?.contains(target) ?? false;
      const inListbox = listboxRef.current?.contains(target) ?? false;
      if (!inContainer && !inListbox) setIsOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isOpen]);

  return {
    isOpen,
    activeIndex,
    setOpen: setIsOpen,
    setActiveIndex,
    containerRef,
    triggerRef,
    listboxRef,
  };
}
