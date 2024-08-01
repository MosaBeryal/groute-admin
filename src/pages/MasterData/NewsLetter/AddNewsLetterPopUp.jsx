import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import newRequest from "../../../../utils/userRequest";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import SendIcon from "@mui/icons-material/Send";

const AddNewsLetterPopUp = ({
  isVisible,
  setVisibility,
  refreshNewsLetter,
}) => {
  const { t, i18n } = useTranslation();
  const [Pagedropdown, setPagedropdown] = useState([]);
  const [slug, setSlug] = useState("");
  const [subject, setSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCloseCreatePopup = () => {
    setVisibility(false);
  };

  const getpagedata = async () => {
    try {
      const response = await newRequest.get("/blogs/pages");
      const nameEnArray = response.data;
      setPagedropdown(nameEnArray);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getpagedata();
  }, []);

  const handleAddNewsLetter = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await newRequest.post("/website/sendNewsletter", {
        slug: slug,
        subject: subject,
        emailBody: emailBody,
      });
      toast.success(
        t(
          response?.data?.message ||
            "Newsletter Email has been sent successfully"
        )
      );
      setLoading(false);
      // console.log(response.data);
      refreshNewsLetter();
      handleCloseCreatePopup();
    } catch (error) {
      toast.error(error?.response?.data?.error || "Something went wrong!");
      setLoading(false);
      // console.log(error);
    }
  };

  return (
    <div>
      {/* create the post api popup */}
      {isVisible && (
        <div className="popup-overlay z-50">
          <div className="popup-container h-auto sm:w-[45%] w-full">
            <div className="popup-form w-full">
              <form onSubmit={handleAddNewsLetter} className="w-full">
                <h2
                  className={`text-secondary font-sans font-semibold text-2xl ${
                    i18n.language === "ar" ? "text-end" : "text-start"
                  }`}
                >
                  {t("Send Newsletter Email")}
                </h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label
                      htmlFor="field1"
                      className={`text-secondary  ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    >
                      {t("Select Template")}
                    </label>
                    <select
                      id="status"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className={`border w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    >
                      <option value="Select">-- {t("Select")} --</option>
                      {Pagedropdown &&
                        Pagedropdown.map((itme, index) => {
                          return (
                            <option key={index} value={itme.slug}>
                              {itme.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label
                      htmlFor="subject"
                      className={`text-secondary  ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    >
                      {t("Subject")}{" "}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder={`${t("Enter")} ${t("Subject")}`}
                      className={`border w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label
                      htmlFor="emailBody"
                      className={`text-secondary  ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    >
                      {t("Email Body")}{" "}
                    </label>
                    <textarea
                      type="text"
                      id="emailBody"
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                      placeholder={`${t("Enter")} ${t("Email Body")}`}
                      className={`border w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
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
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#021F69", color: "#ffffff" }}
                    type="submit"
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
                    {t("Send Email")}
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

export default AddNewsLetterPopUp;
