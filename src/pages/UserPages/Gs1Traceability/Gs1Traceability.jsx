import React, { useEffect } from "react";
import industrysolutions from "../../../Images/NewUI/industrysolutions.webp";
import { Button } from "@mui/material";
import imageLiveUrl from "../../../utils/urlConverter/imageLiveUrl";
import { useTranslation } from "react-i18next";

const Gs1Traceability = ({ pageData }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  console.log(pageData)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      {pageData?.sections?.map((section) => (
        <div key={section.id}>
          {section?.contents?.map((content) => (
            <div key={content?.id}>
              {content?.type === "hero_section" && (
                <div className="relative w-full md:h-[350px] h-[450px]">
                  <img
                    src={imageLiveUrl(content?.data?.hero_background)}
                    className="w-full h-full object-cover"
                    alt="Slide 1"
                  />

                  <div className={`absolute w-full sm:top-1/4 top-2.5 text-white md:px-10 px-3 ${isArabic ? 'text-right' : 'text-left'}`}>
                    <h2 className="sm:text-4xl bg-red-00 text-3xl font-sans font-thin mb-4 text-primary">
                      {isArabic ? content?.data_ar?.heading : content?.data?.heading}
                    </h2>
                    <p
                      className="sm:text-2xl text-xl font-thin"
                      dangerouslySetInnerHTML={{
                        __html: isArabic ? content?.data_ar?.description : content?.data?.description,
                      }}
                       style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr'}}
                    ></p>
                    {/* <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#FF693A",
                        color: "#ffffff",
                        marginTop: "1rem",
                      }}
                      className="bg-[#B6BAD6]"
                      onClick={() =>
                        window.open(
                          isArabic ? content.data_ar?.button_navigation : content.data?.button_navigation,
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                    >
                      {isArabic ? content?.data_ar?.button_text : content?.data?.button_text}
                    </Button> */}
                  </div>
                </div>
              )}

              {content?.type === "main_content" && (
                <div className="flex flex-col justify-center items-center sm:mt-6 mt-3">
                  <div className={`md:w-[85%] w-[95%] h-auto bg-gray-100 md:px-6 px-3 py-6 rounded-md ${isArabic ? 'text-right' : 'text-left'}`}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: isArabic ? content.data_ar?.description : content.data?.description,
                      }}
                       style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr'}}
                      className="text-secondary font-sans"
                    />
                  </div>
                </div>
              )}

              {content?.type === "discription_content" && (
                <div className="w-full py-8">
                  <div className={`bg-[#fbb034] flex flex-wrap ${isArabic ? 'flex-row-reverse' : ''}`} >
                    <div className={`w-full md:w-1/2 p-4 sm:px-10 px-3 ${isArabic ? 'order-last md:order-first' : ''} ${i18n.language==='ar'?'text-right':'text-left'}`}  style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr'}}>
                      <p
                        className="font-sans sm:text-2xl text-base text-white sm:mt-10 mt-3"
                        dangerouslySetInnerHTML={{
                          __html: isArabic ? content?.data_ar?.description : content?.data?.description,
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
                        onClick={() =>
                          window.open(
                            isArabic ? content.data_ar?.button_navigation : content.data?.button_navigation,
                            "_blank",
                            "noopener,noreferrer"
                          )
                        }
                      >
                        {isArabic ? content?.data_ar?.button_text : content?.data?.button_text}
                      </Button>
                    </div>
                    <div className={`w-full md:w-1/2 ${isArabic ? 'order-first md:order-last' : ''}`}>
                      <img
                        src={imageLiveUrl(isArabic ? content?.data_ar?.section_2_image : content?.data?.section_2_image)}
                        className="h-auto w-full object-contain"
                        alt="GS1 Products & Solutions"
                      />
                    </div>
                  </div>
                </div>
              )}

              {content?.type === "middle_content" && (
                <>
                  <div className="h-full flex justify-center items-center sm:py-10 py-3">
                    <img
                      src={imageLiveUrl(isArabic ? content?.data_ar?.section_3_image : content?.data?.section_3_image)}
                      className="w-[80%] h-auto object-contain"
                      alt=""
                    />
                  </div>

                  <div className="flex flex-col justify-center items-center mt-3 mb-3">
                    <div className={`md:w-[85%] w-[95%] h-auto bg-gray-100 md:px-6 px-3 py-6 rounded-md ${isArabic ? 'text-right' : 'text-left'}`}  style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr'}}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: isArabic ? content.data_ar?.description : content.data?.description,
                        }}
                        className="text-secondary font-sans"
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
                            isArabic ? content.data_ar?.button_navigation : content.data?.button_navigation,
                            "_blank",
                            "noopener,noreferrer"
                          )
                        }
                      >
                        {isArabic ? content?.data_ar?.button_text : content?.data?.button_text}
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Gs1Traceability;
