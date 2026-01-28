import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppNavbar from "../../components/AppNavbar";
import Header from "../../components/Header";
import SideMenu from "../../components/SideMenu";
import ShipmentsGrid from "../../components/ShipmentsGrid";
import AppTheme from "../../shared-theme/AppTheme";
import {
    chartsCustomizations,
    dataGridCustomizations,
    datePickersCustomizations,
    treeViewCustomizations,
} from "../../theme/customizations";
import { useState, useEffect } from "react";
import getUserCredentials from "../../actions/user";
const xThemeComponents = {
    ...chartsCustomizations,
    ...dataGridCustomizations,
    ...datePickersCustomizations,
    ...treeViewCustomizations,
};

export default function Orders(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const response = await getUserCredentials();
            setData(response?.data?.users?.[0]);
        }
        fetchData();
    }, []);
    return (
        <AppTheme {...props} themeComponents={xThemeComponents}>
            <CssBaseline enableColorScheme />
            <Box sx={{ display: "flex" }}>
                <SideMenu dataUser={data} />
                <AppNavbar />
                {/* Main content */}
                <Box
                    component="main"
                    sx={(theme) => ({
                        flexGrow: 1,
                        backgroundColor: theme.vars
                            ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                            : alpha(theme.palette.background.default, 1),
                        overflow: "auto",
                    })}
                >
                    <Stack
                        spacing={2}
                        sx={{
                            alignItems: "center",
                            mx: 3,
                            pb: 5,
                            mt: { xs: 8, md: 0 },
                        }}
                    >
                        <Header />
                        <ShipmentsGrid dataUser={data} />
                    </Stack>
                </Box>
            </Box>
        </AppTheme>
    );
}
