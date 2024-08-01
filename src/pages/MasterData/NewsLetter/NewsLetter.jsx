import React, { useContext, useEffect, useState } from 'react'
import DataTable from '../../../../components/Datatable/Datatable'
import { useNavigate } from 'react-router-dom'
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataTableContext } from '../../../../Contexts/DataTableContext'
import { newsLetterColumn } from '../../../../utils/datatablesource'
import newRequest from '../../../../utils/userRequest'
import { useTranslation } from 'react-i18next';
import AddNewsLetterPopUp from './AddNewsLetterPopUp';
// import SideNav from '../../../../components/Sidebar/SideNav';

const AdminNewsLetter = () =>
{
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const { rowSelectionModel, setRowSelectionModel,
    tableSelectedRows, setTableSelectedRows } = useContext(DataTableContext);
  const [filteredData, setFilteredData] = useState([]);

  const [isCreatePopupVisible, setCreatePopupVisibility] = useState(false);

  const handleShowCreatePopup = () => {
    setCreatePopupVisibility(true);
  };

  const fetchData = async () =>
  {
    try {
      const response = await newRequest.get("/website/getNewsletterSubscriptions",);

      // console.log(response.data);
      setData(response?.data || []);
      setIsLoading(false)

    } catch (err) {
      // console.log(err);
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchData(); // Calling the function within useEffect, not inside itself
  }, []); // Empty array dependency ensures this useEffect runs once on component mount

  const handleRowClickInParent = (item) =>
  {
    if (!item || item?.length === 0) {
      setTableSelectedRows(data)
      setFilteredData(data)
      return
    }

  }
 

  return (
    <div>
      {/* <SideNav> */}
        <div className={`p-0 h-full bg-dashboard-color`}>
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
                    className="rounded-full bg-secondary font-body px-5 py-1 text-sm text-white transition duration-200 hover:bg-primary"
                  >
                    <i className="fas fa-paper-plane mr-2"></i>
                    {t("Send Newsletter Email")}
                  </button>
                </div>

                {/* DataGrid */}
                <div style={{ marginLeft: "-11px", marginRight: "-11px" }}>
                  <DataTable
                    data={data}
                    title={`${t("News Letter")}`}
                    columnsName={newsLetterColumn(t)}
                    loading={isLoading}
                    secondaryColor="secondary"
                    checkboxSelection="disabled"
                    actionColumnVisibility={false}
                    handleRowClickInParent={handleRowClickInParent}
                    dropDownOptions={
                      [
                        // {
                        //   label: `${t('View')}`,
                        //   icon: (
                        //     <VisibilityIcon
                        //       fontSize="small"
                        //       color="action"
                        //       style={{ color: "rgb(37 99 235)" }}
                        //     />
                        //   ),
                        //   action: handleView,
                        // },
                      ]
                    }
                    uniqueId="gtinMainTableId"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* AddNewsLetter component with handleShowCreatePopup prop */}
          {isCreatePopupVisible && (
            <AddNewsLetterPopUp
              isVisible={isCreatePopupVisible}
              setVisibility={setCreatePopupVisibility}
              refreshNewsLetter={fetchData}
            />
          )}
        </div>
      {/* </SideNav> */}
    </div>
  );
}

export default AdminNewsLetter