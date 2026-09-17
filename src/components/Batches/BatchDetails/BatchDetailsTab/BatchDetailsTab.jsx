import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Tabs, Tab, Box, Button, Dialog } from "@mui/material";
import styles from "./BatchDetailTab.module.css";
import Sessions from "./Sessions/Sessions";
import Modules from "./Modules/Modules";
import BatchNotes from "./Notes/BatchNotes";
import { BatchContext } from "../BatchContext";
import PopupFilterComponent from "../../../Common/FilterMenuComponent/PopupFilterComponent";
import RequestModules from "./Modules/reassignrequest";
const TabPanel = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && <div>{children}</div>}
  </div>
);

function BatchDetailsTab({ sessionData }) {
  const tabNames = ["SESSIONS", "MODULES", "NOTES"];

  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab");

  const tabIndex = {
    SESSIONS: 0,
    MODULES: 1,
    NOTES: 2,
  };

  const [activeTab, setActiveTab] = useState(tabIndex[tabFromUrl] ?? 0);

  const [filterData, setFilterData] = useState([]);
  const [openReassignModal, setOpenReassignModal] = useState(false);

  const batchId = useParams().batchId || null;

  const handleTabChange = (event, newTabIndex) => {
    setActiveTab(newTabIndex);
  };

  const handleReassignRequest = () => {
    setOpenReassignModal(true);
  };

  const handleCloseReassignModal = () => {
    setOpenReassignModal(false);
  };

  return (
    <BatchContext.Provider value={{ sessionData, batchId }}>
      <Box className={styles.mainBox}>
        {/* 🔹 Tabs + Three Dot Menu */}
        <Box
          sx={{
            display: "flex",
            // alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
            // justifyContent: "space-between",
            // gap: 1,
          }}
        >
          <Tabs
            variant="scrollable"
            scrollButtons="auto"
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              flex: 1,
              "& .MuiTabs-indicator": { display: "none" },
              "& .MuiTab-root": {
                backgroundColor: "var(--background-color)",
                color: "var(--primary-color)",
                fontSize: { xs: "14px", sm: "16px" },
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "8px",
                ml: "12px",
                minHeight: 40,
              },
              "& .MuiTab-root.Mui-selected": {
                backgroundColor: "var(--secondary-color)",
                color: "#FFFFFF",
              },
            }}
          >
            {tabNames.map((tabName, index) => (
              <Tab key={index} label={tabName} />
            ))}
          </Tabs>

          {activeTab === 0 && (
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <PopupFilterComponent
                rowData={sessionData?.list}
                statusOptions={["PRESENT", "ABSENT", "ON_LEAVE"]}
                setFilterData={setFilterData}
                dateKey={null}
                statusKey="studentAttendanceStatus"
                search={false}
                sx={{ pt: 0, pb: 1 }}
              />
            </Box>
          )}

          {activeTab === 1 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                pr: "12px",
                pb: 2,
              }}
            >
              <Button
                variant="contained"
                onClick={handleReassignRequest}
                disabled={sessionData?.isReassigned === true}
                sx={{
                  backgroundColor:
                    sessionData?.isReassigned === true
                      ? "#BDBDBD"
                      : "var(--secondary-color)",
                  color: "#FFFFFF",
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: "4px",
                  "&:hover": {
                    backgroundColor:
                      sessionData?.isReassigned === true
                        ? "#BDBDBD"
                        : "var(--secondary-color)",
                  },
                }}
              >
                REASSIGN REQUEST
              </Button>
            </Box>
          )}
        </Box>

        {/* 🔹 Tab Panels */}
        <TabPanel value={activeTab} index={0}>
          <Sessions filterData={filterData} />
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Modules />
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <BatchNotes />
        </TabPanel>

        <Dialog
          open={openReassignModal}
          onClose={handleCloseReassignModal}
          fullWidth
          maxWidth="md"
        >
          <RequestModules onClose={handleCloseReassignModal} />
        </Dialog>
      </Box>
    </BatchContext.Provider>
  );
}

export default BatchDetailsTab;
