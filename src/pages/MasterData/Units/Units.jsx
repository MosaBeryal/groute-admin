import React, { useContext, useEffect, useState } from 'react'
import DataTable from '../../../../components/Datatable/Datatable'
import { useNavigate } from 'react-router-dom'
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataTableContext } from '../../../../Contexts/DataTableContext'
import { masterDataColumn } from '../../../../utils/datatablesource'
import newRequest ,{newRequestnpc} from '../../../../utils/userRequest'
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Addunit from './addunit';
import Updateunit from './updateunit';
import * as XLSX from 'xlsx';
import { CSVLink } from "react-csv";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {  useTranslation } from "react-i18next";
// import SideNav from '../../../../components/Sidebar/SideNav';
const Units = () =>
{
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [isCreatePopupVisible, setCreatePopupVisibility] = useState(false);
  const [brandsData, setBrandsData] = useState([]);
  const handleShowCreatePopup = () =>
  {
    setCreatePopupVisibility(true);
  };

  const [isUpdatePopupVisible, setUpdatePopupVisibility] = useState(false);

  const handleShowUpdatePopup = (row) =>
  {
    setUpdatePopupVisibility(true);
    // console.log(row)
    // save this row data in session storage 
    sessionStorage.setItem("updateBrandData", JSON.stringify(row));
  };
  const { rowSelectionModel, setRowSelectionModel,
    tableSelectedRows, setTableSelectedRows } = useContext(DataTableContext);
  const [filteredData, setFilteredData] = useState([]);

  const refreshcitiesData = async () =>
  {
    try {
      const response = await newRequestnpc.get("/master-data/getallunit");

      console.log(response);
      setData(response?.data || []);
      setIsLoading(false)

    } catch (err) {
      console.log(err);
      setIsLoading(false)
    }
  };
  useEffect(() =>
  {

    refreshcitiesData() 
  }, []);
  const handleDelete = async (row) =>
  {
    Swal.fire({
      title: `${t('Are you sure to delete this record?')}!`,
      text: `${t('You will not be able to recover this')} ${t('Unit code')}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `${t('Yes')} , ${t('Delete')}!`,
      cancelButtonText: `${t('No, keep it')}!`,
      // changes the color of the confirm button to red
      confirmButtonColor: '#1E3B8B',
      cancelButtonColor: '#FF0032',
    }).then(async (result) =>
    {
      if (result.isConfirmed) {
        try {
          const isDeleted = await newRequestnpc.delete("/master-data/deleteunit/" + row?.id);
          if (isDeleted) {
            toast.success(`${t('Unit code')} ${t('Delete')} ${t('successfully')}!`, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });


            // filter out the deleted user from the data
            const filteredData = brandsData.filter((item) => item?.id !== row?.id);
            setBrandsData(filteredData);
            refreshcitiesData()
          } else {
            // Handle any additional logic if the user was not deleted successfully
            toast.error('Failed to delete user', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

          }
        } catch (error) {
          // Handle any error that occurred during the deletion
          console.error("Error deleting user:", error);
          toast.error(`${t('Unit code')} ${t('has been not deleted')}!`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return;
      }
    });
  };
  const handleRowClickInParent = (item) =>
  {
    if (!item || item?.length === 0) {
      setTableSelectedRows(data)
      setFilteredData(data)
      return
    }

  }
  const handleFileUpload = (e) =>
  {
    const file = e.target.files[0];
    if (file) {
      // console.log(file.type);
      const reader = new FileReader();
      reader.onload = (e) =>
      {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0]; // Assuming you have data in the first sheet
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet);
        json.forEach((item) =>
        {
          newRequestnpc.post(`/units`, {
            unit_code: item.unit_code, // Adjust property names as needed
            unit_name: item.unit_name,
            status: 1
          })
            .then((res) =>
            {
              // console.log('Add', res.data);

              Swal.fire(
                'Add!',
                `Unit has been created`,
                'success'
              )
              refreshcitiesData()
            })
            .catch((err) =>
            {
              // console.log(err);
              Swal.fire(
                'Error!',
                `Some Unit code already exist`,
                'error'
              )
              // Handle errors
            });
        });
      };
      reader.readAsArrayBuffer(file);

    }
  };
  return (
    <div>
      {/* <SideNav> */}
        <div className={`p-0 h-full bg-dashboard-color`}>
          {" "}
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
                  <div className="relative">
                    <button className="rounded-full bg-secondary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary cursor-pointer">
                      <i className="fas fa-file-import mr-1"></i> {t("Import")}
                    </button>
                    <input
                      type="file"
                      accept=".xlsx"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleFileUpload}
                    />
                  </div>

                  <CSVLink
                    data={data}
                    type="button"
                    className="rounded-full bg-secondary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary"
                  >
                    {" "}
                    {t("Export")} <FileUploadIcon />
                  </CSVLink>
                </div>
                {/* DataGrid */}
                <div style={{ marginLeft: "-11px", marginRight: "-11px" }}>
                  <DataTable
                    data={data}
                    title={t("Units")}
                    columnsName={masterDataColumn(t)}
                    loading={isLoading}
                    secondaryColor="secondary"
                    handleRowClickInParent={handleRowClickInParent}
                    dropDownOptions={[
                      // {
                      //   label: t("View"),
                      //   icon: (
                      //     <VisibilityIcon
                      //       fontSize="small"
                      //       color="action"
                      //       style={{ color: "rgb(37 99 235)" }}
                      //     />
                      //   ),
                      //   action: handleView,
                      // },
                      {
                        label: t("Edit"),
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
                        label: t("Delete"),
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
            <Addunit
              isVisible={isCreatePopupVisible}
              setVisibility={setCreatePopupVisibility}
              refreshBrandData={refreshcitiesData}
            />
          )}
          {/* Updateunit component with handleShowUpdatePopup prop */}
          {isUpdatePopupVisible && (
            <Updateunit
              isVisible={isUpdatePopupVisible}
              setVisibility={setUpdatePopupVisibility}
              refreshBrandData={refreshcitiesData}
            />
          )}
        </div>
      {/* </SideNav> */}
    </div>
  );
}

export default Units