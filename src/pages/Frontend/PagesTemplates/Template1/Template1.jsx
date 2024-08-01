import { useContext, useEffect, useState } from "react";
import DataTable from "../../../../components/Datatable/Datatable";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataTableContext } from "../../../../context/DataTableContext";
import { allTemplatesColumn } from "../../../../utils/datatablesource";
import newRequest from "../../../../UserRequest";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import AddTemplate1 from "./AddTemplate1";
import UpdateTemplate1 from "./UpdateTemplate1";
import ViewTemplate1PopUp from "./ViewTemplate1PopUp";

const Template1 = () => {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [viewSlug, setViewSlug] = useState(null);
  const selectedTemplate = JSON.parse(
    sessionStorage.getItem("selectedTemplate")
  );

  const [isCreatePopupVisible, setCreatePopupVisibility] = useState(false);
  const handleShowCreatePopup = () => {
    setCreatePopupVisibility(true);
  };

  const [isUpdatePopupVisible, setUpdatePopupVisibility] = useState(false);
  const handleShowUpdatePopup = (row) => {
    setUpdatePopupVisibility(true);
    sessionStorage.setItem("updateTemplate", JSON.stringify(row));
  };

  const [isViewPopupVisible, setViewPopupVisibility] = useState(false);
  const handleShowViewPopup = (row) => {
    setViewSlug(row?.slug);
    setViewPopupVisibility(true);
  };

  const {
    rowSelectionModel,
    setRowSelectionModel,
    tableSelectedRows,
    setTableSelectedRows,
  } = useContext(DataTableContext);

  const refetchTemplate1data = async () => {
    try {
      const response = await newRequest.get(
        `/blogs/pages?template_id=${selectedTemplate?.id}`
      );
      setData(response?.data || []);
      setIsLoading(false);
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Something went wrong"
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refetchTemplate1data();
  }, []);

  const handleRowClickInParent = (item) => {
    if (!item || item?.length === 0) {
      setTableSelectedRows(data);
      return;
    }
  };

  const handleDelete = async (row) => {
    Swal.fire({
      title: `${t("Are you sure to delete this record?")}!`,
      text: `${t("You will not be able to recover this")} ${t("Blog")}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `${t("Yes")} , ${t("Delete")}!`,
      cancelButtonText: `${t("No, keep it")}!`,
      confirmButtonColor: "#1E3B8B",
      cancelButtonColor: "#FF0032",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const isDeleted = await newRequest.delete("/blogs/" + row?.id);
          if (isDeleted) {
            toast.success(`${t("Blog")} ${t("Delete")} ${t("successfully")}!`);
            const filteredData = data.filter((item) => item?.id !== row?.id);
            setData(filteredData);
          } else {
            toast.error("Failed to delete user");
          }
        } catch (error) {
          console.error("Error deleting user:", error);
          toast.error(`${t("Blog")} ${t("has been not deleted")}`);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return;
      }
    });
  };

  return (
    <div className="p-4 lg:p-6 h-full">
      <div className="flex flex-col lg:flex-row lg:gap-6">
        <div className="flex-1 bg-white shadow-md rounded-lg">
          <div
            className={`flex items-center flex-wrap gap-2 py-4 px-3 ${
              i18n.language === "ar" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <button
              onClick={handleShowCreatePopup}
              className="flex items-center rounded-full bg-blue-900 bg-secondary px-4 py-1 text-sm font-semibold text-white transition duration-200 hover:bg-primary"
            >
              <i className="fas fa-plus mr-2"></i>
              {t("Add Template")}
            </button>
          </div>
          {/* DataTable */}
          <div className="overflow-x-auto">
            <DataTable
              data={data}
              title={`${t(selectedTemplate?.name || "")}`}
              columnsName={allTemplatesColumn(t)}
              loading={isLoading}
              secondaryColor="secondary"
              handleRowClickInParent={handleRowClickInParent}
              dropDownOptions={[
                {
                  label: `${t("View")}`,
                  icon: (
                    <VisibilityIcon
                      fontSize="small"
                      color="action"
                      style={{ color: "rgb(37 99 235)" }}
                    />
                  ),
                  action: handleShowViewPopup,
                },
                {
                  label: `${t("Edit")}`,
                  icon: (
                    <EditIcon
                      fontSize="small"
                      color="action"
                      style={{ color: "rgb(37 99 235)" }}
                    />
                  ),
                  action: handleShowUpdatePopup,
                },
                {
                  label: `${t("Delete")}`,
                  icon: (
                    <DeleteIcon
                      fontSize="small"
                      color="action"
                      style={{ color: "rgb(37 99 235)" }}
                    />
                  ),
                  action: handleDelete,
                },
              ]}
              uniqueId="gtinMainTableId"
            />
          </div>
        </div>
      </div>
      {isCreatePopupVisible && (
        <AddTemplate1
          isVisible={isCreatePopupVisible}
          setVisibility={setCreatePopupVisibility}
          refreshTemplate1Data={refetchTemplate1data}
        />
      )}
      {isUpdatePopupVisible && (
        <UpdateTemplate1
          isVisible={isUpdatePopupVisible}
          setVisibility={setUpdatePopupVisibility}
          refreshTemplate1Data={refetchTemplate1data}
        />
      )}
      {isViewPopupVisible && (
        <ViewTemplate1PopUp
          isVisible={isViewPopupVisible}
          setVisibility={setViewPopupVisibility}
          slug={viewSlug}
        />
      )}
    </div>
  );
};

export default Template1;
