import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

// ── Fade In (any direction) ──────────────────────────────
interface FadeInProps {
    children: ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    delay?: number;
    duration?: number;
    className?: string;
    once?: boolean;
}

const directionOffsets = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
    none: {},
};

export function FadeIn({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.6,
    className = '',
    once = true,
}: FadeInProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: '-80px' });
    const offset = directionOffsets[direction];

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, ...offset }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// ── Scale In ────────────────────────────────────────────
interface ScaleInProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
}

export function ScaleIn({ children, delay = 0, duration = 0.5, className = '' }: ScaleInProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// ── Stagger Container ───────────────────────────────────
interface StaggerContainerProps {
    children: ReactNode;
    staggerDelay?: number;
    className?: string;
}

export function StaggerContainer({ children, staggerDelay = 0.1, className = '' }: StaggerContainerProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// ── Stagger Item (child of StaggerContainer) ────────────
interface StaggerItemProps {
    children: ReactNode;
    className?: string;
}

export function StaggerItem({ children, className = '' }: StaggerItemProps) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.5,
                        ease: [0.25, 0.46, 0.45, 0.94],
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// ── Slide In ────────────────────────────────────────────
interface SlideInProps {
    children: ReactNode;
    from?: 'left' | 'right';
    delay?: number;
    className?: string;
}

export function SlideIn({ children, from = 'left', delay = 0, className = '' }: SlideInProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const x = from === 'left' ? -80 : 80;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x }}
            transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// ── Hover Tilt 3D ───────────────────────────────────────
interface HoverTiltProps {
    children: ReactNode;
    className?: string;
    intensity?: number;
}

export function HoverTilt({ children, className = '', intensity = 8 }: HoverTiltProps) {
    return (
        <motion.div
            className={className}
            whileHover={{
                rotateX: -intensity / 2,
                rotateY: intensity / 2,
                scale: 1.02,
                transition: { duration: 0.3 },
            }}
            style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
        >
            {children}
        </motion.div>
    );
}
