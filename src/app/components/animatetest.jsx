"use client";

import { useState } from "react";
import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import styles from "./Chatbox.css";
import { SendHorizontal } from "lucide-react";
import LoadingThreeDotsJumping from "./LoadingThreeDotsJumping";

export default function Test() {
  const loader = {
    key: 1,
    object: <LoadingThreeDotsJumping />,
  };
  const text = {
    key: 2,
    object: "hellow world",
  };

  const content = [loader, text];

  const variants = {
    hidden: (direction) => ({
      opacity: 0,
      x: direction === 1 ? -300 : 300,
    }),
    visible: { opacity: 1, x: 0 },
  };

  const Slideshow = ({ content, direction }) => (
    <AnimatePresence custom={direction}>
      <motion.div
        key={content.key}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      />
      {content.object}
    </AnimatePresence>
  );

  return Slideshow;
}
