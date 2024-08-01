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
import AddTemplate6 from "./AddTemplate6";
import UpdateTemplate6 from "./UpdateTemplate6";
import ViewTemplate6PopUp from "./ViewTemplate6PopUp";

const Template6 = () => {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [viewSlug, setViewSlug] = useState(null);
  const selectedTemplate = JSON.parse(
    sessionStorage.getItem("selectedTemplate")
  );
  // console.log(selectedTemplate);

  const [isCreatePopupVisible, setCreatePopupVisibility] = useState(false);
  const handleShowCreatePopup = () => {
    setCreatePopupVisibility(true);
  };

  const [isUpdatePopupVisible, setUpdatePopupVisibility] = useState(false);
  const handleShowUpdatePopup = (row) => {
      setUpdatePopupVisibility(true);
      // save this row data in session storage
      sessionStorage.setItem("updateTemplate", JSON.stringify(row));
  };

  const [isViewPopupVisible, setViewPopupVisibility] = useState(false);
  const handleShowViewPopup = (row) => {
      setViewSlug(row?.slug); // Set the slug for viewing
      setViewPopupVisibility(true);
  };

  const {
    rowSelectionModel,
    setRowSelectionModel,
    tableSelectedRows,
    setTableSelectedRows,
  } = useContext(DataTableContext);

    const refetchTemplate6Data = async () => {
      try {
        const response = await newRequest.get(`/blogs/pages?template_id=${selectedTemplate?.id}`);

        // console.log(response.data);
        setData(response?.data || []);
        setIsLoading(false);
      } catch (err) {
        // console.log(err);
        toast.error(err?.response?.data?.message || err?.response?.data?.error || "Something went wrong");
        setIsLoading(false);
      }
    };
    useEffect(() => {
      refetchTemplate6Data(); // Calling the function within useEffect, not inside itself
    }, []);

  const handleRowClickInParent = (item) => {
    if (!item || item?.length === 0) {
      setTableSelectedRows(data);
      return;
    }
  };


  const handleDelete = async (row) => {
    Swal.fire({
        title: `${t('Are you sure to delete this record?')}!`,
        text: `${t('You will not be able to recover this')} ${t('Blog')}!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: `${t('Yes')} , ${t('Delete')}!`,
        cancelButtonText: `${t('No, keep it')}!`,
        // changes the color of the confirm button to red
        confirmButtonColor: '#1E3B8B',
        cancelButtonColor: '#FF0032',
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const isDeleted = await newRequest.delete("/blogs/" + row?.id);
                if (isDeleted) {
                    toast.success(`${t('Blog')} ${t('Delete')} ${t('successfully')}!`)
                    // filter out the deleted user from the data
                    const filteredData = data.filter((item) => item?.id !== row?.id);
                    setData(filteredData);
                } else {
                    // Handle any additional logic if the user was not deleted successfully
                    toast.error('Failed to delete user');
                }
            } catch (error) {
                // Handle any error that occurred during the deletion
                console.error("Error deleting user:", error);
                toast.error(`${t('Blog')} ${t('has been not deleted')}`)
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            return;
        }
    });
  };



  return (
    <div>
      <div
        className={`p-0 h-full`}
      >
        <div className="flex justify-center items-center">
          <div className="h-auto w-[97%] px-0 pt-4">
            <div className="h-auto w-full p-0 bg-white shadow-xl rounded-md">
              <div
                className={`flex  sm:justify-start items-center flex-wrap gap-2 py-7 px-3 ${
                  i18n.language === "ar"
                    ? "flex-row-reverse justify-start"
                    : "flex-row justify-start"
                }`}
              >
                <button
                  onClick={handleShowCreatePopup}
                  className="rounded-full bg-secondary font-body px-5 py-1 text-sm mb-3 bg-blue-900 text-white transition duration-200 hover:bg-primary"
                >
                  <i className="fas fa-plus mr-2"></i>
                  {t("Add Template")}
                </button>
              </div>
              {/* DataGrid */}
              <div style={{ marginLeft: "-11px", marginRight: "-11px" }}>
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
        </div>
        {isCreatePopupVisible && (
          <AddTemplate6
            isVisible={isCreatePopupVisible}
            setVisibility={setCreatePopupVisibility}
            refreshTemplate6Data={refetchTemplate6Data}
          />
        )}
        
        {isUpdatePopupVisible && (
          <UpdateTemplate6 isVisible={isUpdatePopupVisible} setVisibility={setUpdatePopupVisibility} refreshTemplate6Data={refetchTemplate6Data} />
        )}

        {isViewPopupVisible && (
          <ViewTemplate6PopUp isVisible={isViewPopupVisible} setVisibility={setViewPopupVisibility} slug={viewSlug}/>
        )}
      </div>
    </div>
  );
};

export default Template6;
