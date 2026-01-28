import * as React from "react";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Gauge } from "@mui/x-charts/Gauge";

function TabPanel(props) {
    const { children, value, index } = props;

    return (
        <Box hidden={value !== index} sx={{ p: 3 }}>
            {children}
        </Box>
    );
}

const calculateStats = (warehouse, selectIdCategory) => {
    const targetCategories = selectIdCategory
        ? warehouse?.categories?.filter((c) => c.id === selectIdCategory)
        : warehouse?.categories;

    let totalShelves = 0;
    let fullShelves = 0;
    let partialShelves = 0;

    targetCategories?.forEach((cat) => {
        totalShelves += cat.total_shelves || 0;
        cat.shelves?.forEach((s) => {
            if (s.status === "full") fullShelves++;
            else if (s.status === "partial") partialShelves++;
        });
    });

    const emptyShelves = Math.max(
        0,
        totalShelves - fullShelves - partialShelves,
    );
    const usedShelves = fullShelves + partialShelves;
    const usedPercentage =
        totalShelves > 0
            ? parseFloat(((usedShelves / totalShelves) * 100).toFixed(2))
            : 0;

    return {
        totalShelves,
        fullShelves,
        partialShelves,
        emptyShelves,
        usedPercentage,
    };
};

export default function WarehouseTab({ data }) {
    const [value, setValue] = React.useState(0);
    const [selectIdCategory, setSelectIdCategory] = React.useState(null);
    const [SelectCodeCategory, setSelectCodeCategory] = React.useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setSelectIdCategory(null);
        setSelectCodeCategory(null);
    };

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            const isCategoryBox = event.target.closest(
                '[data-category-box="true"]',
            );
            const isActionBtn = event.target.closest(
                '[data-action-prop="true"]',
            );

            if (!isCategoryBox && !isActionBtn) {
                setSelectIdCategory(null);
                setSelectCodeCategory(null);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons
                    sx={{
                        [`& .${tabsClasses.scrollButtons}`]: {
                            "&.Mui-disabled": { opacity: 0.3 },
                        },
                    }}
                >
                    {data?.warehouses?.map((warehouse, index) => (
                        <Tab label={warehouse.name} key={index} />
                    ))}
                </Tabs>
            </Box>
            {data?.warehouses?.map((warehouse, index) => {
                const {
                    totalShelves,
                    fullShelves,
                    partialShelves,
                    emptyShelves,
                    usedPercentage,
                } = calculateStats(warehouse, selectIdCategory);

                return (
                    <TabPanel value={value} index={index} key={index}>
                        <Grid
                            container
                            spacing={2}
                            columns={12}
                            sx={{ mb: (theme) => theme.spacing(2) }}
                        >
                            <Grid
                                size={{ xs: 12, xl: 4 }}
                                sx={{
                                    p: 3,
                                    backgroundColor: "background.paper",
                                    borderRadius: 2.3,
                                    height: "min-content",
                                }}
                            >
                                <Typography component="h3" variant="subtitle1">
                                    {selectIdCategory && SelectCodeCategory
                                        ? `${SelectCodeCategory}-Category Usage`
                                        : "Category Usage"}
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 12, sm: 4.8 }}>
                                        <Gauge
                                            value={usedPercentage}
                                            sx={{
                                                "& .MuiGauge-valueText tspan:nth-of-type(1)":
                                                    {
                                                        fontSize: 19,
                                                        fontWeight: "bold",
                                                        transform:
                                                            "translate(0px, 0px)",
                                                    },
                                                "& .MuiGauge-valueText tspan:nth-of-type(3)":
                                                    {
                                                        fill: "#94a0b8",
                                                        fontSize: 12,
                                                        transform:
                                                            "translate(0px, 0px)",
                                                    },
                                            }}
                                            text={({ value }) =>
                                                `${value}%\n‎ \nLocation Used`
                                            }
                                        />
                                    </Grid>
                                    <Grid
                                        size={{ xs: 12, sm: 7.2 }}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Grid container spacing={2}>
                                            <Grid size={{ xs: 6 }}>
                                                <Typography
                                                    component="h3"
                                                    variant="subtitle1"
                                                >
                                                    {totalShelves}
                                                </Typography>
                                                <Typography
                                                    component="span"
                                                    variant="caption"
                                                    color="#94a0b8"
                                                >
                                                    Total Shelves
                                                </Typography>
                                            </Grid>
                                            <Grid size={{ xs: 6 }}>
                                                <Typography
                                                    component="h3"
                                                    variant="subtitle1"
                                                >
                                                    {emptyShelves}
                                                </Typography>
                                                <Typography
                                                    component="span"
                                                    variant="caption"
                                                    color="#94a0b8"
                                                >
                                                    Empty Shelves
                                                </Typography>
                                            </Grid>
                                            <Grid size={{ xs: 6 }}>
                                                <Typography
                                                    component="h3"
                                                    variant="subtitle1"
                                                >
                                                    {fullShelves}
                                                </Typography>
                                                <Typography
                                                    component="span"
                                                    variant="caption"
                                                    color="#94a0b8"
                                                >
                                                    Full Shelves
                                                </Typography>
                                            </Grid>
                                            <Grid size={{ xs: 6 }}>
                                                <Typography
                                                    component="h3"
                                                    variant="subtitle1"
                                                >
                                                    {partialShelves}
                                                </Typography>
                                                <Typography
                                                    component="span"
                                                    variant="caption"
                                                    color="#94a0b8"
                                                >
                                                    Partially Shelves
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid
                                size={{ xs: 12, xl: 8 }}
                                sx={{
                                    p: 3,
                                    backgroundColor: "background.paper",
                                    borderRadius: 2.3,
                                    height: "min-content",
                                }}
                            >
                                <Grid
                                    container
                                    spacing={2}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        mb: 2,
                                    }}
                                    className="text-center mui_md:text-start"
                                >
                                    <Grid
                                        size={{ xs: 12, md: 4, lg: 6, xl: 5.4 }}
                                    >
                                        <Typography
                                            component="h3"
                                            variant="subtitle1"
                                        >
                                            Category Overview
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        size={{ xs: 12, md: 8, lg: 6, xl: 6.6 }}
                                    >
                                        <Grid
                                            container
                                            spacing={1}
                                            data-action-prop="true"
                                        >
                                            <Grid size={{ xs: 12, sm: 3.88 }}>
                                                <Button
                                                    variant="outlined"
                                                    color="inherit"
                                                    startIcon={<AddIcon />}
                                                    sx={{ maxHeight: "31.5px" }}
                                                >
                                                    Add Category
                                                </Button>
                                            </Grid>
                                            <Grid size={{ xs: 12, sm: 3.85 }}>
                                                <Button
                                                    variant="outlined"
                                                    color="inherit"
                                                    startIcon={
                                                        <EditOutlinedIcon />
                                                    }
                                                    sx={{ maxHeight: "31.5px" }}
                                                >
                                                    Edit Category
                                                </Button>
                                            </Grid>
                                            <Grid size={{ xs: 12, sm: 4.27 }}>
                                                <Button
                                                    variant="outlined"
                                                    color="inherit"
                                                    startIcon={
                                                        <DeleteOutlineOutlinedIcon />
                                                    }
                                                    sx={{
                                                        maxHeight: "31.5px",
                                                    }}
                                                >
                                                    Delete Category
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1}>
                                    {warehouse?.categories?.map(
                                        (category, index) => (
                                            <Grid
                                                size={{ xs: 12, sm: 6, lg: 3 }}
                                                key={index}
                                            >
                                                <Box
                                                    data-category-box="true"
                                                    sx={{
                                                        borderWidth: 2,
                                                        borderColor:
                                                            selectIdCategory ===
                                                            category?.id
                                                                ? "#94a0b8"
                                                                : "divider",
                                                        borderRadius: 2.3,
                                                        p: 2,
                                                        cursor: "pointer",
                                                        "&:hover": {
                                                            borderColor:
                                                                "#94a0b8",
                                                        },
                                                    }}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        if (
                                                            selectIdCategory ===
                                                            category?.id
                                                        ) {
                                                            setSelectIdCategory(
                                                                null,
                                                            );
                                                            setSelectCodeCategory(
                                                                null,
                                                            );
                                                        } else {
                                                            setSelectIdCategory(
                                                                category?.id,
                                                            );
                                                            setSelectCodeCategory(
                                                                category?.code,
                                                            );
                                                        }
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "space-between",
                                                            mb: 2,
                                                        }}
                                                    >
                                                        <Typography
                                                            component="h3"
                                                            variant="subtitle2"
                                                        >
                                                            {category?.name}
                                                        </Typography>
                                                        <Typography
                                                            component="h3"
                                                            variant="subtitle2"
                                                            color="#94a0b8"
                                                        >
                                                            {
                                                                category?.shelves?.filter(
                                                                    (s) =>
                                                                        s.status ===
                                                                            "full" ||
                                                                        s.status ===
                                                                            "partial",
                                                                ).length
                                                            }
                                                            /
                                                            {
                                                                category?.total_shelves
                                                            }
                                                        </Typography>
                                                    </Box>
                                                    <Grid container spacing={1}>
                                                        {category?.shelves?.map(
                                                            (shelve, index) => (
                                                                <Grid
                                                                    size={{
                                                                        xs: 6,
                                                                    }}
                                                                    sx={{
                                                                        backgroundColor:
                                                                            shelve?.status ===
                                                                            "full"
                                                                                ? "#d50000"
                                                                                : shelve?.status ===
                                                                                    "partial"
                                                                                  ? "#ff9800"
                                                                                  : "#cfd8dc",
                                                                        color:
                                                                            shelve?.status ===
                                                                            "partial"
                                                                                ? "#000000"
                                                                                : "#FFFFFF",
                                                                        aspectRatio:
                                                                            "1 / 1",
                                                                        borderRadius: 2.3,
                                                                        display:
                                                                            "flex",
                                                                        alignItems:
                                                                            "center",
                                                                        justifyContent:
                                                                            "center",
                                                                    }}
                                                                    key={index}
                                                                >
                                                                    {
                                                                        shelve.name
                                                                    }
                                                                </Grid>
                                                            ),
                                                        )}
                                                    </Grid>
                                                </Box>
                                            </Grid>
                                        ),
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </TabPanel>
                );
            })}
        </Box>
    );
}
