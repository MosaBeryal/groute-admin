import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { newRequestnpc } from "../../../../utils/userRequest";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import { useTranslation } from 'react-i18next';

const Updatedocumenttype = ({ isVisible, setVisibility, refreshBrandData }) => {
  const { t, i18n } = useTranslation();
  // get this session data
  const updateBrandData = JSON.parse(sessionStorage.getItem("updateBrandData"));
  // console.log(updateBrandData)
  const [file_name, setfile_name] = useState(updateBrandData?.file_name || '');
  const [status, setstatus] = useState(updateBrandData?.status || 0);
  const [loading, setLoading] = useState(false);

  const handleCloseUpdatePopup = () => {
    setVisibility(false);
  };

  const handleUpdateBrand = async () => {
    // console.log(brandUserId);
    setLoading(true);

    try {
      const response = await newRequestnpc.put(`/master-data/updatedocumenttype/${updateBrandData?.id}`, {
        file_name: file_name,
        status: Number(status),
      });

      toast.success(response?.data?.message || `${t('Document Type')} ${t('has been')} ${t('Updated Successfully')}.`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // console.log(response.data);
      refreshBrandData();
      handleCloseUpdatePopup();

    } catch (error) {
      toast.error(error?.response?.data?.message || `${t('Something went wrong')}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // console.log(error);
    }
    finally {
      setLoading(false);
    }

  };


  return (
    <div>
      {isVisible && (
        <div className="popup-overlay z-50 py-5">
          <div className="popup-container h-auto sm:w-[45%] w-full">
            <div className="popup-form w-full">
              <form className='w-full'>
                <h2 className={`text-secondary font-sans font-semibold text-2xl ${i18n.language === "ar" ? "text-end" : "text-start"
                  }`}>{t('Edit')} {t('Document Type')}</h2>
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

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="status" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start"
                      }`}>
                      {t('Status')}
                    </label>
                    <select
                      id="status"
                      value={status}
                      onChange={(e) => setstatus(e.target.value)}
                      className={`border w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${i18n.language === "ar" ? "text-end" : "text-start"
                        }`}
                    >
                      <option value="0">{t('Inactive')}</option>
                      <option value="1">{t('Active')}</option>
                    </select>
                  </div>
                </div>



                <div className="w-full flex justify-center items-center gap-8 mt-5">
                  <button
                    type="button"
                    className="px-5 py-2 w-[30%] rounded-sm bg-primary text-white font-body text-sm"
                    onClick={handleCloseUpdatePopup}
                  >
                    {t('Close')}
                  </button>
                  {/* <button
                                type="button"
                                onClick={handleUpdateBrand}
                                className="px-5 py-2 rounded-sm w-[70%] bg-secondary text-white font-body text-sm ml-2"
                              >
                                Update Brand
                              </button> */}
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#021F69', color: '#ffffff' }}
                    onClick={handleUpdateBrand}
                    disabled={loading}
                    className="w-[70%] ml-2"
                    endIcon={loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                  >
                    {t('Update')} {t('Document Type')}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Updatedocumenttype