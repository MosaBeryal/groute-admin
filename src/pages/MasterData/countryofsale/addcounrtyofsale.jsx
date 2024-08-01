import React, { useState } from 'react'
import { toast } from 'react-toastify';
import {newRequestnpc} from '../../../../utils/userRequest';
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "../../../../i18n";
import LanguageSwitcher from "../../../../switer";
const Addcountryofsale = ({ isVisible, setVisibility, refreshBrandData }) => {
  const { t, i18n } = useTranslation();
  const [Alpha2, setAlpha2] = useState("");
  const [Alpha3, setAlpha3] = useState("");
  const [country_code_numeric3, setcountry_code_numeric3] = useState("");
  const [country_name, setcountry_name] = useState("");

  const handleCloseCreatePopup = () => {
    setVisibility(false);
  };


  const handleAddCompany = async () => {
    //  integrate the post api in try catch blcck
    try {
      const response = await newRequestnpc.post('/master-data/createcountryofsale/', {
        Alpha2: Alpha2,
        Alpha3: Alpha3,
        country_code_numeric3: country_code_numeric3,
        country_name: country_name,

      });

      toast.success(`Alpha2 ${Alpha2} has been added successfully.`, {
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
                  }`}>{t('Add Country of Sale')}</h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start"
                      }`}>{t('Alpha2')} </label>
                    <input
                      type="text"
                      id="Alpha2"
                      value={Alpha2}
                      onChange={(e) => setAlpha2(e.target.value)}
                      placeholder={t('Enter Alpha2')}
                      className={`border w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${i18n.language === "ar" ? "text-end" : "text-start"
                        }`}
                    />
                  </div>
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start"
                      }`}>{t('Alpha3')}</label>
                    <input
                      type="text"
                      id="Alpha3"
                      value={Alpha3}
                      onChange={(e) => setAlpha3(e.target.value)}
                      placeholder={t('Enter Alpha3')}
                      className={`border w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${i18n.language === "ar" ? "text-end" : "text-start"
                        }`}
                    />
                  </div>
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start"
                      }`}>{t('Country Code')}</label>
                    <input
                      type="text"
                      id="country_code_numeric3"
                      value={country_code_numeric3}
                      onChange={(e) => setcountry_code_numeric3(e.target.value)}
                      placeholder={t('Enter Country Code')}
                      className={`border w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${i18n.language === "ar" ? "text-end" : "text-start"
                        }`}
                    />
                  </div>
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start"
                      }`}>{t('Country short name')}</label>
                    <input
                      type="text"
                      id="country_name"
                      value={country_name}
                      onChange={(e) => setcountry_name(e.target.value)}
                      placeholder={t('Enter country Name')}
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
                    {t('Add country of sales')}
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

export default Addcountryofsale