"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Chatbox from "@/app/components/Chatbox";
import { useState } from "react";
import * as React from "react";

export default function Home() {
  return (
    <>
      <Chatbox />
    </>
  );
}
