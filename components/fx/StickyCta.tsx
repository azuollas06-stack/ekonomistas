"use client";

import { useEffect, useState, type ReactNode } from "react";

type Props = { children: ReactNode; className?: string; hideWhenVisible?: string };

/** Apatinė CTA juosta: atsiranda praslinkus hero, pasislepia, kai matoma galutinė CTA sekcija. */
export default function StickyCta({ children, className, hideWhenVisible = "#kontaktai" }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const target = document.querySelector(hideWhenVisible);
    let targetVisible = false;
    const io = target
      ? new IntersectionObserver(([e]) => {
          targetVisible = e.isIntersecting;
          onScroll();
        })
      : null;
    if (target && io) io.observe(target);
    function onScroll() {
      setShow(window.scrollY > window.innerHeight * 0.7 && !targetVisible);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, [hideWhenVisible]);

  return (
    <div className={className} data-show={show} aria-hidden={!show} inert={!show}>
      {children}
    </div>
  );
}
