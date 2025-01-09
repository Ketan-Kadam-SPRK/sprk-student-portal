import { useEffect, useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import styles from "./BatchDetailTab.module.css";
import Sessions from "./Sessions/Sessions";
import Modules from "./Modules/Modules";
import AbsentLog from "./AbsentLog/AbsentLog";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuthHeaders } from "../../../../Hooks/useAuthHeaders";


const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <div>{children}</div>}
    </div>
  );
};

function BatchDetailsTab({sessionData}) {
  const tabNames = ["SESSIONS", "MODULES", "ABSENT LOG"];
  const [activeTab, setActiveTab] = useState(0);
  const batchId = useParams().batchId || null;

  const handleTabChange = (event, newTabIndex) => {
    setActiveTab(newTabIndex);
  };


  return (
    <Box className={styles.mainBox}>
      {/* Create tabs with labels based on tabNames */}
      <Box className={styles.tabBox}>
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
              marginLeft: "8px",
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
      </Box>

      <TabPanel value={activeTab} index={0}>
        <Sessions sessionData={sessionData}/>
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <Modules />
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <AbsentLog batchId={batchId} />
      </TabPanel>
    </Box>
  );
}

export default BatchDetailsTab;
