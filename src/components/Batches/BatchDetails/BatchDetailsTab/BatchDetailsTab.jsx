import {useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import styles from "./BatchDetailTab.module.css";
import Sessions from "./Sessions/Sessions";
import Modules from "./Modules/Modules";
import AbsentLog from "./AbsentLog/AbsentLog";

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <div>{children}</div>}
    </div>
  );
};

function BatchDetailsTab() {
  const tabNames = ["SESSIONS", "MODULES", "ABSENT LOG"];
  const [activeTab, setActiveTab] = useState(0);

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
            fontSize: { xs: "14px", sm: "18px", md: "18px" },
            fontWeight: 600,
          }}
        >
          {tabNames?.map((tabName, index) => (
            <Tab key={index} label={tabName} className={styles.tabName} />
          ))}
        </Tabs>
      </Box>

      <TabPanel value={activeTab} index={0}>
        <Sessions />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <Modules />
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <AbsentLog />
      </TabPanel>
    </Box>
  );
}

export default BatchDetailsTab;
