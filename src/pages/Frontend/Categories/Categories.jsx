import { useContext, useEffect, useState } from "react";
import DataTable from "../../../../components/Datatable/Datatable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataTableContext } from "../../../../Contexts/DataTableContext";
import { CategoriesDataColumn } from "../../../../utils/datatablesource";
import newRequest from "../../../../utils/userRequest";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Addcategories from "./Addcategories";
import Updatacatelog from "./Updatacatelog";
import { useTranslation } from "react-i18next";

const Categories = () => {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isCreatePopupVisible, setCreatePopupVisibility] = useState(false);
  const [brandsData, setBrandsData] = useState([]);
  const handleShowCreatePopup = () => {
    setCreatePopupVisibility(true);
  };

  const [isUpdatePopupVisible, setUpdatePopupVisibility] = useState(false);

  const handleShowUpdatePopup = (row) => {
    setUpdatePopupVisibility(true);
    // save this row data in session storage
    sessionStorage.setItem("updatecatlogmenu", JSON.stringify(row));
  };
  const {
    rowSelectionModel,
    setRowSelectionModel,
    tableSelectedRows,
    setTableSelectedRows,
  } = useContext(DataTableContext);
  const [filteredData, setFilteredData] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await newRequest.get("/getAllmega_menu_categories");
      const citiesData = response?.data || [];
      setData(response?.data || []);

      setIsLoading(false);

      const statesResponse = await newRequest.get("/getAllmega_menu");
      const statesData = statesResponse?.data || [];
      const stateIdToNameMap = {};
      statesData.forEach((state) => {
        stateIdToNameMap[state.id] = state.name_en;
      });

      const updatedCitiesData = citiesData.map((megnumenu) => ({
        ...megnumenu,
        megamenu_id: stateIdToNameMap[megnumenu.megamenu_id] || "Unknown State",
      }));

      // console.log('statesData', updatedCitiesData);
      setData(updatedCitiesData);
    } catch (err) {
      // console.log(err);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories(); // Calling the function within useEffect, not inside itself
  }, []);

  const handleDelete = async (row) => {
    Swal.fire({
      title: `${t("Are you sure to delete this record?")}!`,
      text: `${t("You will not be able to recover this")} ${t("Mega Menu")} ${t(
        "Categories"
      )}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `${t("Yes")} , ${t("Delete")}!`,
      cancelButtonText: `${t("No, keep it")}!`,
      // changes the color of the confirm button to red
      confirmButtonColor: "#1E3B8B",
      cancelButtonColor: "#FF0032",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const isDeleted = await newRequest.delete(
            "/deletemega_menu_categories/" + row?.id
          );
          if (isDeleted) {
            toast.success(
              `${t("Mega Menu")} ${t("Categories")} ${t(
                "has been not deleted"
              )} ${t("successfully")}!`
            );
            // filter out the deleted user frm the data
            const filteredData = data.filter((item) => item?.id !== row?.id);
            setData(filteredData);
          } else {
            toast.error("Failed to delete user");
          }
        } catch (error) {
          console.error("Error deleting user:", error);
          toast.error(
            `${t("Mega Menu")} ${t("Categories")}${t(
              "has been not deleted"
            )}${t("Delete")}${t("has been not deleted")}!`
          );
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return;
      }
    });
  };

  const handleRowClickInParent = (item) => {
    if (!item || item?.length === 0) {
      setTableSelectedRows(data);
      setFilteredData(data);
      return;
    }
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
                  className="rounded-full bg-secondary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary"
                >
                  <i className="fas fa-plus mr-2"></i>
                  {t("Add")}
                </button>
              </div>
              {/* DataGrid */}
              <div style={{ marginLeft: "-11px", marginRight: "-11px" }}>
                <DataTable
                  data={data}
                  title={`${t("Mega Menu")} ${t("Categories")}`}
                  columnsName={CategoriesDataColumn(t)}
                  loading={isLoading}
                  secondaryColor="secondary"
                  handleRowClickInParent={handleRowClickInParent}
                  dropDownOptions={[
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

        {/* Addunit component with handleShowCreatePopup prop */}
        {isCreatePopupVisible && (
          <Addcategories
            isVisible={isCreatePopupVisible}
            setVisibility={setCreatePopupVisibility}
            refreshBrandData={fetchCategories}
          />
        )}
        {/* Updateunit component with handleShowUpdatePopup prop */}
        {isUpdatePopupVisible && (
          <Updatacatelog
            isVisible={isUpdatePopupVisible}
            setVisibility={setUpdatePopupVisibility}
            refreshBrandData={fetchCategories}
          />
        )}
      </div>
    </div>
  );
};

export default Categories;
