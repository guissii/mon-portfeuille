import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TypewriterTextProps {
    words: string[];
    className?: string;
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseDuration?: number;
}

export function TypewriterText({
    words,
    className = '',
    typingSpeed = 80,
    deletingSpeed = 50,
    pauseDuration = 2000,
}: TypewriterTextProps) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        const word = words[currentWordIndex];
        let timeout: ReturnType<typeof setTimeout>;

        if (!isDeleting) {
            if (currentText.length < word.length) {
                timeout = setTimeout(() => {
                    setCurrentText(word.slice(0, currentText.length + 1));
                }, typingSpeed);
            } else {
                timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
            }
        } else {
            if (currentText.length > 0) {
                timeout = setTimeout(() => {
                    setCurrentText(currentText.slice(0, -1));
                }, deletingSpeed);
            } else {
                setIsDeleting(false);
                setCurrentWordIndex((prev) => (prev + 1) % words.length);
            }
        }

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseDuration, isInView]);

    return (
        <span ref={ref} className={className}>
            {currentText}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                className="inline-block w-[3px] h-[1em] bg-current ml-1 align-middle"
            />
        </span>
    );
}
