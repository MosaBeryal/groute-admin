import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import imageLiveUrl from '../../../utils/urlConverter/imageLiveUrl';
import { useTranslation } from 'react-i18next';

const BarcodeServices = ({ pageData }) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const getContentData = (content) => {
    return isArabic ? content.data_ar : content.data;
  };

  return (
    <div>
      {pageData?.sections?.map((section) => (
        <div key={section.id}>
          {section?.contents?.map((content) => {
            const data = getContentData(content);
            return (
              <div key={content?.id}>
                {content?.type === 'hero_section' && (
                  <div className="relative w-full h-[450px]">
                    <img
                      src={imageLiveUrl(data?.hero_background)}
                      className="w-full h-full object-cover"
                      alt="Hero Background"
                    />
                    <div className={`absolute sm:top-1/4 top-2.5 text-white md:px-10 px-3 ${isArabic ? 'text-right right-3' : 'left-3'}`}>
                      <h2 className="sm:text-5xl text-3xl font-sans font-semibold mb-4"
                        dangerouslySetInnerHTML={{ __html: data?.heading }}
                      ></h2>
                      <p className="sm:text-2xl text-xl font-medium font-sans max-w-5xl"
                        dangerouslySetInnerHTML={{ __html: data?.description }}
                      ></p>
                    </div>
                  </div>
                )}

                {content?.type === 'main_content' && (
                  <div className="w-full py-8">
                    <div className={`bg-gray-100 flex flex-wrap ${isArabic ? 'justify-end' : 'justify-start'}`}>
                      {isArabic && (
                        <div className="w-full md:w-1/2">
                          <img
                            src={imageLiveUrl(data?.section_2_image)}
                            className="h-auto w-full object-contain"
                            alt="Section Image 4"
                          />
                        </div>
                      )}
                      <div className="w-full md:w-1/2 p-4 sm:px-10 px-3" style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr'}}>
                        <p className="font-sans sm:text-lg text-base text-gray-600 mt-3"
                          dangerouslySetInnerHTML={{ __html: data?.description }}
                        ></p>
                        <Button
                          variant="contained"
                          style={{ backgroundColor: '#cd3c0d', color: '#ffffff', marginTop: '1rem' }}
                          className="bg-[#B6BAD6] px-4"
                          onClick={() => window.open(data?.button_navigation, '_blank', 'noopener,noreferrer')}
                        >
                          {data?.button_text}
                        </Button>
                      </div>
                      {!isArabic && (
                        <div className="w-full md:w-1/2">
                          <img
                            src={imageLiveUrl(data?.section_2_image)}
                            className="h-auto w-full object-contain"
                            alt="Section Image 5"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {content?.type === 'discription_content' && (
                  <div className="w-full py-8">
                    <div className={`flex flex-wrap ${isArabic ? 'justify-end' : 'justify-start'}`}>
                      <div className="w-full p-4 sm:px-10 px-3">
                        <p className="font-sans sm:text-lg text-base text-gray-600 mt-3"
                        style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr'}}
                          dangerouslySetInnerHTML={{ __html: data?.description }}
                        ></p>
                      </div>
                      <div className="w-full">
                        <img
                          src={imageLiveUrl(data?.section_3_image)}
                          className="h-auto sm:w-[70%] w-full object-contain"
                          alt="Section Image 6"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default BarcodeServices;
