import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import imageLiveUrl from '../../../utils/urlConverter/imageLiveUrl';
import { useTranslation } from 'react-i18next';

const BarcodeServicesTemplate5 = ({ pageData }) => {
  const { i18n } = useTranslation();
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
                <div className="relative w-full h-[450px]">
                  <img
                    src={imageLiveUrl(isArabic ? content?.data_ar?.hero_background : content?.data?.hero_background)}
                    className="w-full h-full object-cover"
                    alt="Hero Background image"
                  />
                  <div className={`absolute w-full sm:top-1/4 top-2.5 text-white md:px-10 px-3 ${isArabic ? 'text-right' : 'text-left'}`}>
                    <h2 className="sm:text-5xl text-3xl font-sans font-semibold mb-4"
                      dangerouslySetInnerHTML={{ __html: isArabic ? content?.data_ar?.heading : content?.data?.heading }}
                    />
                    <p className="sm:text-2xl text-xl font-medium font-sans"
                      dangerouslySetInnerHTML={{ __html: isArabic ? content?.data_ar?.description : content?.data?.description }}
                    />
                  </div>
                </div>
              )}

              {content?.type === 'main_content' && (
                <div className="w-full py-8">
                  <div className={`bg-gray-100 flex flex-wrap justify-start ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-full md:w-1/2 p-4 sm:px-10 px-3 flex ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <p className="font-sans sm:text-lg text-base text-gray-600 mt-3" style={{
                        direction: i18n.language === 'ar' ? 'rtl' : 'ltr'
                      }}
                        dangerouslySetInnerHTML={{ __html: isArabic ? content?.data_ar?.description : content?.data?.description }}
                      />
                    </div>
                    <div className="w-full md:w-1/2">
                      <img
                        src={imageLiveUrl(isArabic ? content?.data_ar?.section_image : content?.data?.section_image)}
                        className="h-auto w-full object-contain"
                        alt="Section Image"
                      />
                    </div>
                  </div>
                </div>
              )}

              {content?.type === 'middle_content' && (
                <div className="w-full h-auto mb-10">
                  <div className="bg-orange-600 bg-opacity-75 flex items-center justify-center p-10">
                    <p className="text-white sm:w-[80%] w-full text-center text-lg md:text-xl font-medium"
                    style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr'}}
                      dangerouslySetInnerHTML={{ __html: isArabic ? content?.data_ar?.description : content?.data?.description }}
                    />
                  </div>
                </div>
              )}

              {content?.type === 'last_content' && (
                <div className="w-full py-8">
                  <div className={`bg-gray-100 flex flex-wrap justify-start ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-full md:w-1/2`}>
                      <img
                        src={imageLiveUrl(isArabic ? content?.data_ar?.section_3_image : content?.data?.section_3_image)}
                        className="h-auto w-full object-contain"
                        alt="Section Image"
                      />
                    </div>
                    <div className={`w-full md:w-1/2 p-4 sm:px-10 px-3 flex ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <p className="font-sans sm:text-lg text-base text-gray-600 mt-3"
                      style={{
                        direction: i18n.language === 'ar' ? 'rtl' : 'ltr'
                      }}
                        dangerouslySetInnerHTML={{ __html: isArabic ? content?.data_ar?.description : content?.data?.description }}
                      />
                      {/* <Button
                        variant="contained"
                        style={{ backgroundColor: '#cd3c0d', color: '#ffffff', marginTop: '1rem' }}
                        className="bg-[#B6BAD6] px-4"
                        onClick={() => window.open(isArabic ? content.data_ar?.button_navigation : content.data?.button_navigation, '_blank', 'noopener,noreferrer')}
                      >
                        {isArabic ? content?.data_ar?.button_text : content?.data?.button_text}
                      </Button> */}
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

export default BarcodeServicesTemplate5;
