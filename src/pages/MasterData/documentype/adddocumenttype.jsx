import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { newRequestnpc } from "../../../../utils/userRequest";
import { useTranslation } from 'react-i18next';

const Adddocumenttype = ({ isVisible, setVisibility, refreshBrandData }) => {
  const { t, i18n } = useTranslation();
  const [file_name, setfile_name] = useState("");
  const [status, setstatus] = useState("");

  const handleCloseCreatePopup = () => {
    setVisibility(false);
  };


  const handleAddCompany = async () => {
    //  integrate the post api in try catch blcck
    try {
      const response = await newRequestnpc.post('/master-data/createdocumenttype', {
        file_name: file_name,
        status: 1,
      });

      toast.success(`${t('Document Type')} ${file_name} ${t('has been added successfully')}.`, {
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
                  }`}>{t('Add')} {t('document Type')}</h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start"
                      }`}>{t('Document name')}</label>
                    <input
                      type="text"
                      id="file_name"
                      value={file_name}
                      onChange={(e) => setfile_name(e.target.value)}
                      placeholder={`${t('Enter')} ${t('Document name')}`}
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
                    {t('Add')} {t('document Type')}
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

export default Adddocumenttype