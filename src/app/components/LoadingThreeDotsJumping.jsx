"use client";

import { motion, Variants } from "motion/react";

export default function LoadingThreeDotsJumping() {
  const dotVariants = {
    jump: {
      transform: "translateY(-30px)",
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      animate="jump"
      transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
      className="loader-container"
    >
      <motion.div className="dot" variants={dotVariants} />
      <motion.div className="dot" variants={dotVariants} />
      <motion.div className="dot" variants={dotVariants} />
      <StyleSheet />
    </motion.div>
  );
}

/**
 * ==============   Styles   ================
 */
function StyleSheet() {
  return (
    <style>
      {`
            .loader-container{
            margin-top: 80px;
            margin-inline: auto;
            display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                gap: 10px;
            }

            .dot {
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background-color: #545553;
                will-change: transform;
            }
            `}
    </style>
  );
}
