import { useState } from "react";
import { useTranslation } from "react-i18next";
import traceabilityabout from "../../../../Images/NewUI/traceabilityabout.png";
import gdsnimage1 from "../../../../Images/NewUI/gdsnimage1.webp";
import gdsnimage2 from "../../../../Images/NewUI/gdsnimage2.webp";
import { Button } from "@mui/material";
import ReactQuill from "react-quill";
import CircularProgress from "@mui/material/CircularProgress";
import newRequest from "../../../../UserRequest";
import { toast } from "react-toastify";
import i18n from "../../../../i18n"; 

const AddTemplate1 = ({ isVisible, setVisibility, refreshTemplate1Data }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const selectedTemplate = JSON.parse(
    sessionStorage.getItem("selectedTemplate")
  );

  const [hero_background, setHeroBackground] = useState(null);
  const [section_image2, setSectionImage2] = useState(null);
  const [section_image3, setSectionImage3] = useState(null);

  const initialState = {
    name: "",
    name_ar: "",
    slug: "",
    seo_description: "",
    seo_description_ar: "",
    status: 1,
    sections: [
      {
        name: "Hero sections",
        name_ar: "قسم البطل",
        contents: [
          {
            type: "hero_section",
            data: {
              heading: "",
              description: "",
              button_text: "",
              button_navigation: "",
            },

            data_ar: {
              heading: "",
              description: "",
              button_text: "",
              button_navigation: "",
            },
          },
        ],
      },
      {
        name: "Main Content",
        name_ar: "المحتوى الرئيسي",
        contents: [
          {
            type: "main_content",
            data: {
              description: "",
              button_text: "",
              button_navigation: "",
            },
            data_ar: {
              description: "",
              button_text: "",
              button_navigation: "",
            },
          },
        ],
      },
      {
        name: "last Content",
        name_ar: "فرص",
        contents: [
          {
            type: "last_content",
            data: {
              description: "",
            },
            data_ar: {
              description: "",
            },
          },
        ],
      },
    ],
  };

  const [state, setState] = useState(initialState);

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

  const handleFileChange = (e, fileField) => {
    const file = e.target.files[0];
    if (fileField === "hero_background") {
      setHeroBackground(file);
    }
    if (fileField === "section_2_image") {
      setSectionImage2(file);
    }
    if (fileField === "section_3_image") {
      setSectionImage3(file);
    }
  };

  const handleChange = (field, value) => {
    const newState = { ...state };
    const fieldParts = field.split(".");
    let currentLevel = newState;
    for (let i = 0; i < fieldParts.length - 1; i++) {
      currentLevel = currentLevel[fieldParts[i]];
    }
    currentLevel[fieldParts[fieldParts.length - 1]] = value;
    setState(newState);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();

    formData.append("name", state.name);
    formData.append("name_ar", state.name_ar);
    formData.append("slug", state.slug);
    formData.append("seo_description", state.seo_description);
    formData.append("seo_description_ar", state.seo_description_ar);
    formData.append("status", 1);
    formData.append("template_id", selectedTemplate?.id);

    state.sections.forEach((section, sectionIndex) => {
      formData.append(`sections[${sectionIndex}][name]`, section.name);
      formData.append(`sections[${sectionIndex}][name_ar]`, section.name_ar);
      section.contents.forEach((content, contentIndex) => {
        formData.append(
          `sections[${sectionIndex}][contents][${contentIndex}][type]`,
          content.type
        );
        Object.keys(content.data).forEach((key) => {
          formData.append(
            `sections[${sectionIndex}][contents][${contentIndex}][data][${key}]`,
            content.data[key]
          );
        });
        Object.keys(content.data_ar).forEach((key) => {
          formData.append(
            `sections[${sectionIndex}][contents][${contentIndex}][data_ar][${key}]`,
            content.data_ar[key]
          );
        });
      });
    });

    if (hero_background) {
      formData.append("hero_background", hero_background);
      formData.append(
        "sections[0][contents][0][data][fileField]",
        "hero_background"
      );
    }

    if (section_image2) {
      formData.append("section_2_image", section_image2);
      formData.append(
        "sections[1][contents][0][data][fileField]",
        "section_2_image"
      );
    }

    if (section_image3) {
      formData.append("section_3_image", section_image3);
      formData.append(
        "sections[2][contents][0][data][fileField]",
        "section_3_image"
      );
    }

    try {
      const response = await newRequest.post(
        `/blogs?template_name=${selectedTemplate?.name}`,
        // `/blogs?template_name=template1`,
        formData
      );
      toast.success("Blog created successfully");
      handleCloseCreatePopup();
      refreshTemplate1Data();
      setLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to create template");
      setLoading(false);
    }
  };

  const handleCloseCreatePopup = () => {
    setVisibility(false);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

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
                  className={`flex justify-between w-full mb-3 ${
                    i18n.language === "ar" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <h2
                    className={`text-secondary font-sans font-semibold text-2xl ${
                      i18n.language === "ar" ? "text-end" : "text-start"
                    }`}
                  >
                    {t("Add")} {t("Template1")}
                  </h2>
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
                {/* <div className="flex justify-end mb-4">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() =>
                      changeLanguage(i18n.language === "en" ? "ar" : "en")
                    }
                  >
                    {i18n.language === "en"
                      ? "Switch to Arabic"
                      : "Switch to English"}
                  </button>
                </div> */}
                <div className="py-3 shadow-lg px-3 mb-3">
                  <div className="flex flex-col sm:gap-8 gap-3 sm:flex-row sm:justify-between sm:mt-0 mt-4">
                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                      <label
                        htmlFor="fields1"
                        className={`text-secondary  ${
                          i18n.language === "ar" ? "text-end" : "text-start"
                        }`}
                      >
                        {t("Template Name")}
                      </label>
                      <input
                        type="text"
                        id="fields1"
                        className={`border-[1px] rounded-sm border-[#8E9CAB] p-2 ${
                          i18n.language === "ar" ? "text-end" : "text-start"
                        }`}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder={`${t("Enter")} ${t("Template Name")}`}
                      />
                    </div>
                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0 sm:h-16 h-auto">
                      <label
                        htmlFor="fields2"
                        className={`text-secondary  ${
                          i18n.language === "ar" ? "text-end" : "text-start"
                        }`}
                      >
                        {t("Temaplate")} {t("Name[Arabic]")}
                      </label>
                      <input
                        type="text"
                        id="fields2"
                        className={`border-[1px] w-full rounded-sm border-[#8E9CAB] p-2 ${
                          i18n.language === "ar" ? "text-end" : "text-start"
                        }`}
                        onChange={(e) =>
                          handleChange("name_ar", e.target.value)
                        }
                        placeholder={`${t("Enter")} ${t("Temaplate")} ${t(
                          "Name[Arabic]"
                        )}`}
                      />
                    </div>
                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0 sm:h-16 h-auto">
                      <label
                        htmlFor="fields3"
                        className={`text-secondary  ${
                          i18n.language === "ar" ? "text-end" : "text-start"
                        }`}
                      >
                        {t("Slug")}
                      </label>
                      <input
                        type="text"
                        id="fields3"
                        className={`border-[1px] w-full rounded-sm border-[#8E9CAB] p-2 ${
                          i18n.language === "ar" ? "text-end" : "text-start"
                        }`}
                        onChange={(e) => handleChange("slug", e.target.value)}
                        placeholder={`${t("Enter")} ${t("Slug")}`}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:gap-8 gap-3 sm:flex-row sm:justify-between sm:mt-0 mt-4">
                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0 sm:h-auto h-auto mt-4">
                      <label
                        htmlFor="seo_description"
                        className={`text-secondary  ${
                          i18n.language === "ar" ? "text-end" : "text-start"
                        }`}
                      >
                        {t("SEO Description")}
                      </label>
                      <textarea
                        type="text"
                        id="seo_description"
                        className={`border-[1px] w-full rounded-sm border-[#8E9CAB] p-2 ${
                          i18n.language === "ar" ? "text-end" : "text-start"
                        }`}
                        onChange={(e) =>
                          handleChange("seo_description", e.target.value)
                        }
                        placeholder={`${t("Enter")} ${t("SEO Description")}`}
                      />
                    </div>
                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0 sm:h-auto h-auto mt-4">
                      <label
                        htmlFor="seo_description_ar"
                        className={`text-secondary  ${
                          i18n.language === "ar" ? "text-end" : "text-start"
                        }`}
                      >
                        {t("SEO Description[Arabic]")}
                      </label>
                      <textarea
                        type="text"
                        id="seo_description_ar"
                        className={`border-[1px] w-full rounded-sm border-[#8E9CAB] p-2 ${
                          i18n.language === "ar" ? "text-end" : "text-start"
                        }`}
                        onChange={(e) =>
                          handleChange("seo_description_ar", e.target.value)
                        }
                        placeholder={`${t("Enter")} ${t(
                          "SEO Description[Arabic]"
                        )}`}
                      />
                    </div>
                  </div>
                  <div className="font-body sm:text-base text-sm flex flex-col gap-0 mt-4 mb-3">
                    <label
                      htmlFor="fields4"
                      className={`text-secondary  ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    >
                      {t("Status")}
                    </label>
                    <select
                      id="fields4"
                      className={`border-[1px] rounded-sm border-[#8E9CAB] p-2 ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                      onChange={(e) => handleChange("status", e.target.value)}
                    >
                      <option value="draft">{t("active")}</option>
                      <option value="published">{t("inactive")}</option>
                    </select>
                  </div>
                </div>
                <div className="w-full pb-8">
                  <div className="bg-[#fbb034] flex flex-wrap justify-start">
                    <div className="w-full md:w-1/2 p-4 px-3">
                      <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        className="px-3 py-3 bg-white text-black w-full"
                        placeholder="Write description here.."
                        onChange={(value) =>
                          handleChange(
                            "sections.0.contents.0.data.description",
                            value
                          )
                        }
                      />
                      <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        className="px-3 py-3 bg-white text-black w-full"
                        placeholder="اكتب الوصف هنا .."
                        onChange={(value) =>
                          handleChange(
                            "sections.0.contents.0.data_ar.description",
                            value
                          )
                        }
                      />
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
                      {hero_background ? (
                        <img
                          src={URL.createObjectURL(hero_background)}
                          className="w-full h-full object-cover"
                          alt="Selected"
                        />
                      ) : (
                        <img
                          src={traceabilityabout}
                          className="w-full h-full object-cover"
                          alt="Slide 1"
                        />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "hero_background")}
                        style={{ display: "none" }}
                        id="heroBackgroundInput"
                      />
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "#cd3c0d",
                          color: "#ffffff",
                          marginTop: "1rem",
                        }}
                        onClick={() =>
                          document.getElementById("heroBackgroundInput").click()
                        }
                      >
                        {t("Select Image")}
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="h-auto w-full px-4 md:px-12 mt-8">
                  <div className="flex flex-wrap justify-center items-center gap-6 md:gap-0 md:mb-20 mb-8">
                    <div className="w-full md:w-1/2 flex flex-col md:gap-9 gap-3">
                      <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        className="font-sans text-base text-gray-600 h-auto bg-white"
                        placeholder="Write description here.."
                        onChange={(value) =>
                          handleChange(
                            "sections.1.contents.0.data.description",
                            value
                          )
                        }
                      />
                      <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        className="font-sans text-base text-gray-600 h-auto bg-white"
                        placeholder="اكتب الوصف هنا .."
                        onChange={(value) =>
                          handleChange(
                            "sections.1.contents.0.data_ar.description",
                            value
                          )
                        }
                      />
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
                      {section_image2 ? (
                        <img
                          src={URL.createObjectURL(section_image2)}
                          alt="Selected"
                        />
                      ) : (
                        <img src={gdsnimage1} alt="Selected" />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "section_2_image")}
                        style={{ display: "none" }}
                        id="fileInput3"
                      />
                      <Button
                        variant="contained"
                        component="label"
                        style={{ marginTop: "1rem" }}
                        onClick={() =>
                          document.getElementById("fileInput3").click()
                        }
                      >
                        {t("Select Image")}
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="h-auto w-full px-4 md:px-12 mt-8">
                  <div className="flex flex-wrap justify-center items-center gap-6 md:gap-0 md:mb-20 mb-8">
                    <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
                      {section_image3 ? (
                        <img
                          src={URL.createObjectURL(section_image3)}
                          alt="Selected"
                        />
                      ) : (
                        <img src={gdsnimage2} alt="Selected" />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "section_3_image")}
                        style={{ display: "none" }}
                        id="fileInput4"
                      />
                      <Button
                        variant="contained"
                        component="label"
                        style={{ marginTop: "1rem" }}
                        onClick={() =>
                          document.getElementById("fileInput4").click()
                        }
                      >
                        {t("Select Image")}
                      </Button>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col md:gap-9 gap-3">
                      <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        className="font-sans text-base text-gray-600 h-auto bg-white"
                        placeholder="Write description here.."
                        onChange={(value) =>
                          handleChange(
                            "sections.2.contents.0.data.description",
                            value
                          )
                        }
                      />
                      <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        className="font-sans text-base text-gray-600 h-auto bg-white"
                        placeholder="اكتب الوصف هنا .."
                        onChange={(value) =>
                          handleChange(
                            "sections.2.contents.0.data_ar.description",
                            value
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-between items-center gap-8 mt-5">
                  <button
                    type="button"
                    className="px-16 py-2 rounded-sm bg-primary text-white font-body text-sm"
                    onClick={handleCloseCreatePopup}
                  >
                    {t("Close")}
                  </button>
                  <Button
                    variant="contained"
                    disabled={loading}
                    style={{
                      backgroundColor: "#cd3c0d",
                      color: "#ffffff",
                    }}
                    endIcon={
                      loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : null
                    }
                    onClick={handleSubmit}
                  >
                    {t("Add Template")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTemplate1;
