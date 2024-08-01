import React from 'react';
import DataQualityManagement from '../../../Images/helpresources/DataQualityManagement.png';
import trainingandsupport from '../../../Images/helpresources/trainingandsupport.png';
import userguides from '../../../Images/helpresources/userguides.png';
import NPCproductcertified from '../../../Images/helpresources/NPCproductcertified.png';
import logintoNPC from '../../../Images/helpresources/logintoNPC.png';
import registertoNPCtoday from '../../../Images/helpresources/registertoNPCtoday.png';
import { useTranslation } from 'react-i18next';
// import newRequest from '../../../utils/userRequest'
// import imageLiveUrl from '../../../utils/urlConverter/imageLiveUrl';
// import { useQuery } from 'react-query';

const HelpResources = () => {
  const { t } = useTranslation();
  
  // const { isLoading, error, data: featuresData } = useQuery("fetchAllFeatures", fetchFeaturesData);

  // async function fetchFeaturesData() {
  //   const response = await newRequest.get("/getAllfeatured_articales");
  //   return response?.data.filter(item => item.status === 1) || [];
  // }

  return (
    <div className='bg-dashboard-color h-auto'>
      <div className='text-start pt-3 sm:px-12 px-3'>
        <h2 className="text-2xl font-semibold font-sans text-secondary mb-4">
          {t('Information and Help Resources')}
        </h2>
      </div>
      <div className='sm:py-12 py-6'>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 sm:px-10 px-3">
        {/* First Card */}
        {/* {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          ""
        ) : (
          featuresData.map((item) => (
          <div className={`h-auto w-full border border-gray-300 rounded-md shadow-lg transition-transform transform hover:scale-110 flex ${i18n.language === 'ar'? 'text-end' : 'text-start'}`}>
            <img src={imageLiveUrl(item?.image)} alt="Barcode Verification" className="w-1/2 h-full object-cover rounded-l-md"/>
            <div className="p-4 w-2/3 bg-white">
              <h3 className="text-xl font-semibold font-sans text-secondary">{i18n.language === 'ar' ? item?.title_ar : item?.title}</h3>
              <Link to={`/${item?.link}`} className="text-primary font-sans hover:underline cursor-pointer">{t('Read more')} →</Link>
            </div>
          </div>
         ))
        )} */}

        <div className="bg-white border border-gray-300 rounded-lg shadow-md transition-transform transform hover:scale-105 flex items-center p-5">
          <img src={DataQualityManagement} alt="Data Quality Management" className="w-16 h-16 mr-4"/>
          <h3 className="text-lg font-semibold font-sans text-secondary">Data Quality Management</h3>
        </div>
        
        <div className="bg-white border border-gray-300 rounded-lg shadow-md transition-transform transform hover:scale-105 flex items-center p-5">
          <img src={trainingandsupport} alt="Trainings and Support" className="w-16 h-16 mr-4"/>
          <h3 className="text-lg font-sans font-semibold text-secondary">Trainings and Support</h3>
        </div>
        
        <div className="bg-white border border-gray-300 rounded-lg shadow-md transition-transform transform hover:scale-105 flex items-center p-5">
          <img src={userguides} alt="User Guides" className="w-16 h-16 mr-4"/>
          <h3 className="text-lg font-semibold font-sans text-secondary">User Guides</h3>
        </div>

        <div className="bg-white border border-gray-300 rounded-lg shadow-md transition-transform transform hover:scale-105 flex items-center p-5">
          <img src={NPCproductcertified} alt="NPC Products Certified" className="w-16 h-16 mr-4"/>
          <h3 className="text-lg font-semibold font-sans text-secondary">NPC Products Certified</h3>
        </div>

        <div className="bg-white border border-gray-300 rounded-lg shadow-md transition-transform transform hover:scale-105 flex items-center p-5">
          <img src={logintoNPC} alt="Log in to NPC" className="w-16 h-16 mr-4"/>
          <h3 className="text-lg font-sans font-semibold text-secondary">Log in to NPC</h3>
        </div>

        <div className="bg-white border border-gray-300 rounded-lg shadow-md transition-transform transform hover:scale-105 flex items-center p-5">
          <img src={registertoNPCtoday} alt="Register to NPC today" className="w-16 h-16 mr-4"/>
          <h3 className="text-lg font-semibold font-sans text-secondary">Register to NPC today</h3>
        </div>
      </div>
      </div>
    </div>
  )
}

export default HelpResources;
