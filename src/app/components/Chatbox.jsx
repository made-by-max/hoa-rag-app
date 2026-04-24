"use client";

import { useState } from "react";
import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import styles from "./Chatbox.css";
import { SendHorizontal } from "lucide-react";
import LoadingThreeDotsJumping from "./LoadingThreeDotsJumping";

export default function Chatbox() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAnswer("");

    try {
      const response = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();
      setAnswer(data.answer);
      setQuestion("");
    } catch (err) {
      setAnswer("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <h1 style={{ color: "white" }}>HOA Bylaws</h1>
        <div className="responseWindow">
          <div className="inputWrapper">
            <form onSubmit={handleSubmit}>
              <input
                className="input"
                type="text"
                placeholder="What do you want to know?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                disabled={loading}
              />
            </form>

            <button type="submit" disabled={loading}>
              <SendHorizontal />
            </button>
          </div>

          {loading ? (
            <LoadingThreeDotsJumping />
          ) : (
            <div className="response">{answer}</div>
          )}
        </div>
      </div>
    </>
  );
}
