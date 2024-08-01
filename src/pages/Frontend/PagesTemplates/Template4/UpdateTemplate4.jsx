import { useEffect, useState } from "react";
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
import imageLiveUrl from "../../../../utils/urlConverter/imageLiveUrl";

const UpdateTemplate4 = ({ isVisible, setVisibility, refreshTemplate4Data }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const selectedTemplate = JSON.parse(sessionStorage.getItem("selectedTemplate"));

  const updateTemplateData = JSON.parse(sessionStorage.getItem("updateTemplate"));

  const [newValue, setNewValue] = useState(null);
  const [hero_background, setHeroBackground] = useState(null);
  const [section_image2, setSectionImage2] = useState(null);
  const [section_image3, setSectionImage3] = useState(null);
  const [state, setState] = useState(null);

  const handleGetPageData = async () => {
    setLoading(true);
    try {
      const res = await newRequest.get(`/blogs?slug=${updateTemplateData?.slug}&language=en`);
      console.log(res?.data);
      setNewValue(res?.data);
      setState({
        name: res.data.name,
        name_ar: res.data.name_ar,
        slug: res.data.slug,
        seo_description: res.data.seo_description,
        seo_description_ar: res.data.seo_description_ar,
        status: res.data.status,
        sections: res.data.sections.map((section) => ({
          id: section.id,
          name: section.name,
          name_ar: section.name_ar,
          order: section.order,
          contents: section.contents.map((content) => ({
            id: content.id,
            type: content.type,
            data: content.data,
            data_ar: content.data_ar,
          })),
        })),
      });
      setLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.response?.data?.error || "Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetPageData();
  }, []);

  useEffect(() => {
    console.log(state);
  }, [state]);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
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

    formData.append("id", newValue.id);
    formData.append("name", state.name);
    formData.append("name_ar", state.name_ar);
    formData.append("slug", state.slug);
    formData.append("seo_description", state.seo_description);
    formData.append("seo_description_ar", state.seo_description_ar);
    formData.append("status", state.status);
    formData.append("template_id", selectedTemplate?.id);

    state.sections.forEach((section, sectionIndex) => {
      formData.append(`sections[${sectionIndex}][id]`, section.id);
      formData.append(`sections[${sectionIndex}][name]`, section.name);
      formData.append(`sections[${sectionIndex}][name_ar]`, section.name_ar);
      formData.append(`sections[${sectionIndex}][order]`, section.order);
      section.contents.forEach((content, contentIndex) => {
        formData.append(
          `sections[${sectionIndex}][contents][${contentIndex}][id]`,
          content.id
        );
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
      formData.append("sections[0][contents][0][data][fileField]", "hero_background");
    }

    if (section_image2) {
      formData.append("section_2_image", section_image2);
      formData.append("sections[1][contents][0][data][fileField]", "section_2_image");
    }

    if (section_image3) {
      formData.append("section_3_image", section_image3);
      formData.append("sections[2][contents][0][data][fileField]", "section_3_image");
    }

    try {
      const response = await newRequest.put(`/blogs?template_name=${selectedTemplate?.name}`, formData);
      toast.success("Blog updated successfully");
      handleCloseCreatePopup();
      refreshTemplate4Data();
      setLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to update template");
      setLoading(false);
    }
  };

  const handleCloseCreatePopup = () => {
    setVisibility(false);
  };

  if (!newValue || !state) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isVisible && (
        <div className="popup-overlay z-50">
          <div className="popup-container h-auto sm:w-[90%] w-full">
            <div className="popup-form w-full" style={{ maxHeight: "90vh", overflowY: "auto" }}>
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
                    {t("Update")} {t("Template4")}
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="py-3 shadow-lg px-3 mb-3">
                  <div className="flex flex-col sm:gap-8 gap-3 sm:flex-row sm:justify-between sm:mt-0 mt-4">
                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                      <label
                        htmlFor="fields1"
                        className={`text-secondary ${i18n.language === "ar" ? "text-end" : "text-start"}`}
                      >
                        {t("Template Name")}
                      </label>
                      <input
                        type="text"
                        id="fields1"
                        className={`border-1 rounded-sm border-[#8E9CAB] p-2 ${
                          i18n.language === "ar" ? "text-end" : "text-start"
                        }`}
                        value={state.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder={`${t("Enter")} ${t("Template Name")}`}
                      />
                    </div>
                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0 sm:h-16 h-auto">
                      <label
                        htmlFor="fields2"
                        className={`text-secondary ${i18n.language === "ar" ? "text-end" : "text-start"}`}
                      >
                        {t("Template Name[Arabic]")}
                      </label>
                      <input
                        type="text"
                        id="fields2"
                        className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 ${
                          i18n.language === "ar" ? "text-end" : "text-start"
                        }`}
                        value={state.name_ar}
                        onChange={(e) => handleChange("name_ar", e.target.value)}
                        placeholder={`${t("Enter")} ${t("Template Name[Arabic]")}`}
                      />
                    </div>
                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0 sm:h-16 h-auto">
                      <label
                        htmlFor="fields3"
                        className={`text-secondary ${i18n.language === "ar" ? "text-end" : "text-start"}`}
                      >
                        {t("Slug")}
                      </label>
                      <input
                        type="text"
                        id="fields3"
                        className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 ${
                          i18n.language === "ar" ? "text-end" : "text-start"
                        }`}
                        value={state?.slug}
                        onChange={(e) => handleChange("slug", e.target.value)}
                        placeholder={`${t("Enter")} ${t("Slug")}`}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:gap-8 gap-3 sm:flex-row sm:justify-between sm:mt-0 mt-4">
                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0 sm:h-auto h-auto mt-4">
                      <label
                        htmlFor="seo_description"
                        className={`text-secondary ${i18n.language === "ar" ? "text-end" : "text-start"}`}
                      >
                        {t("SEO Description")}
                      </label>
                      <textarea
                        type="text"
                        id="seo_description"
                        className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 ${
                          i18n.language === "ar" ? "text-end" : "text-start"
                        }`}
                        value={state.seo_description}
                        onChange={(e) => handleChange("seo_description", e.target.value)}
                        placeholder={`${t("Enter")} ${t("SEO Description")}`}
                      />
                    </div>
                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0 sm:h-auto h-auto mt-4">
                      <label
                        htmlFor="seo_description_ar"
                        className={`text-secondary ${i18n.language === "ar" ? "text-end" : "text-start"}`}
                      >
                        {t("SEO Description[Arabic]")}
                      </label>
                      <textarea
                        type="text"
                        id="seo_description_ar"
                        className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 ${
                          i18n.language === "ar" ? "text-end" : "text-start"
                        }`}
                        value={state.seo_description_ar}
                        onChange={(e) => handleChange("seo_description_ar", e.target.value)}
                        placeholder={`${t("Enter")} ${t("SEO Description[Arabic]")}`}
                      />
                    </div>
                  </div>
                  <div className="font-body sm:text-base text-sm flex flex-col gap-0 mt-4 mb-3">
                    <label
                      htmlFor="fields4"
                      className={`text-secondary ${i18n.language === "ar" ? "text-end" : "text-start"}`}
                    >
                      {t("Status")}
                    </label>
                    <select
                      id="fields4"
                      className={`border-1 rounded-sm border-[#8E9CAB] p-2 ${i18n.language === "ar" ? "text-end" : "text-start"}`}
                      value={state.status}
                      onChange={(e) => handleChange("status", e.target.value)}
                    >
                      <option value="1">{t("active")}</option>
                      <option value="0">{t("inactive")}</option>
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
                        value={state.sections[0].contents[0].data.description}
                        onChange={(value) => handleChange("sections.0.contents.0.data.description", value)}
                      />
                      <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        className="px-3 py-3 bg-white text-black w-full"
                        placeholder="اكتب الوصف هنا .."
                        value={state.sections[0].contents[0].data_ar.description}
                        onChange={(value) => handleChange("sections.0.contents.0.data_ar.description", value)}
                      />
                      <input
                        style={{ backgroundColor: "#cd3c0d", color: "#ffffff", marginTop: "1rem" }}
                        className="px-4 py-1"
                        placeholder={t("write button text here")}
                        value={state.sections[0].contents[0].data.button_text}
                        onChange={(e) => handleChange("sections.0.contents.0.data.button_text", e.target.value)}
                      />
                      <input
                        style={{ backgroundColor: "#cd3c0d", color: "#ffffff", marginTop: "1rem" }}
                        className="px-4 py-1"
                        placeholder={t("اكتب النص هنا")}
                        value={state.sections[0].contents[0].data_ar.button_text}
                        onChange={(e) => handleChange("sections.0.contents.0.data_ar.button_text", e.target.value)}
                      />
                      <br />
                      <input
                        style={{ backgroundColor: "#cd3c0d", color: "#ffffff", marginTop: "1rem" }}
                        className="px-4 py-1"
                        placeholder={t("write button navigation")}
                        value={state.sections[0].contents[0].data.button_navigation}
                        onChange={(e) => handleChange("sections.0.contents.0.data.button_navigation", e.target.value)}
                      />
                      <input
                        style={{ backgroundColor: "#cd3c0d", color: "#ffffff", marginTop: "1rem" }}
                        className="px-4 py-1"
                        placeholder={t("اكتب التنقل هنا")}
                        value={state.sections[0].contents[0].data_ar.button_navigation}
                        onChange={(e) => handleChange("sections.0.contents.0.data_ar.button_navigation", e.target.value)}
                      />
                    </div>

                    <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
                    {hero_background ? (
                        <img src={URL.createObjectURL(hero_background)} className="w-full h-full object-cover" alt="Selected" />
                      ) : (
                        <img src={imageLiveUrl(state.sections[0].contents[0].data.hero_background)} className="w-full h-full object-cover" alt="Selected" />
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
                        onClick={() => document.getElementById("heroBackgroundInput").click()}
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
                        value={state.sections[1].contents[0].data.description}
                        onChange={(value) => handleChange("sections.1.contents.0.data.description", value)}
                      />
                      <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        className="font-sans text-base text-gray-600 h-auto bg-white"
                        placeholder="اكتب الوصف هنا .."
                        value={state.sections[1].contents[0].data_ar.description}
                        onChange={(value) => handleChange("sections.1.contents.0.data_ar.description", value)}
                      />
                    </div>

                    <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
                    {section_image2 ? (
                        <img src={URL.createObjectURL(section_image2)} alt="Selected" />
                      ) : (
                        <img src={imageLiveUrl(state.sections[1].contents[0].data.section_2_image)} alt="Selected" />
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
                        onClick={() => document.getElementById("fileInput3").click()}
                      >
                        {t("Select Image")}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="w-full py-8 mt-10">
                  <div className="bg-gray-100 flex flex-wrap justify-start">
                    <div className="w-full md:w-1/2 p-4 sm:px-10 px-3">
                      <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        className="font-sans text-base text-gray-600 h-auto bg-white"
                        placeholder={t("Write description here..")}
                        value={state.sections[2].contents[0].data.description}
                        onChange={(value) => handleChange("sections.2.contents.0.data.description", value)}
                      />
                      <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        className="font-sans text-base text-gray-600 h-auto bg-white"
                        placeholder={t("اكتب الوصف هنا ..")}
                        value={state.sections[2].contents[0].data_ar.description}
                        onChange={(value) => handleChange("sections.2.contents.0.data_ar.description", value)}
                      />
                      <input
                        style={{ backgroundColor: "#cd3c0d", color: "#ffffff", marginTop: "1rem" }}
                        className="px-4 py-1"
                        placeholder={t("write button text here")}
                        value={state.sections[2].contents[0].data.button_text}
                        onChange={(e) => handleChange("sections.2.contents.0.data.button_text", e.target.value)}
                      />
                      <input
                        style={{ backgroundColor: "#cd3c0d", color: "#ffffff", marginTop: "1rem" }}
                        className="px-4 py-1"
                        placeholder={t("اكتب النص هنا")}
                        value={state.sections[2].contents[0].data_ar.button_text}
                        onChange={(e) => handleChange("sections.2.contents.0.data_ar.button_text", e.target.value)}
                      />
                      <br />
                      <input
                        style={{ backgroundColor: "#cd3c0d", color: "#ffffff", marginTop: "1rem" }}
                        className="px-4 py-1"
                        placeholder={t("write button navigation")}
                        value={state.sections[2].contents[0].data.button_navigation}
                        onChange={(e) => handleChange("sections.2.contents.0.data.button_navigation", e.target.value)}
                      />
                      <input
                        style={{ backgroundColor: "#cd3c0d", color: "#ffffff", marginTop: "1rem" }}
                        className="px-4 py-1"
                        placeholder={t("اكتب التنقل هنا")}
                        value={state.sections[2].contents[0].data_ar.button_navigation}
                        onChange={(e) => handleChange("sections.2.contents.0.data_ar.button_navigation", e.target.value)}
                      />
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
                        {section_image3 ? (
                            <img src={URL.createObjectURL(section_image3)} alt="Selected" />
                        ) : (
                            <img src={imageLiveUrl(state.sections[2].contents[0].data.section_3_image)} alt="Selected" />
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
                            onClick={() => document.getElementById("fileInput4").click()}
                        >
                            {t("Select Image")}
                        </Button>
                    </div>
                  </div>
                </div>


                <div className="w-full h-auto mb-10">
                  <div className="bg-orange-600 bg-opacity-75 flex items-center justify-center p-10">
                    <ReactQuill
                      theme="snow"
                      modules={modules}
                      formats={formats}
                      className="px-3 py-3 bg-white text-black w-full"
                      placeholder="Write description here.."
                      value={state.sections[3].contents[0].data.description}
                      onChange={(value) =>
                        handleChange(
                          "sections.3.contents.0.data.description",
                          value
                        )
                      }
                    />

                    <ReactQuill
                      theme="snow"
                      modules={modules}
                      formats={formats}
                      className="px-3 py-3 bg-white text-black w-full"
                      placeholder={t("اكتب الوصف هنا ..")}
                      value={state.sections[3].contents[0].data_ar.description}
                      onChange={(value) => handleChange("sections.3.contents.0.data_ar.description", value)}
                    />
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
                    endIcon={loading ? <CircularProgress size={24} color="inherit" /> : null}
                    onClick={handleSubmit}
                  >
                    {t("Update Template")}
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

export default UpdateTemplate4;
