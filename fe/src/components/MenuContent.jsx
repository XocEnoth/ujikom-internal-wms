import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import GridViewIcon from "@mui/icons-material/GridView";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { NavLink, useLocation } from "react-router";

const mainListItems = [
    { text: "Dashboard", icon: <GridViewIcon />, path: "/dashboard" },
    { text: "Warehouses", icon: <WarehouseIcon />, path: "/warehouses" },
];

const secondaryListItems = [
    { text: "Settings", icon: <SettingsRoundedIcon /> },
];

export default function MenuContent() {
    const location = useLocation();

    return (
        <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
            <List dense>
                {mainListItems.map((item, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                        sx={{ display: "block" }}
                    >
                        <NavLink to={item.path}>
                            <ListItemButton
                                selected={location.pathname === item.path}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </NavLink>
                    </ListItem>
                ))}
            </List>
            <List dense>
                {secondaryListItems.map((item, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                        sx={{ display: "block" }}
                    >
                        <ListItemButton>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Stack>
    );
}
