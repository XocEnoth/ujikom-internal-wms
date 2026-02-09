import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router";
import getUserCredentials from "../actions/user";
import MenuContent from "./MenuContent";
import OptionsMenu from "./OptionsMenu";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
    width: drawerWidth,
    flexShrink: 0,
    boxSizing: "border-box",
    mt: 10,
    [`& .${drawerClasses.paper}`]: {
        width: drawerWidth,
        boxSizing: "border-box",
    },
});

export default function SideMenu() {
    const [dataUser, setDataUser] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const response = await getUserCredentials();
            setDataUser(response?.data?.users?.[0]);
        }
        fetchData();
    }, []);
    return (
        <Drawer
            variant="permanent"
            sx={{
                display: { xs: "none", md: "block" },
                [`& .${drawerClasses.paper}`]: {
                    backgroundColor: "background.paper",
                },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    mt: "calc(var(--template-frame-height, 0px) + 4px)",
                    p: 1.5,
                }}
            >
                <NavLink
                    to="/warehouses"
                    className="w-full flex items-center hover:bg-blue-500/20 p-3"
                >
                    <ListItemAvatar>
                        <Avatar alt="WMS" src="/icon.png" variant="rounded" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Warehouse"
                        secondary="Management System"
                    />
                </NavLink>
            </Box>
            <Divider />
            <Box
                sx={{
                    overflow: "auto",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <MenuContent />
            </Box>
            <Stack
                direction="row"
                sx={{
                    p: 2,
                    gap: 1,
                    alignItems: "center",
                    borderTop: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Avatar
                    sizes="small"
                    alt="Avatar user"
                    sx={{ width: 36, height: 36 }}
                />
                <Box sx={{ mr: "auto" }}>
                    <Typography
                        variant="body2"
                        sx={{ fontWeight: 500, lineHeight: "16px" }}
                    >
                        {dataUser?.username}
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{ color: "text.secondary" }}
                    >
                        {dataUser?.email}
                    </Typography>
                </Box>
                <OptionsMenu />
            </Stack>
        </Drawer>
    );
}
