import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Button from '@mui/material/Button';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import sliderbackground from '../../../Images/circular/sliderbackground.png';
import benefits from '../../../Images/benefits.png';
import verified from '../../../Images/circular/verified.png';
import CircularButtons from './CircularButtons';  // Import the new component
import { Link } from "react-router-dom";

const Sliders = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="relative h-auto w-full bg-white border-b mt-4 mb-20">
      <div className="relative h-[420px] w-full">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: "#swiper-button-next",
            prevEl: "#swiper-button-prev",
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="relative w-full md:h-[420px] h-auto flex flex-col md:flex-row">
              <div className="flex-1 flex flex-col justify-center p-8 bg-secondary">
                <h2 className="sm:text-4xl text-2xl font-sans text-white font-medium mb-4">
                  National Product Catalogue (NPC)
                </h2>
                <p className="sm:text-2xl text-xl font-thin text-white sm:max-w-3xl w-full">
                  NPC by GS1 Saudi Arabia: Real-time Product Data Sharing and Management for Supply Chain Excellence.
                </p>
                <div className="flex justify-between mt-3">
                <Link to="#">
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#FF4308', color: '#ffffff', marginTop: '2rem'}}
                    endIcon={<ArrowRightAltIcon />}
                    >
                    More Details
                  </Button>
                </Link>
                <img 
                  src={verified}
                  className="h-auto w-80 -rotate-12"
                  alt="" />
                  </div>
              </div>
              <div className="flex-1 relative">
                <img
                  src={sliderbackground}
                  className="w-full h-full object-cover"
                  alt="NPC"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <CircularButtons />
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <div className='flex items-center space-x-2 mt-4 px-6'>
          <div className='bg-[#30CDFF] hover:bg-[#28b1da] flex justify-center items-center px-6 shadow-lg rounded-sm'>
            <img src={benefits} alt='Benefits' className='h-6 w-6 ml-3'/>
            <button className='text-white font-sans rounded-full px-4 py-2 flex items-center'>
              Benefits
            </button>
          </div>
        </div>
        <div
          id="swiper-button-prev"
          className="absolute bottom-0 z-20 -translate-y-1/2 transform right-20"
        >
          <IoIosArrowDropleftCircle className="cursor-pointer rounded-full text-5xl text-white opacity-80 hover:opacity-100" />
        </div>
        <div
          id="swiper-button-next"
          className="absolute bottom-0 z-20 -translate-y-1/2 transform right-6"
        >
          <IoIosArrowDroprightCircle className="cursor-pointer rounded-full text-5xl text-white opacity-80 hover:opacity-100" />
        </div>
      </div>
    </div>
  );
};

export default Sliders;
