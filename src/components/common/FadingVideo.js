"use client";

import React, { useEffect, useRef, useState } from "react";

export function FadingVideo({
  src,
  className = "",
  style = {},
  fallback = null,
}) {
  const videoRef = useRef(null);
  const [opacity, setOpacity] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  const sources = Array.isArray(src) ? src : [src];
  const currentSrc = sources[currentIndex] || sources[0];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isFading = false;

    const fadeIn = () => {
      let startTime = null;
      const duration = 500;
      const animateFadeIn = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setOpacity(progress);
        if (progress < 1) {
          requestAnimationFrame(animateFadeIn);
        }
      };
      requestAnimationFrame(animateFadeIn);
    };

    const fadeOut = (callback) => {
      if (isFading) return;
      isFading = true;
      let startTime = null;
      const duration = 550;
      const animateFadeOut = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setOpacity(1 - progress);
        if (progress < 1) {
          requestAnimationFrame(animateFadeOut);
        } else {
          isFading = false;
          if (callback) callback();
        }
      };
      requestAnimationFrame(animateFadeOut);
    };

    const handleLoadedData = () => {
      fadeIn();
      video.play().catch(() => {});
    };

    const handleTimeUpdate = () => {
      if (!video.duration) return;
      const remainingTime = video.duration - video.currentTime;
      if (remainingTime <= 0.55 && !isFading) {
        fadeOut(() => {
          if (sources.length > 1) {
            setCurrentIndex((prev) => (prev + 1) % sources.length);
          } else {
            video.currentTime = 0;
            video.play().catch(() => {});
            fadeIn();
          }
        });
      }
    };

    const handleEnded = () => {
      if (sources.length > 1) {
        setCurrentIndex((prev) => (prev + 1) % sources.length);
      } else {
        video.currentTime = 0;
        video.play().catch(() => {});
        fadeIn();
      }
    };

    const handleError = () => {
      setHasError(true);
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
    };
  }, [currentIndex, sources.length]);

  if (hasError && fallback) {
    return fallback;
  }

  return (
    <video
      ref={videoRef}
      src={currentSrc}
      autoPlay
      muted
      loop={sources.length === 1}
      playsInline
      preload="auto"
      style={{
        ...style,
        opacity,
        transition: "opacity 0.2s linear",
      }}
      className={className}
    />
  );
}
