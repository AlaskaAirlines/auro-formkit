import { type ReactNode, type RefObject, useLayoutEffect } from "react";
import {
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  useFloating,
} from "@floating-ui/react";
import "./auro-popover.css";

export interface PopoverProps<T extends HTMLElement = HTMLElement> {
  /** The element the popover anchors to (the select trigger / combobox input). */
  anchorRef: RefObject<T | null>;
  open: boolean;
  children: ReactNode;
}

/**
 * Positioning + portal primitive. Owns all geometry via Floating UI
 * (offset / flip / shift / width-matching + autoUpdate) and renders its content
 * in a portal so it escapes overflow/stacking contexts. The headless core stays
 * DOM-free: it supplies only ARIA/state, never coordinates. Shared by select and
 * combobox.
 */
export function Popover<T extends HTMLElement = HTMLElement>({
  anchorRef,
  open,
  children,
}: PopoverProps<T>): ReactNode {
  const { refs, floatingStyles } = useFloating({
    open,
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(4),
      flip({ padding: 8 }),
      shift({ padding: 8 }),
      size({
        padding: 8,
        apply({ rects, elements, availableHeight }) {
          elements.floating.style.minInlineSize = `${rects.reference.width}px`;
          elements.floating.style.maxBlockSize = `${availableHeight}px`;
        },
      }),
    ],
  });

  useLayoutEffect(() => {
    refs.setReference(anchorRef.current);
  }, [anchorRef, refs]);

  if (!open) return null;

  return (
    <FloatingPortal>
      <div ref={refs.setFloating} className="auro-popover" style={floatingStyles}>
        {children}
      </div>
    </FloatingPortal>
  );
}
