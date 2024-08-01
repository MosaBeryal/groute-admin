import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../../../i18n";
import { BounceLoader } from "react-spinners";
import newRequest from "../../../../UserRequest";
import { toast } from "react-toastify";
import BarcodeServicesTemplate5 from "../../../UserPages/BarcodeServicesTemplate5/BarcodeServicesTemplate5";

const ViewTemplate5PopUp = ({ isVisible, setVisibility, slug }) => {
  const { t } = useTranslation();
  const [viewTemplateData, setViewTemplateData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleCloseCreatePopup = () => {
    setVisibility(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await newRequest.get(`/blogs?slug=${slug}&language=${i18n.language}`);
        setViewTemplateData(res?.data);
      } catch (error) {
        // console.log(error);
        toast.error(error?.response?.data?.message || error?.response?.data?.error || "Something went wrong");
        handleCloseCreatePopup();
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);


  return (
    <div>
      {isVisible && (
        <div className="popup-overlay z-50">
          <div className="popup-container h-auto sm:w-[90%] w-full">
            <div
              className="popup-form w-full"
              style={{ maxHeight: "90vh", overflowY: "auto" }}
            >
              <div className="w-full">
                <div
                  className={`flex justify-end w-full mb-3 ${
                    i18n.language === "ar" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <button
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={handleCloseCreatePopup}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <BounceLoader size={45} color={"#021F69"} loading={isLoading} />
                  </div>
                ) : (
                  viewTemplateData && (
                    <BarcodeServicesTemplate5 pageData={viewTemplateData} />
                  )
                )}

                
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTemplate5PopUp;
