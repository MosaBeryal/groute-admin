import React, { useState } from 'react'
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import './AddCrNumber.css'
import newRequest from '../../../../utils/userRequest';
import { useTranslation } from 'react-i18next';

const Addcrnumber = ({ isVisible, setVisibility }) => {
  const [addCrNumber, setAddCrNumber] = useState("");
  const [crActivity, setCrActivity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { t, i18n } = useTranslation();
  const handleCloseCreatePopup = () => {
    setVisibility(false);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length > 10) {
      setError("Cr Number should be 10 digits");
    } else {
      setError("");
    }
    setAddCrNumber(inputValue.slice(0, 10));  // Limit input to 10 characters
  };


  //
  const handleSubmit = async (e) => {
    e.preventDefault();
    // show the error meesage if the cr number is not 10 digits
    if (addCrNumber.length !== 10) {
      setError("Cr Number should be 10 digits");
      return;
    }


    setLoading(true);
    try {
      const response = await newRequest.post('/crs/', {
        cr: addCrNumber,
        activity: crActivity,
        status: 1, // You may want to modify this based on your requirements
        // user_id: gs1MemberData?.id, // Replace with the actual user ID
      });

      toast.success(`${t('Cr Number')} ${addCrNumber} ${t('has been added successfully')}.`, {
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
      // refreshBrandData();
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
    } finally {
      setLoading(false);
    }

  };


  return (
    <div>
      {/* create the post api popup */}
      {isVisible && (
        <div className="popup-overlay z-50 py-5">
          <div className="popup-container h-auto sm:w-[45%] w-full">
            <div className="popup-form w-full">
              <form className='w-full' onSubmit={handleSubmit}>
                <h2 className={`text-secondary font-sans font-semibold text-2xl ${i18n.language === "ar" ? "text-end" : "text-start"
                  }`}> {t('Add')} {t('Cr Number')} </h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-1">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field1" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start"
                      }`}>{t('Cr Number')}<span className='text-red-600'> *</span></label>
                    <input
                      type="number"
                      id="field1"
                      value={addCrNumber}
                      onChange={handleInputChange}
                      //    onChange={(e) => setAddCrNumber(e.target.value)}
                      placeholder={`${t('Enter')} ${t('Cr Number')} `}
                      className={`border w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${i18n.language === "ar" ? "text-end" : "text-start"
                        }`}
                    />
                    {error && <p className="text-red-500 text-xs">{error}</p>}
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="field2" className={`text-secondary  ${i18n.language === "ar" ? "text-end" : "text-start"
                      }`}>{t('Cr Activity')}<span className='text-red-600'> *</span></label>
                    <input
                      type="text"
                      id="field2"
                      //  value={addCrNumber}
                      onChange={(e) => setCrActivity(e.target.value)}
                      placeholder={`${t('Enter')} ${t('Cr Activity')} `}
                      className={`border w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${i18n.language === "ar" ? "text-end" : "text-start"
                        }`}
                    />
                  </div>
                </div>


                <div className="w-full flex justify-center items-center gap-8 mt-5">
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#FF693A', color: '#ffffff' }}
                    className="px-5 py-2 w-[30%] rounded-sm bg-primary text-white font-body text-sm"
                    onClick={handleCloseCreatePopup}
                  >
                    {t('Close')}
                  </Button>
                  <Button
                    type='submit'
                    variant="contained"
                    style={{ backgroundColor: '#021F69', color: '#ffffff' }}
                    // onClick={handleSubmit}
                    disabled={loading}
                    className="w-[70%] ml-2"
                    endIcon={loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                  >
                    {t('Add')} {t('Cr Number')}
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

export default Addcrnumber