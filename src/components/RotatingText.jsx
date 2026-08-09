import React, { forwardRef, useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const RotatingText = forwardRef((props, ref) => {
  const {
    texts,
    transition = { type: "spring", damping: 30, stiffness: 400 },
    initial = { y: "100%" },
    animate = { y: 0 },
    exit = { y: "-120%" },
    animatePresenceMode = "wait",
    animatePresenceInitial = false,
    rotationInterval = 2000,
    staggerDuration = 0,
    staggerFrom = "first",
    loop = true,
    auto = true,
    splitBy = "characters",
    onNext,
    mainClassName = "",
    splitLevelClassName = "",
    elementLevelClassName = "",
    ...rest
  } = props;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    if (!auto) return;
    const intervalId = setInterval(() => {
      setCurrentTextIndex((prev) => {
        if (!loop && prev === texts.length - 1) {
          clearInterval(intervalId);
          return prev;
        }
        return (prev + 1) % texts.length;
      });
      if (onNext) onNext();
    }, rotationInterval);

    return () => clearInterval(intervalId);
  }, [auto, loop, texts.length, rotationInterval, onNext]);

  const currentText = texts[currentTextIndex];

  const elements = useMemo(() => {
    if (splitBy === "characters") {
      return currentText.split('');
    }
    if (splitBy === "words") {
      return currentText.split(' ');
    }
    return [currentText];
  }, [currentText, splitBy]);

  return (
    <span ref={ref} className={classNames("inline-flex relative", mainClassName)} {...rest}>
      <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
        <motion.span
          key={currentTextIndex}
          className={classNames("flex whitespace-pre", splitLevelClassName)}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {elements.map((el, i) => {
            let delay = i * staggerDuration;
            if (staggerFrom === "last") {
              delay = (elements.length - 1 - i) * staggerDuration;
            } else if (staggerFrom === "center") {
              const center = Math.floor(elements.length / 2);
              delay = Math.abs(center - i) * staggerDuration;
            }

            return (
              <span key={i} className="inline-block overflow-hidden">
                <motion.span
                  className={classNames("inline-block", elementLevelClassName)}
                  variants={{
                    hidden: initial,
                    visible: { ...animate, transition: { ...transition, delay } },
                    exit: { ...exit, transition: { ...transition, delay } }
                  }}
                >
                  {el === ' ' ? '\u00A0' : el}
                </motion.span>
              </span>
            );
          })}
        </motion.span>
      </AnimatePresence>
    </span>
  );
});

RotatingText.displayName = 'RotatingText';

export default RotatingText;
