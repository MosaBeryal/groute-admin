import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DropDownSelection from '../DropDownSelection/DropDownSelection';
import newRequest from '../../../utils/userRequest';
import { BounceLoader } from 'react-spinners';
import { useTranslation } from 'react-i18next';
import IndustrySolutions from '../IndustrySolutions/IndustrySolutions';
import GDSN from '../GDSN/GDSN';
import Gs1Traceability from '../Gs1Traceability/Gs1Traceability';
import Gs1Barcodes from '../Gs1Barcodes/Gs1Barcodes';
import BarcodeServices from '../BarcodeServices/BarcodeServices';
import DigitalLinkTemplate from '../DigitalLinkTemplate/DigitalLinkTemplate';
import { toast } from 'react-toastify';
import BarcodeServicesTemplate5 from '../BarcodeServicesTemplate5/BarcodeServicesTemplate5';

const BlogPages = () => {
  const { id } = useParams();
  // console.log(id);
  const [pageData, setPageData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { t, i18n } = useTranslation();

  const componentMapping = {
    // template1 
    'template1': GDSN,
    // template2
    'template2': BarcodeServices,
    // template3
    'template3': Gs1Traceability,
    // template4
    'template4': Gs1Barcodes,
    // template5
    'template5': BarcodeServicesTemplate5,
    // template6
    'template6': IndustrySolutions,
    // template7
    'template7': DigitalLinkTemplate,
    // Add other template-component mappings here
  };
  
  const handleGetPageData = async () => {
    setIsLoading(true);
    try {
      const res = await newRequest.get(`/blogs?slug=${id}&language=en`);  // Update the API endpoint
      console.log(res?.data);
      setPageData(res?.data);
      setIsLoading(false);
    } 
    catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error?.response?.data?.error || 'Something went wrong');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetPageData();
  }, [id]);


  const templateName = pageData.template?.name || '';
  const ComponentToRender = componentMapping[templateName];

  return (
    <div>
        {isLoading &&

          <div className='loading-spinner-background'
              style={{
                  zIndex: 9999, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed'


              }}
          >
              <BounceLoader
                  size={45}
                  color={"#021F69"}
                  // height={4}
                  loading={isLoading}
              />
          </div>
          }

       <div>
         <DropDownSelection />
       </div>


        <div>
        {ComponentToRender && <ComponentToRender pageData={pageData} />}
        </div>


        {/* <div className='mt-10 mb-10 px-4 md:px-10 lg:px-10 xl:px-36 2xl:px-[270px] 3xl:px-96'>
            {i18n.language === 'ar' && pageData.custom_section_data_ar && (
          <div className="text-right" style={{direction:'rtl'}}   dangerouslySetInnerHTML={{ __html: pageData.custom_section_data_ar }} />
          
        )}

        {i18n.language !== 'ar' && pageData.custom_section_data && (
          <div dangerouslySetInnerHTML={{ __html: pageData.custom_section_data }} />
        )}

      </div> */}
    </div>
  )
}

export default BlogPages
