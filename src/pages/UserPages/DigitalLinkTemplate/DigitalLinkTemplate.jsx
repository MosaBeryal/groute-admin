import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Button from "@mui/material/Button";
import imageLiveUrl from "../../../utils/urlConverter/imageLiveUrl";

const DigitalLinkTemplate = ({ pageData }) => {
  const { t, i18n } = useTranslation();
  // console.log(pageData)
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const isArabic = i18n.language === "ar";

  return (
    <div>
      {pageData?.sections?.map((section) => (
        <div key={section.id}>
          {section?.contents?.map((content) => (
            <div key={content?.id}>
              {content?.type === "hero_section" && (
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
                    {content.data?.carouselData?.map((item) => (
                      <SwiperSlide key={item?.id}>
                        <div className="relative w-full h-[420px]">
                          <img
                            src={imageLiveUrl(item?.carouselBackgroundImage)}
                            className="w-full h-full object-cover"
                            alt="Slide 12"
                          />
                          <div
                            className={`absolute sm:top-1/4 top-2.5 ${
                              isArabic
                                ? "sm:right-10 right-3"
                                : "sm:left-10 left-3"
                            } text-white max-w-6xl`}
                          >
                            <h2 className="sm:text-4xl text-3xl font-sans font-bold mb-3 text-yellow-500">
                              {isArabic ? item?.heading_ar : item?.heading}
                            </h2>
                            <p className="sm:text-xl text-lg font-thin max-w-3xl">
                              {isArabic
                                ? item?.description_ar
                                : item?.description}
                            </p>
                            <Button
                              variant="contained"
                              style={{
                                backgroundColor: "#1F0567",
                                color: "#ffffff",
                                marginTop: "2rem",
                              }}
                              className="bg-[#B6BAD6]"
                              onClick={() =>
                                window.open(
                                  item?.button1Navigation,
                                  "_blank",
                                  "noopener,noreferrer"
                                )
                              }
                            >
                              {isArabic
                                ? item?.button1Text_ar
                                : item?.button1Text}
                            </Button>
                            
                            <div>

                            <Button
                              variant="contained"
                              style={{
                                backgroundColor: "#1F0567",
                                color: "#ffffff",
                                marginTop: "1rem"
                              }}
                              className="bg-[#B6BAD6]"
                              onClick={() =>
                                window.open(
                                  item?.button2Navigation,
                                  "_blank",
                                  "noopener,noreferrer"
                                )
                              }
                            >
                              {isArabic
                               ? item?.button2Text_ar
                                : item?.button2Text}
                            </Button>
                            </div>

                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
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
              )}

              {content?.type === "main_content" && (
                <div className="h-auto w-full px-4 md:px-12 mt-8">
                  <div
                    className={`flex flex-wrap justify-center items-center gap-6 md:gap-0 md:mb-20 mb-8 ${
                      isArabic ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div className="w-full md:w-1/2 flex flex-col md:gap-9 gap-3">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: isArabic
                            ? content.data_ar?.description
                            : content.data?.description,
                        }}
                        className="text-secondary font-sans"
                        style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr'}}
                      />
                    </div>

                    <div className="w-full md:w-1/2 flex justify-center items-center">
                      <img
                        src={imageLiveUrl(content?.data?.section_image)}
                        className="object-contain w-4/5 h-auto"
                        alt="Slide 11"
                      />
                    </div>
                  </div>
                </div>
              )}

              {content?.type === "discription_content" && (
                <div className="flex flex-col justify-center items-center mt-3 mb-3">
                  <div className={`md:w-[85%] w-[95%] h-auto bg-gray-100 md:px-6 px-3 py-6 rounded-md ${
                      isArabic ? "flex-row-reverse text-end" : ""
                    }`} >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: isArabic
                          ? content.data_ar?.description
                          : content.data?.description,
                      }}
                      className="text-secondary font-sans text-base"
                    />
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#021F69",
                        color: "#ffffff",
                        marginTop: "1rem",
                      }}
                      className="bg-[#B6BAD6]"
                      onClick={() =>
                        window.open(
                          content.data?.button_navigation,
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                    >
                      {isArabic
                        ? content?.data_ar?.button_text
                        : content?.data?.button_text}
                    </Button>
                  </div>
                </div>
              )}

              {content?.type === "last_content" && (
                <div className="w-full pb-8">
                  <div
                    className={`bg-[#fbb034] flex flex-wrap justify-start ${
                      isArabic ? "flex-row-reverse text-end" : ""
                    }`}
                  >
                    <div className="w-full md:w-1/2 p-4 sm:px-10  px-3" 
                     style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr'}}>
                      <p
                        className="font-sans sm:text-2xl text-base text-white sm:mt-10 mt-3"
                        dangerouslySetInnerHTML={{
                          __html: isArabic
                            ? content?.data_ar?.description
                            : content?.data?.description,
                        }}
                      ></p>
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "#cd3c0d",
                          color: "#ffffff",
                          marginTop: "1rem",
                        }}
                        className="bg-[#B6BAD6] px-4"
                      >
                        {isArabic
                          ? content?.data_ar?.button_text
                          : content?.data?.button_text}
                      </Button>
                    </div>

                    <div className="w-full md:w-1/2">
                      <img
                        src={imageLiveUrl(content?.data?.section_3_image)}
                        className="h-auto w-full object-contain"
                        alt="GS1 Products & Solutions"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DigitalLinkTemplate;
