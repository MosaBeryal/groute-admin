import React, { useEffect } from "react";
import imageLiveUrl from "../../../utils/urlConverter/imageLiveUrl";
import { useTranslation } from "react-i18next";

const IndustrySolutions = ({ pageData }) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // }, []);

  return (
    <div>
      {pageData?.sections?.map((section) => (
        <div key={section.id}>
          {section?.contents?.map((content) => (
            <div key={content?.id}>
              {content?.type === "hero_section" && (
                <div className="relative w-full h-[350px]">
                  <img
                    src={imageLiveUrl(isArabic ? content?.data_ar?.hero_background : content?.data?.hero_background)}
                    className="w-full h-full object-cover"
                    alt="Slide 1"
                  />
                  <div
                    className={`absolute sm:top-1/3 top-2.5 w-full flex justify-center items-center text-white ${
                      isArabic ? "text-right" : "text-center"
                    }`}
                  >
                    <h2 className="sm:text-5xl text-3xl font-sans font-bold mb-4">
                      {isArabic ? content?.data_ar?.heading : content?.data?.heading}
                    </h2>
                  </div>
                </div>
              )}

              {/* Product Content */}
              {content?.type === "main_content" && (
                <div>
                  <div
                    className={`md:px-12 px-4 mt-10 ${
                      isArabic ? "text-right" : "text-left"
                    }`}
                  >
                    <div className="inline-block">
                      <h2 className="sm:text-4xl text-lg font-bold font-sans text-secondary">
                        {isArabic ? content?.data_ar?.heading : content?.data?.heading}
                      </h2>
                      <span className="block w-full h-1 bg-primary mt-1"></span>
                      <p className="text-base font-sans font-semibold text-primary mt-1">
                        {isArabic ? content?.data_ar?.title : content?.data?.title}
                      </p>
                    </div>
                  </div>

                  <div className="h-auto w-full px-4 md:px-12 mt-8">
                    <div
                      className={`flex flex-wrap justify-center items-center gap-6 md:gap-0 md:mb-20 mb-8 ${
                        isArabic ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div className="w-full md:w-1/2 flex flex-col md:gap-9 gap-3">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: isArabic ? content.data_ar?.description : content.data?.description,
                          }}
                           style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr'}}
                          className="text-secondary font-sans"
                        />
                      </div>
                      <div className="w-full md:w-1/2 flex justify-center items-center">
                        <img
                          src={imageLiveUrl(isArabic ? content?.data_ar?.section_image : content?.data?.section_image)}
                          className="object-contain w-4/5 h-auto"
                          alt="Slide 1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* GS1 Products & Solutions */}
              {content?.type === "last_content" && (
                <div className="w-full px-4 md:px-20 py-8">
                  <div
                    className={`bg-[#f0f5fa] flex flex-wrap justify-center items-center ${
                      isArabic ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div className="w-full md:w-1/2 p-4">
                      <img
                        src={imageLiveUrl(isArabic ? content?.data_ar?.section_3_image : content?.data?.section_3_image)}
                        className="h-auto w-full object-cover"
                        alt="GS1 Products & Solutions"
                      />
                    </div>
                    <div className="w-full md:w-1/2 p-4">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: isArabic ? content.data_ar?.description : content.data?.description,
                        }}
                         style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr'}}
                        className="text-secondary font-sans"
                      />
                    </div>
                  </div>

                  {/* Youtube Video Link */}
                  <div className="md:px-12 px-4 mt-10">
                    <h2 className="sm:text-4xl text-center text-lg font-bold font-sans text-secondary">
                      {isArabic ? "شاهد الفيديو" : "Watch Video"}
                    </h2>
                  </div>
                  <div className="flex justify-center items-center mt-10 mb-10">
                    <iframe
                      className="w-[95%] md:w-3/5"
                      height={"500"}
                      src={`https://www.youtube.com/embed/${content?.data?.button_text}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
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

export default IndustrySolutions;
