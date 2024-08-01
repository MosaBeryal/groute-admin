import React, { useState } from "react";
import { toast } from "react-toastify";
import newRequest from "../../../../utils/userRequest";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import SendIcon from "@mui/icons-material/Send";
import { useTranslation } from "react-i18next";
import ReactQuill from "react-quill";

const Updatemegamenu = ({ isVisible, setVisibility, refreshBrandData }) => {
  // get this session data
  const updateBrandData = JSON.parse(sessionStorage.getItem("updatemengamenu"));
  // console.log(updateBrandData)
  const [name_en, setname_en] = useState(updateBrandData?.name_en || "");
  const [name_ar, setname_ar] = useState(updateBrandData?.name_ar || "");
  const [status, setstatus] = useState(updateBrandData?.status || 0);
  const [loading, setLoading] = useState(false);

  const handleCloseUpdatePopup = () => {
    setVisibility(false);
  };
  const { t, i18n } = useTranslation();

  const handleUpdateBrand = async () => {
    setLoading(true);

    try {
      const response = await newRequest.put(
        `/updatemega_menus/${updateBrandData?.id}`,
        {
          name_en: name_en,
          name_ar: name_ar,
          status: Number(status),
        }
      );

      toast.success(
        response?.data?.message || "Mega Menu updated successfully");

      // console.log(response.data);
      refreshBrandData();
      handleCloseUpdatePopup();
    } catch (error) {
      toast.error(error?.response?.data?.error || error?.response?.data?.message || "Something went wrong!");

      // console.log(error);
    } finally {
      setLoading(false);
    }
  };


  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
      [{ color: [] }],
      [{ background: [] }],
      [{ font: [] }],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "color",
    "background",
  ];

  return (
    <div>
      {isVisible && (
        <div className="popup-overlay z-50">
          <div className="popup-container h-auto sm:w-[45%] w-full">
            <div className="popup-form w-full" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
              <form className="w-full">
                <h2
                  className={`text-secondary font-sans font-semibold text-2xl ${
                    i18n.language === "ar" ? "text-end" : "text-start"
                  }`}
                >
                  {t("Edit")} {t("Menu")}{" "}
                </h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label
                      htmlFor="field1"
                      className={`text-secondary  ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    >
                      {t("Menu")} {t("Name[English]")}
                    </label>
                    <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        value={name_en}
                        className={`border-1 w-full rounded-sm border-[#8E9CAB] mb-3 ${
                            i18n.language === "ar" ? "text-end" : "text-start"
                          }`}
                        placeholder={`${t("Enter")}${t("Name[English]")}`}
                        onChange={(value) => setname_en(value)}
                      />
                  </div>
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label
                      htmlFor="field1"
                      className={`text-secondary  ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    >
                      {t("Menu")} {t("Name[Arabic]")}
                    </label>
                    <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        value={name_ar}
                        className={`border-1 w-full rounded-sm border-[#8E9CAB] mb-3 ${
                            i18n.language === "ar" ? "text-end" : "text-start"
                          }`}
                        placeholder={`${t("Enter")}${t("Name[Arabic]")}`}
                        onChange={(value) => setname_ar(value)}
                      />
                  </div>
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label
                      htmlFor="status"
                      className={`text-secondary  ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    >
                      {t("Status")}
                    </label>
                    <select
                      id="status"
                      value={status}
                      onChange={(e) => setstatus(e.target.value)}
                      className={`border-[1px] w-full rounded-sm border-gray-400 p-2 mb-3 ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    >
                      <option value="0">{t("Inactive")}</option>
                      <option value="1">{t("Active")}</option>
                    </select>
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
                    {t("Update")} {t("Menu")}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Updatemegamenu;
