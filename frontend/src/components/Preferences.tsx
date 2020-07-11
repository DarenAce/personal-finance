import React, {
    ReactNode,
    useState
} from "react";
import {
    Tabs,
    Tab
} from "@material-ui/core";
import Accounts from "./accounts/Accounts";
import Banks from "./banks/Banks";
import Cards from "./cards/Cards";
import Categories from "./categories/Categories";
import Currencies from "./currencies/Currencies";
import Persons from "./persons/Persons";

interface TabPanelProps {
    children?: ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && children}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `tab-${index}`,
        "aria-controls": `tabpanel-${index}`,
    };
}

export default function Preferences() {
    const [activeTab, setActiveTab] = useState<number>(0);

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setActiveTab(newValue);
    };

    return <>
        <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="вкладки со спискамии"
        >
            <Tab label="Пользователи" {...a11yProps(0)} />
            <Tab label="Валюты" {...a11yProps(1)} />
            <Tab label="Банки" {...a11yProps(2)} />
            <Tab label="Счета" {...a11yProps(3)} />
            <Tab label="Карты" {...a11yProps(4)} />
            <Tab label="Категории" {...a11yProps(5)} />
        </Tabs>
        <TabPanel value={activeTab} index={0}>
            <Persons />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
            <Currencies />
        </TabPanel>
        <TabPanel value={activeTab} index={2}>
            <Banks />
        </TabPanel>
        <TabPanel value={activeTab} index={3}>
            <Accounts />
        </TabPanel>
        <TabPanel value={activeTab} index={4}>
            <Cards />
        </TabPanel>
        <TabPanel value={activeTab} index={5}>
            <Categories />
        </TabPanel>
    </>;
};
