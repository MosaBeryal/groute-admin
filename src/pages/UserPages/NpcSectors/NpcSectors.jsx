import React from 'react'
// import newRequest from '../../../utils/userRequest';
// import { useQuery } from 'react-query';
// import imageLiveUrl from '../../../utils/urlConverter/imageLiveUrl';
import retailsector from '../../../Images/npcsector/retailsector.png';
import npchealth from '../../../Images/npcsector/npchealth.png';
import npcgovernment from '../../../Images/npcsector/npcgovernment.png';
import gdsn from '../../../Images/npcsector/gdsn.png';
import npclearning from '../../../Images/npcsector/npclearning.png';
import npcother from '../../../Images/npcsector/npcother.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NpcSectors = () => {
  const { t, i18n } = useTranslation();

  // event Api
  // const { isLoading, error, data: eventsData } = useQuery("fetchAllUpcomingEvents", fetchUpcomingEventsData);

  // async function fetchUpcomingEventsData() {
  //   const response = await newRequest.get("/getAllupcoming_events");
  //   return response?.data.filter(item => item.status === 1) || [];
  // }

  return (
    <div>
       <div className={`p-8 mt-5 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
        <div className="">
            <h2 className="sm:text-3xl text-lg font-bold font-sans text-secondary">
              {t('Over 2,280 Companies Subscribed, 1.5 Million+ GTINs Registered, and 3 Million+ Price Records Maintained')}
            </h2>
        </div>
      </div>

      <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 gap-7 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 sm:px-8 px-5 sm:mb-10 mb-3">
          {/* first Card */}
          {/* {isLoading ? (
          <div>Loading...</div>
            ) : error ? (
              ""
            ) : (
            eventsData.map((item) => (
            <div className={`h-auto w-full py-1 border border-gray-300 rounded-md shadow-lg transition-transform transform hover:scale-110 ${i18n.language === 'ar'? 'text-end' : 'text-start'}`}>
                <img
                  src={imageLiveUrl(item?.image)}
                  alt=""
                  className="w-full h-44 -mt-1"
                />
              <div className="w-full">
                <div
                  className={`px-3 flex flex-col gap-2 pb-10`}
                >
                  <Link to={`/${item?.link}`} className='font-semibold text-secondary sm:text-lg text-base hover:text-primary mt-3'>
                    {i18n.language === 'ar' ? item?.title_ar : item?.title}
                  </Link>
                  <p className='text-secondary sm:text-lg text-base'>
                    {i18n.language === 'ar' ? item?.description_ar : item?.description}
                  </p>
                </div>
              </div>
            </div>
            ))
          )} */}

            {/* second Card */}
            <div className="h-auto w-full py-1 border border-gray-300 rounded-md shadow-lg transition-transform transform hover:scale-110">
              <div className="relative w-full pb-[56.25%]"> {/* 16:9 Aspect Ratio */}
                <img
                  src={retailsector}
                  alt="NPC in Retail Sectors"
                  className="absolute top-0 left-0 -mt-1 w-full h-full object-cover"
                />
              </div>
              <div className="w-full">
                <div className="px-6 py-6 flex flex-col gap-2">
                  <p className="font-semibold font-sans text-secondary sm:text-lg text-base">
                    NPC in Retail Sectors
                  </p>
                </div>
              </div>
            </div>

            {/* third Card */}
            <div className="h-auto w-full py-1 border border-gray-300 rounded-md shadow-lg transition-transform transform hover:scale-110">
              <div className="relative w-full pb-[56.25%]"> {/* 16:9 Aspect Ratio */}
                <img
                  src={npchealth}
                  alt="NPC in Retail Sectors"
                  className="absolute top-0 left-0 -mt-1 w-full h-full object-cover"
                />
              </div>
              <div className="w-full">
                <div className="px-6 py-6 flex flex-col gap-2">
                  <p className="font-semibold font-sans text-secondary sm:text-lg text-base">
                    NPC in Healthcare Sectors
                  </p>
                </div>
              </div>
            </div>

            {/* fourth Card */}
            <div className="h-auto w-full py-1 border border-gray-300 rounded-md shadow-lg transition-transform transform hover:scale-110">
              <div className="relative w-full pb-[56.25%]"> {/* 16:9 Aspect Ratio */}
                <img
                  src={npcgovernment}
                  alt="NPC in Retail Sectors"
                  className="absolute top-0 left-0 -mt-1 w-full h-full object-cover"
                />
              </div>
              <div className="w-full">
                <div className="px-6 py-6 flex flex-col gap-2">
                  <p className="font-semibold font-sans text-secondary sm:text-lg text-base">
                    NPC in Government Sectors
                  </p>
                </div>
              </div>
            </div>

            {/* fifth Card */}
            <div className="h-auto w-full py-1 border border-gray-300 rounded-md shadow-lg transition-transform transform hover:scale-110">
              <div className="relative w-full pb-[56.25%]"> {/* 16:9 Aspect Ratio */}
                <img
                  src={gdsn}
                  alt="NPC in Retail Sectors"
                  className="absolute top-0 left-0 -mt-1 w-full h-full object-cover"
                />
              </div>
              <div className="w-full">
                <div className="px-6 py-6 flex flex-col gap-2">
                  <p className="font-semibold font-sans text-secondary sm:text-lg text-base">
                    GDSN Cerified Data Pool
                  </p>
                </div>
              </div>
            </div>

            {/* sixth Card */}
            <div className="h-auto w-full py-1 border border-gray-300 rounded-md shadow-lg transition-transform transform hover:scale-110">
              <div className="relative w-full pb-[56.25%]"> {/* 16:9 Aspect Ratio */}
                <img
                  src={npclearning}
                  alt="NPC in Retail Sectors"
                  className="absolute top-0 left-0 -mt-1 w-full h-full object-cover"
                />
              </div>
              <div className="w-full">
                <div className="px-6 py-6 flex flex-col gap-2">
                  <p className="font-semibold font-sans text-secondary sm:text-lg text-base">
                    NPC Learnings
                  </p>
                </div>
              </div>
            </div>

            {/* seventh Card */}
            <div className="h-auto w-full py-1 border border-gray-300 rounded-md shadow-lg transition-transform transform hover:scale-110">
              <div className="relative w-full pb-[56.25%]"> {/* 16:9 Aspect Ratio */}
                <img
                  src={npcother}
                  alt="NPC in Retail Sectors"
                  className="absolute top-0 left-0 -mt-1 w-full h-full object-cover"
                />
              </div>
              <div className="w-full">
                <div className="px-6 py-6 flex flex-col gap-2">
                  <p className="font-semibold font-sans text-secondary sm:text-lg text-base">
                    NPC in Other Sectors
                  </p>
                </div>
              </div>
            </div>
      </div>
    </div>
  )
}

export default NpcSectors