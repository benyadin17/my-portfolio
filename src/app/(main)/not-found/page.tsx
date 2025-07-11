"use client";

import Lottie from "lottie-react";
import animation404 from "./not-found-animation.json";

export default function NotFound() {
  return (
    <main
      style={{
        fontFamily:
          'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
        height: "80vh",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#000",
        backgroundColor: "#fff",
        margin: 0,
        padding: "2rem",
      }}
    >
      <style>{`
        @media (prefers-color-scheme: dark) {
          body {
            color: #fff !important;
            background: #000 !important;
          }
          .next-error-h1 {
            border-right: 1px solid rgba(255, 255, 255, 0.3) !important;
          }
        }
        .next-error-h1 {
          border-right: 1px solid rgba(0, 0, 0, 0.3);
          display: inline-block;
          margin: 0 20px 0 0;
          padding: 0 23px 0 0;
          font-size: 24px;
          font-weight: 500;
          vertical-align: top;
          line-height: 49px;
        }
      `}</style>

      {/* Lottie animation */}
      <Lottie
        animationData={animation404}
        loop
        autoplay
        style={{ height: "300px", width: "300px", marginBottom: "1rem" }}
      />

      <div>
        <h1 className="next-error-h1">404</h1>
        <div style={{ display: "inline-block" }}>
          <h2
            style={{
              fontSize: 14,
              fontWeight: 400,
              lineHeight: "49px",
              margin: 0,
            }}
          >
            This page could not be found.
          </h2>
        </div>
      </div>
    </main>
  );
}
