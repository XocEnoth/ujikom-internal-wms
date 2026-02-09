import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import signin from "../actions/signin";

const Card = styled(MuiCard)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: "auto",
    [theme.breakpoints.up("sm")]: {
        maxWidth: "450px",
    },
    boxShadow:
        "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
    ...theme.applyStyles("dark", {
        boxShadow:
            "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
    }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
    height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
    minHeight: "100%",
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(4),
    },
    "&::before": {
        content: '""',
        display: "block",
        position: "absolute",
        zIndex: -1,
        inset: 0,
        backgroundImage:
            "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
        backgroundRepeat: "no-repeat",
        ...theme.applyStyles("dark", {
            backgroundImage:
                "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
        }),
    },
}));

export default function Index() {
    const navigate = useNavigate();

    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await signin(username, password);
        if (response?.status === 200) {
            navigate("/warehouses");
        } else {
            setSnackbarOpen(true);
            setSnackbarMessage(response?.data?.message);
            setUsername("");
            setPassword("");
        }
    };

    return (
        <>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <AppTheme>
                <CssBaseline enableColorScheme />
                <SignInContainer
                    direction="column"
                    justifyContent="space-between"
                >
                    <ColorModeSelect
                        sx={{
                            position: "fixed",
                            top: "1rem",
                            right: "1rem",
                            zIndex: "1",
                        }}
                    />
                    <Card variant="outlined">
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{
                                width: "100%",
                                fontSize: "clamp(2rem, 10vw, 2.15rem)",
                            }}
                        >
                            Sign in
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate
                            autoComplete="off"
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                gap: 2,
                            }}
                        >
                            <FormControl>
                                <FormLabel htmlFor="username">
                                    Username
                                </FormLabel>
                                <TextField
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="username"
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    value={username}
                                    autoFocus
                                    fullWidth
                                    variant="outlined"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="password">
                                    Password
                                </FormLabel>
                                <TextField
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    value={password}
                                    fullWidth
                                    variant="outlined"
                                />
                            </FormControl>
                            <Button type="submit" fullWidth variant="contained">
                                Sign in
                            </Button>
                        </Box>
                    </Card>
                </SignInContainer>
            </AppTheme>
        </>
    );
}
