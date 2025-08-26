import { useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, Tab, Box } from "@mui/material";
import styles from "./BatchDetailTab.module.css";
import Sessions from "./Sessions/Sessions";
import Modules from "./Modules/Modules";
import BatchNotes from "./Notes/BatchNotes";
import PopupFilterComponent from "../../../Common/FilterMenuComponent/PopupFilterComponent";
import { BatchContext } from "../BatchContext";  // ✅ import context

const TabPanel = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && <div>{children}</div>}
  </div>
);

function BatchDetailsTab({ sessionData }) {
  const tabNames = ["SESSIONS", "MODULES", "NOTES"];
  const [activeTab, setActiveTab] = useState(0);
  const batchId = useParams().batchId || null; // still local
  const [filterData, setFilterData] = useState([]); // still local

  const handleTabChange = (event, newTabIndex) => {
    setActiveTab(newTabIndex);
  };

  return (
    <BatchContext.Provider value={{ sessionData }}>
      <Box className={styles.mainBox}>
        <Box className={styles.tabBox}>
          <Tabs
            variant="scrollable"
            scrollButtons="auto"
            value={activeTab}
            onChange={handleTabChange}
            className={styles.tabsStyle}
            sx={{
              "& .MuiTabs-indicator": { display: "none" },
              "& .MuiTab-root": {
                backgroundColor: "var(--background-color)",
                color: "var(--primary-color)",
                fontSize: { xs: "14px", sm: "16px", md: "16px" },
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "8px",
                marginLeft: "20px",
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
            <Box className={styles.buttonBox}>
              <PopupFilterComponent
                rowData={sessionData?.list}
                statusOptions={["PRESENT", "ABSENT", "ON_LEAVE"]}
                setFilterData={setFilterData}
                dateKey={null}
                statusKey="studentAttendanceStatus"
                search={false}
              />
            </Box>
          )}
        </Box>

        <TabPanel value={activeTab} index={0}>
          <Sessions filterData={filterData} /> {/* still local */}
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <Modules batchId={batchId} /> {/* still local */}
        </TabPanel>
        <TabPanel value={activeTab} index={2}>
          <BatchNotes batchId={batchId} /> {/* still local */}
        </TabPanel>
      </Box>
    </BatchContext.Provider>
  );
}

export default BatchDetailsTab;
