"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import Lottie from "lottie-react";
import "swiper/css";
import "swiper/css/effect-cards";

import loveAnimation from "../assets/love floating.json";

export default function ProfilePage() {
  const router = useRouter();
  const [likeAnim, setLikeAnim] = useState(false);
  const [cardHeight, setCardHeight] = useState<number | null>(null);
  const slide1Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (slide1Ref.current) {
      setCardHeight(slide1Ref.current.offsetHeight);
    }
  }, []);

  const handleLike = () => {
    setLikeAnim(true);
    setTimeout(() => {
      router.push("/match");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <Swiper
        modules={[EffectCards]}
        effect="cards"
        grabCursor={true}
        className="w-full max-w-sm h-full"
      >
        {/* Slide 1: Profile */}
        <SwiperSlide>
          <div
            ref={slide1Ref}
            className="bg-white rounded-xl shadow-md overflow-hidden relative w-full"
            style={{ minHeight: "500px" }} // fallback min height
          >
            <div className="relative">
              <img
                src="/profile-photo.jpg"
                alt="Alex Johnson"
                className="w-full h-80 object-cover"
              />
              <div className="absolute top-2 right-2 flex space-x-1">
                <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                  28
                </span>
                <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                  He/Him
                </span>
              </div>

              {likeAnim && (
                <div className="absolute inset-0">
                  <Lottie animationData={loveAnimation} loop={false} className="w-full h-full" />
                </div>
              )}
            </div>

            <div className="p-4 space-y-4">
              <div>
                <h1 className="text-2xl font-semibold">Alex Johnson</h1>
                <p className="text-sm text-gray-500">Loves hiking • Coffee addict</p>
              </div>

              <div className="space-y-2">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <strong className="text-sm">My ideal Sunday:</strong>
                  <p className="text-sm text-gray-700">
                    Sunrise hike followed by brunch at a cozy local spot.
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <strong className="text-sm">Best concert ever:</strong>
                  <p className="text-sm text-gray-700">Coldplay live under the stars.</p>
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <button
                  onClick={handleLike}
                  className="bg-yellow-500 text-white py-2 px-6 rounded-lg font-semibold"
                >
                  Like
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2: Full Page Text */}
        <SwiperSlide>
          <div
            className="bg-white rounded-xl shadow-md overflow-hidden relative w-full"
            style={{ height: cardHeight || "500px" }} // tinggi sama seperti slide 1
          >
            {!likeAnim && (
              <div className="flex flex-col justify-center items-center h-full p-4 text-center">
                <p className="text-gray-700 text-lg">
                  Sudah banyak profile yg kutemui. Kadang aku like, kadang aku skip.
                  Sisanya menunggu keajaiban..
                </p>
                <button
                  onClick={handleLike}
                  className="mt-6 bg-yellow-500 text-white py-2 px-6 rounded-lg font-semibold"
                >
                  Like
                </button>
              </div>
            )}

            {likeAnim && (
              <div className="absolute inset-0">
                <Lottie animationData={loveAnimation} loop={false} className="w-full h-full" />
              </div>
            )}
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
