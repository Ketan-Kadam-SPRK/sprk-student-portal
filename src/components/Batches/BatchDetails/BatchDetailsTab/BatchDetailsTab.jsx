import { useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, Tab, Box, Button } from "@mui/material";
import styles from "./BatchDetailTab.module.css";
import Sessions from "./Sessions/Sessions";
import Modules from "./Modules/Modules";
import AbsentLog from "./AbsentLog/AbsentLog";
import PopupFilterComponent from "../../../Common/FilterMenuComponent/PopupFilterComponent";

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <div>{children}</div>}
    </div>
  );
};

function BatchDetailsTab({ sessionData }) {
  const tabNames = ["SESSIONS", "MODULES"];
  const [activeTab, setActiveTab] = useState(0);
  const batchId = useParams().batchId || null;
  const [filterData, setFilterData] = useState([]);

  const handleTabChange = (event, newTabIndex) => {
    setActiveTab(newTabIndex);
  };

  return (
    <Box className={styles.mainBox}>
      <Box className={styles.tabBox} >
        <Tabs
          variant="scrollable"
          scrollButtons="auto"
          value={activeTab}
          onChange={handleTabChange}
          className={styles.tabsStyle}
          sx={{
            "& .MuiTabs-indicator": {
              display: "none",
            },
            "& .MuiTab-root": {
              backgroundColor: "#E0DFFF",
              color: "#3D37D5",
              fontSize: { xs: "14px", sm: "16px", md: "16px" },
              fontWeight: 600,
              textTransform: "none",
              borderRadius: "8px",
              marginLeft: "20px",
            },
            "& .MuiTab-root.Mui-selected": {
              backgroundColor: "#6560F0",
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
        <Sessions sessionData={sessionData} filterData={filterData} />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <Modules batchId={batchId} />
      </TabPanel>
      {/* <TabPanel value={activeTab} index={2}>
        <AbsentLog batchId={batchId} />
      </TabPanel> */}
    </Box>
  );
}

export default BatchDetailsTab;
