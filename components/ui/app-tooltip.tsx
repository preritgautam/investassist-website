"use client";

import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * The only tooltip entry point for product surfaces (enforced by `npm run lint:theme`).
 *
 * Radix tooltips are hover/focus only and never open on touch, so on phones every
 * icon was unlabelled. This wrapper keeps hover/focus on desktop and adds touch:
 *  - mode "action" (icon buttons that DO something): long-press shows the label,
 *    the release does not fire the action; a normal tap still performs the action.
 *  - mode "info" (explainer icons with no action): tap toggles the tooltip.
 */

export type AppTooltipMode = "action" | "info";

const TOOLTIP_TIMING = {
  hoverDelayMs: 200,
  longPressMs: 450,
  touchVisibleMs: { action: 1600, info: 5000 },
  moveTolerancePx: 10,
} as const;

export function AppTooltipProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider delayDuration={TOOLTIP_TIMING.hoverDelayMs}>
      {children}
    </TooltipProvider>
  );
}

interface AppTooltipProps {
  label: React.ReactNode;
  children: React.ReactElement;
  mode?: AppTooltipMode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  variant?: "light" | "dark";
  contentClassName?: string;
  disabled?: boolean;
  /**
   * Skip opening while the trigger renders its own visible text label (any descendant
   * marked `data-visible-label`). Use for responsive controls that are icon-only at some
   * widths and labelled at others; checked at open time, so container queries work
   * (a class on the portaled content can't see the trigger's container).
   */
  skipWhenLabelVisible?: boolean;
}

function hasVisibleLabel(el: HTMLElement | null) {
  if (!el) return false;
  return Array.from(el.querySelectorAll("[data-visible-label]")).some(
    (node) => node.getClientRects().length > 0,
  );
}

export function AppTooltip({
  label,
  children,
  mode = "action",
  side = "top",
  align = "center",
  variant = "light",
  contentClassName,
  disabled = false,
  skipWhenLabelVisible = false,
}: AppTooltipProps) {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const pointerType = React.useRef<string>("mouse");
  const pressTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const pressOrigin = React.useRef<{ x: number; y: number } | null>(null);
  const touchOpened = React.useRef(false);
  const suppressClick = React.useRef(false);

  const clearTimers = React.useCallback(() => {
    if (pressTimer.current) clearTimeout(pressTimer.current);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    pressTimer.current = null;
    hideTimer.current = null;
  }, []);

  React.useEffect(() => clearTimers, [clearTimers]);

  const showFromTouch = React.useCallback(() => {
    touchOpened.current = true;
    setOpen(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      touchOpened.current = false;
      setOpen(false);
    }, TOOLTIP_TIMING.touchVisibleMs[mode]);
  }, [mode]);

  const closeNow = React.useCallback(() => {
    clearTimers();
    touchOpened.current = false;
    setOpen(false);
  }, [clearTimers]);

  if (disabled) return children;

  const isTouch = () => pointerType.current !== "mouse";

  const triggerHandlers = {
    onPointerDown: (e: React.PointerEvent) => {
      pointerType.current = e.pointerType;
      if (!isTouch() || mode !== "action") return;
      pressOrigin.current = { x: e.clientX, y: e.clientY };
      if (pressTimer.current) clearTimeout(pressTimer.current);
      pressTimer.current = setTimeout(() => {
        suppressClick.current = true;
        showFromTouch();
      }, TOOLTIP_TIMING.longPressMs);
    },
    onPointerMove: (e: React.PointerEvent) => {
      const origin = pressOrigin.current;
      if (!origin || !pressTimer.current) return;
      if (
        Math.hypot(e.clientX - origin.x, e.clientY - origin.y) >
        TOOLTIP_TIMING.moveTolerancePx
      ) {
        clearTimeout(pressTimer.current);
        pressTimer.current = null;
      }
    },
    onPointerUp: () => {
      if (pressTimer.current) clearTimeout(pressTimer.current);
      pressTimer.current = null;
      pressOrigin.current = null;
    },
    onPointerCancel: () => {
      if (pressTimer.current) clearTimeout(pressTimer.current);
      pressTimer.current = null;
    },
    onContextMenu: (e: React.MouseEvent) => {
      if (isTouch()) e.preventDefault();
    },
    onClickCapture: (e: React.MouseEvent) => {
      if (!isTouch()) return;
      if (mode === "info") {
        e.preventDefault();
        e.stopPropagation();
        if (open) closeNow();
        else showFromTouch();
        return;
      }
      if (suppressClick.current) {
        suppressClick.current = false;
        e.preventDefault();
        e.stopPropagation();
      }
    },
  };

  const child = React.Children.only(children) as React.ReactElement<
    Record<string, unknown>
  >;
  const needsName =
    mode === "action" &&
    typeof label === "string" &&
    !child.props["aria-label"];
  const trigger = needsName
    ? React.cloneElement(child, { "aria-label": label })
    : child;

  return (
    <TooltipProvider delayDuration={TOOLTIP_TIMING.hoverDelayMs}>
      <Tooltip
        open={open}
        onOpenChange={(next) => {
          if (!next && touchOpened.current) return;
          if (next && skipWhenLabelVisible && hasVisibleLabel(triggerRef.current)) return;
          setOpen(next);
        }}
      >
        <TooltipTrigger
          ref={triggerRef}
          asChild
          {...triggerHandlers}
          style={{ WebkitTouchCallout: "none" }}
        >
          {trigger}
        </TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          variant={variant}
          className={contentClassName}
          onPointerDownOutside={closeNow}
          onEscapeKeyDown={closeNow}
        >
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
