import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import newRequest, { newRequestnpc } from "../../../../utils/userRequest";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import { Autocomplete, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Updatecity = ({ isVisible, setVisibility, refreshBrandData }) => {
  // get this session data
  const updateBrandData = JSON.parse(sessionStorage.getItem("updateBrandData"));
  // console.log(updateBrandData)
  const [name, setname] = useState(updateBrandData?.name || '');
  const [name_ar, setname_ar] = useState(updateBrandData?.name_ar || "");
  const [state_id, setstate_id] = useState(updateBrandData?.state_id || 0);
  const [loading, setLoading] = useState(false);
  const [docuements, setDocuments] = React.useState([])
  const [selectedDocuments, setSelectedDocuments] = useState({
    id: updateBrandData?.state_id || 0,
    name: updateBrandData?.state_name || "",
  });
  const { t, i18n } = useTranslation();
  const handleCloseUpdatePopup = () => {
    setVisibility(false);
  };

  useEffect(() => {
    const getDocuments = async () => {
      try {
        const response = await newRequestnpc.get("/master-data/getAllStates");
        // console.log(response.data);
        setDocuments(response.data);
      } catch (error) {
        // console.log(error);
      }
    };

    getDocuments();

  }, []);

  const handleSelectedDocuments = (event, value) => {
    // console.log(value?.id);
    setSelectedDocuments(value);
  };

  // console.log(selectedDocuments);

  const handleUpdateBrand = async () => {
    setLoading(true);

    try {
      const response = await newRequestnpc.put(`/master-data/updateCities/${updateBrandData?.id}`, {
        name: name,
        name_ar: name_ar,
        state_id: selectedDocuments?.id,
      });

      toast.success(response?.data?.message || `${t('Cities')} ${t('has been')} ${t('Updated Successfully')}.`, {
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
              <form className="w-full">
                <h2
                  className={`text-secondary font-sans font-semibold text-2xl ${
                    i18n.language === "ar" ? "text-end" : "text-start"
                  }`}
                >
                  {t("Edit")} {t("city")}
                </h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label
                      htmlFor="field1"
                      className={`text-secondary  ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    >
                      {t("City")} {t("Name [English]")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                      //   readOnly
                      placeholder={`${t("Enter")} ${t("city")} ${t(
                        "Name [English]"
                      )}`}
                      className={`border w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label
                      htmlFor="field1"
                      className={`text-secondary  ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    >
                      {t("city")} {t("Name Arabic")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name_ar}
                      onChange={(e) => setname_ar(e.target.value)}
                      placeholder={`${t("Enter")} ${t("City")} ${t(
                        "Name Arabic"
                      )}`}
                      className={`border w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label
                      htmlFor="field1"
                      className={`text-secondary  ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    >
                      {t("Select State")}
                    </label>
                    <Autocomplete
                      id="field1"
                      options={docuements}
                      value={selectedDocuments}
                      getOptionLabel={(option) => option?.name || ""}
                      onChange={handleSelectedDocuments}
                      onInputChange={(event, value) => {
                        if (!value) {
                          // perform operation when input is cleared
                          // console.log("Input cleared");
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          autoComplete="off"
                          {...params}
                          InputProps={{
                            ...params.InputProps,
                            className: "text-white",
                            dir: i18n.language === "ar" ? "rtl" : "ltr",
                          }}
                          InputLabelProps={{
                            ...params.InputLabelProps,
                            style: { color: "white" },
                          }}
                          className="bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                          placeholder={`${t("Select State")}`}
                          // required
                        />
                      )}
                      classes={{
                        endAdornment: "text-white",
                      }}
                      sx={{
                        "& .MuiAutocomplete-endAdornment": {
                          color: "white",
                        },
                      }}
                    />
                  </div>
                </div>

                <div className="w-full flex justify-center items-center gap-8 mt-5">
                  <button
                    type="button"
                    className="px-5 py-2 w-[30%] rounded-sm bg-primary text-white font-body text-sm"
                    onClick={handleCloseUpdatePopup}
                  >
                    {t("Close")}
                  </button>

                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#021F69", color: "#ffffff" }}
                    onClick={handleUpdateBrand}
                    disabled={loading}
                    className="w-[70%] ml-2"
                    endIcon={
                      loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        <SendIcon />
                      )
                    }
                  >
                    {t("Update")} {t("city")}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Updatecity