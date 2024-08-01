import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import imageLiveUrl from '../../../utils/urlConverter/imageLiveUrl';
import { useTranslation } from 'react-i18next';

const Gs1Barcodes = ({ pageData }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div>
      {pageData?.sections?.map((section) => (
        <div key={section.id}>
          {section?.contents?.map((content) => (
            <div key={content?.id}>
              {content?.type === 'hero_section' && (
                <div className="w-full pb-8">
                  <div className={`bg-[#fbb034] flex flex-wrap justify-start ${isArabic ? 'flex-row-reverse text-end' : ''}`}>
                    <div className="w-full md:w-1/2 p-4 sm:px-10 px-3"  style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr'}}>
                      <p
                        className={`font-sans sm:text-2xl text-base text-white sm:mt-10 mt-3 ${isArabic ? 'text-right' : 'text-left'}`}
                        dangerouslySetInnerHTML={{ __html: isArabic ? content?.data_ar?.description : content?.data?.description }}
                      >
                      </p>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: '#cd3c0d', color: '#ffffff', marginTop: '1rem' }}
                        className="bg-[#B6BAD6] px-4"
                        onClick={() => window.open(isArabic ? content.data_ar?.button_navigation : content.data?.button_navigation, '_blank', 'noopener,noreferrer')}
                      >
                        {isArabic ? content?.data_ar?.button_text : content?.data?.button_text}
                      </Button>
                    </div>
                    <div className="w-full md:w-1/2">
                      <img
                        src={imageLiveUrl(isArabic ? content?.data_ar?.hero_background : content?.data?.hero_background)}
                        className="h-auto w-full object-contain"
                        alt="GS1 Products & Solutions"
                      />
                    </div>
                  </div>
                </div>
              )}

              {content?.type === 'main_content' && (
                <div className="h-auto w-full px-4 md:px-12 mt-8">
                  <div className={`flex flex-wrap justify-center items-center gap-6 md:gap-0 md:mb-20 mb-8 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <div className="w-full md:w-1/2 flex flex-col md:gap-9 gap-3">
                      <p
                        className={`text-secondary font-sans text-base ${isArabic ? 'text-right' : 'text-left'}`}
                        dangerouslySetInnerHTML={{ __html: isArabic ? content?.data_ar?.description : content?.data?.description }}
                         style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr'}}
                      >
                      </p>
                    </div>
                    <div className="w-full md:w-1/2 flex justify-center items-center">
                      <img
                        src={imageLiveUrl(isArabic ? content?.data_ar?.section_2_image : content?.data?.section_2_image)}
                        className="object-contain w-4/5 h-auto"
                        alt="Slide 1"
                      />
                    </div>
                  </div>
                </div>
              )}

              {content?.type === 'discription_content' && (
                <div className="h-auto w-full px-4 md:px-12 mt-8">
                  <div className={`flex flex-wrap justify-center items-center gap-6 md:gap-0 md:mb-20 mb-8 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <div className="w-full md:w-1/2 flex flex-col md:gap-9 gap-3">
                      <p
                        className={`text-secondary font-sans text-base ${isArabic ? 'text-right' : 'text-left'}`}
                        dangerouslySetInnerHTML={{ __html: isArabic ? content?.data_ar?.description : content?.data?.description }}
                         style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr'}}
                      >
                      </p>
                    </div>
                    <div className="w-full md:w-1/2 flex justify-center items-center">
                      <img
                        src={imageLiveUrl(isArabic ? content?.data_ar?.section_3_image : content?.data?.section_3_image)}
                        className="object-contain w-4/5 h-auto"
                        alt="Slide 1"
                      />
                    </div>
                  </div>
                </div>
              )}

              {content?.type === 'last_content' && (
                <div className="w-full h-auto mb-10">
                  <div className="bg-orange-600 bg-opacity-75 flex items-center justify-center p-10">
                    <p
                      className={`text-white sm:w-[80%] w-full text-center text-lg md:text-xl font-medium ${isArabic ? 'text-right' : 'text-center'}`}
                      dangerouslySetInnerHTML={{ __html: isArabic ? content?.data_ar?.description : content?.data?.description }}
                       style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr'}}
                    >
                    </p>
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

export default Gs1Barcodes;
