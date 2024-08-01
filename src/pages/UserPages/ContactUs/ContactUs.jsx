import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import MapEvents from '../../../components/Maps/MapEvents';
import newRequest from '../../../utils/userRequest';
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import PhoneInput from 'react-phone-input-2';
import "react-phone-input-2/lib/style.css";

const ContactUs = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     const res = await newRequest.post('/website/contactUs', {
  //       "name": name,
  //       "email": email,
  //       "phoneNumber": phoneNumber,
  //       "company": company,
  //       "message": message
  //     });
  //     toast.success(res?.data?.message || `${t("Email sent successfully!")}`);
  //     setName('');
  //     setEmail('');
  //     setPhoneNumber('');
  //     setCompany('');
  //     setMessage('');
  //   } 
  //   catch (error) {
  //     toast.error(error.response?.data?.error || t("Email sending failed!"));
  //   } 
  //   finally {
  //     setLoading(false);
  //   }
  // }

  const [phoneNumberError, setPhoneNumberError] = useState("");
  const handleCompanyNumber = (value) => {
    // Reset error message
    setPhoneNumberError("");

    // Check if the country code is for Saudi Arabia
    if (value.startsWith("966")) {
      // Check for mobile number (should start with '9665')
      // if (value.length > 1 && value[3] !== '5') {
      //     setCompanyLandlineError('Mobile number must start with 9665');
      // }

      // Check for maximum length (12 digits including country code)
      if (value.length > 12) {
        setPhoneNumberError(
          `${t("Number must be a maximum of 12 digits")}`
        );
      }
    }
    // Set the mobile number
    setPhoneNumber(value);
  };

  return (
    <div className={`flex justify-center items-center ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className={`bg-[#f0f5fa] p-6 rounded-lg shadow-lg w-full flex flex-col lg:flex-row ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
        
        <div className={`w-full lg:w-1/2 sm:ml-6 ml-0 ${isRTL ? 'lg:order-2' : 'lg:order-1'}`}>
          <div className="mt-5 mb-8">
            <h2 className="sm:text-4xl text-lg font-bold font-sans text-secondary">
              {t('Contact Us')}
            </h2>
          </div>

          {/* <form onSubmit={handleSubmit} className="space-y-4"> */}
          <form className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <input 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type='text'
                    placeholder={t('Name')}
                    required
                    className="w-full p-2 border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500"> 
                </input>
              </div>
              <div className="flex-1">
                <PhoneInput
                    international
                    country={"sa"}
                    defaultCountry={"sa"}
                    value={phoneNumber}
                    onChange={handleCompanyNumber}
                    inputProps={{
                      id: "landline",
                      placeholder: t('Phone Number with Country Code'),
                      autoComplete: "off",
                    }}
                    inputStyle={{
                      width: "100%",
                      borderRadius: "1px",
                      border: "1px solid #9ca3af",
                    }}
                    required
                  />
                {phoneNumberError && (
                  <p className="text-red-600 text-sm">{phoneNumberError}</p>
                )}
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="flex-1">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  placeholder={t('E-Mail')}
                  className="w-full p-2 border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex-1">
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  type="text"
                  required
                  placeholder={t('Company')}
                  className="w-full p-2 border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t('Your Message...')}
                required
                className="w-full p-2 border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>
            <div>
              <Button
                variant="contained"
                type='submit'
                style={{ backgroundColor: '#1F0567', color: '#ffffff'}}
                disabled={loading}
                className="sm:w-[50%] w-auto" 
                endIcon={loading ? <CircularProgress size={24} color="inherit" /> : <ArrowRightAltIcon />}
              >
                {t('Submit')}
              </Button>
            </div>
          </form>
        </div>

        <div className={`w-full lg:w-1/2 mt-0 lg:-mt-11 ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}>
          <MapEvents />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
