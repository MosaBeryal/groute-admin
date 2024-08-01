import React, { useState } from 'react'
import { toast } from 'react-toastify';
import {newRequestnpc} from '../../../../utils/userRequest';
import { useTranslation } from 'react-i18next';

const Addcountry = ({ isVisible, setVisibility, refreshBrandData }) =>
{
  const [name_en, setname_en] = useState("");
  const [name_ar, setname_ar] = useState("");
  const [country_code, setcountry_code] = useState("");
  const [country_shortName, setcountry_shortName] = useState("");

  const handleCloseCreatePopup = () =>
  {
    setVisibility(false);
  };
  const { t, i18n } = useTranslation();

  const handleAddCompany = async () =>
  {
    //  integrate the post api in try catch blcck
    try {
      const response = await newRequestnpc.post('/master-data/createCountries/', {
        name_en: name_en,
        name_ar: name_ar,
        country_code: country_code,
        country_shortName: country_shortName,
        status: 1,
      });

      toast.success(`${t('Country')} ${name_en} ${t('has been added successfully')}.`, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });


      // console.log(response.data);
      refreshBrandData();
      handleCloseCreatePopup();


    } catch (error) {
      toast.error(error?.response?.data?.error || 'Error', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });


      // console.log(error);
    }


  };


  return (
    <div>
      {/* create the post api popup */}
      {isVisible && (
        <div className="popup-overlay z-50 py-5">
          <div className="popup-container h-auto sm:w-[45%] w-full">
            <div className="popup-form w-full">
              <form className='w-full'>
                <h2 className={`text-secondary font-sans font-semibold text-2xl ${i18n.language === "ar" ? "text-end" : "text-start"
                  }`}>{t('Add')} {t('Country')} </h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start"
                      }`}>{t('Country name')} {t('Name[English]')} </label>
                    <input
                      type="text"
                      id="name_en"
                      value={name_en}
                      onChange={(e) => setname_en(e.target.value)}
                      placeholder={`${t('Enter')} ${t('Country name')} ${t('Name[English]')}`}
                      className={`border w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${i18n.language === "ar" ? "text-end" : "text-start"
                        }`}
                    />
                  </div>
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start"
                      }`}>{t('Country name')} {t('Name[Arabic]')}</label>
                    <input
                      type="text"
                      id="name_ar"
                      value={name_ar}
                      onChange={(e) => setname_ar(e.target.value)}
                      placeholder={`${t('Enter')} ${t('Country name')} ${t('Name[Arabic]')}`}
                      className={`border w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${i18n.language === "ar" ? "text-end" : "text-start"
                        }`}
                    />
                  </div>
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start"
                      }`}> {t('Country Code')}</label>
                    <input
                      type="text"
                      id="country_code"
                      value={country_code}
                      onChange={(e) => setcountry_code(e.target.value)}
                      placeholder={`${t('Enter')} ${t('Country Code')} `}
                      className={`border w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${i18n.language === "ar" ? "text-end" : "text-start"
                        }`}
                    />
                  </div>
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start"
                      }`}>{t('Country short name')}</label>
                    <input
                      type="text"
                      id="country_shortName"
                      value={country_shortName}
                      onChange={(e) => setcountry_shortName(e.target.value)}
                      placeholder={`${t('Enter')} ${t('Country short name')} `}
                      className={`border w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${i18n.language === "ar" ? "text-end" : "text-start"
                        }`}
                    />
                  </div>

                </div>

                <div className="w-full flex justify-center items-center gap-8 mt-5">
                  <button
                    type="button"
                    className="px-5 py-2 w-[30%] rounded-sm bg-primary text-white font-body text-sm"
                    onClick={handleCloseCreatePopup}
                  >
                     {t('Close')}
                  </button>
                  <button
                    type="button"
                    onClick={handleAddCompany}
                    className="px-5 py-2 rounded-sm w-[70%] bg-secondary text-white font-body text-sm ml-2"
                  >
                    {t('Add')} {t('Country')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Addcountry