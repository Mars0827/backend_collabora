import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const CustomSwiper = () => {
  const swiperRef = React.useRef(null);

  return (
    <div className="px-20 m-auto">
      <div className="px-10 m-auto mb-10 flex justify-between">
        <div className="text-4xl font-bold">
          <h1>Made for 1500+</h1>
          <h1>extensive topics</h1>
        </div>
        <div className="mt-auto">
          {/* Custom navigation buttons */}
          <div className="flex justify-center items-center">
            <button
              className="custom-prev text-white text-2xl mx-4"
              onClick={() => swiperRef.current?.slidePrev()} // Navigate to the previous slide
            >
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.2632 2L3 12M3 12L13.2632 22M3 12H23"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <button
              className="custom-next text-white text-2xl mx-4"
              onClick={() => swiperRef.current?.slideNext()} // Navigate to the next slide
            >
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.7368 2L22 12M22 12L11.7368 22M22 12H2"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        navigation={false} // Disable default navigation buttons
        modules={[Navigation]}
        initialSlide={2}
        className="swiper-container"
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Store the swiper instance
      >
        {/* Swiper slides */}
        <SwiperSlide>
          <div className="border border-red-600 bg-black text-white p-14 h-96 w-72 flex flex-col justify-around rounded-md my-10 ">
            <div className="space-y-2">
              <h2 className="text-7xl font-bold">4X</h2>
              <p className="text-">learn biology faster for better grades</p>
            </div>
            <a href="#" className="text-blue-500 hover:underline text-sm">
              Check topic →
            </a>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="border border-cyan-500 bg-black text-white p-14 h-96 w-72 flex flex-col justify-around rounded-md my-10 ">
            <div className="space-y-2">
              <h2 className="text-7xl font-bold">24/7</h2>
              <p className="text-">study nonstop with our service</p>
            </div>
            <a href="#" className="text-blue-500 hover:underline text-sm">
              Check topic →
            </a>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="border border-green-600 bg-black text-white p-14 h-96 w-72 flex flex-col justify-around rounded-md my-10 ">
            <div className="space-y-2">
              <h2 className="text-7xl font-bold">4X</h2>
              <p className="text-">learn biology faster for better grades</p>
            </div>
            <a href="#" className="text-blue-500 hover:underline text-sm">
              Check topic →
            </a>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="border border-purple-700 bg-black text-white p-14 h-96 w-72 flex flex-col justify-around rounded-md my-10 ">
            <div className="space-y-2">
              <h2 className="text-7xl font-bold">20k+</h2>
              <p className="text-">literatures for learning</p>
            </div>
            <a href="#" className="text-blue-500 hover:underline text-sm">
              Check topic →
            </a>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="bg-lime-500 text-black p-14 h-96 w-72 flex flex-col justify-around rounded-md my-10  shadow-[0_0_45px_5px_rgba(0,255,0,0.6)]">
            <div className="space-y-2">
              <h2 className="text-7xl font-bold">37%</h2>
              <p className="text-sm">better understanding on the topic</p>
            </div>
            <a href="#" className="text-black hover:underline text-sm">
              Check topic →
            </a>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default CustomSwiper;
