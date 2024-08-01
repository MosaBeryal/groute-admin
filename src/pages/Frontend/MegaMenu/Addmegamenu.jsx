import { useState } from "react";
import { toast } from "react-toastify";
import newRequest from "../../../../utils/userRequest";
import { useTranslation } from "react-i18next";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Addmegamenu = ({ isVisible, setVisibility, refreshBrandData }) => {
  const [name_en, setname_en] = useState("");
  const [name_ar, setname_ar] = useState("");

  const { t, i18n } = useTranslation();
  const handleCloseCreatePopup = () => {
    setVisibility(false);
  };

  const handleAddCompany = async () => {
    // console.log(name_en);
    //  integrate the post api in try catch blcck
    try {
      const response = await newRequest.post("/createmega_menus/", {
        name_en: name_en,
        name_ar: name_ar,
        status: 1,
      });

      toast.success(`Mega Menu ${name_en} has been added successfully.`);

      // console.log(response.data);
      refreshBrandData();
      handleCloseCreatePopup();
    } catch (error) {
      toast.error(error?.response?.data?.error || error?.response?.data?.message || "Error");
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
      {/* create the post api popup */}
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
                  {t("Add")} {t("Menu")}{" "}
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
                        className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${
                            i18n.language === "ar" ? "text-end" : "text-start"
                          }`}
                        placeholder={`${t("Enter")}${t("Name[Arabic]")}`}
                        onChange={(value) => setname_ar(value)}
                      />
                  </div>
                </div>

                <div className="w-full flex justify-center items-center gap-8 mt-5">
                  <button
                    type="button"
                    className="px-5 py-2 w-[30%] rounded-sm bg-primary text-white font-body text-sm"
                    onClick={handleCloseCreatePopup}
                  >
                    {t("Close")}
                  </button>
                  <button
                    type="button"
                    onClick={handleAddCompany}
                    className="px-5 py-2 rounded-sm w-[70%] bg-secondary text-white font-body text-sm ml-2"
                  >
                    {t("Add")} {t("Menu")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Addmegamenu;
