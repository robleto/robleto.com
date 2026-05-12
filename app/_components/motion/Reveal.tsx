"use client";

import React, { useEffect, useRef, useState } from "react";

interface RevealProps {
	children: React.ReactNode;
	className?: string;
	/** Element tag to render. Defaults to div. */
	as?: "div" | "section" | "article" | "header" | "footer";
	/** Distance from viewport edge that triggers reveal. Default 80px before entering. */
	rootMargin?: string;
	/** Optional delay (ms) after intersection before applying the in state. */
	delay?: number;
}

/**
 * Scroll-triggered entrance reveal.
 *
 * Wraps children with .reveal (initial state) and toggles .reveal--in via
 * an IntersectionObserver. Timing/easing lives in globals.css under the
 * .reveal rules. Reduced-motion users see the in state immediately.
 *
 * Use this for sections that should fade up as they enter the viewport.
 * For finer-grained per-row reveals (like WritingList article rows),
 * GSAP ScrollTrigger continues to handle those — both read the same
 * motion tokens.
 */
export default function Reveal({
	children,
	className = "",
	as: Tag = "div",
	rootMargin = "0px 0px -80px 0px",
	delay = 0,
}: RevealProps) {
	const ref = useRef<HTMLDivElement | null>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;

		// Honor prefers-reduced-motion — show immediately, skip the observer.
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setVisible(true);
			return;
		}

		const obs = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (!entry?.isIntersecting) return;
				if (delay > 0) {
					const timer = setTimeout(() => setVisible(true), delay);
					obs.disconnect();
					return () => clearTimeout(timer);
				}
				setVisible(true);
				obs.disconnect();
			},
			{ rootMargin },
		);

		obs.observe(node);
		return () => obs.disconnect();
	}, [delay, rootMargin]);

	const composed = `reveal ${visible ? "reveal--in" : ""} ${className}`.trim();

	const TagComponent = Tag as React.ElementType;
	return (
		<TagComponent ref={ref} className={composed}>
			{children}
		</TagComponent>
	);
}
