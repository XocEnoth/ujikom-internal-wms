import MUILink from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router";

export default function Copyright(props) {
    return (
        <Typography
            variant="body2"
            align="center"
            {...props}
            sx={[
                {
                    color: "text.secondary",
                },
                ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
            ]}
        >
            {"Copyright © "}
            {`${new Date().getFullYear()} `}
            <MUILink color="inherit" component="span">
                <NavLink to={"/dashboard"}>Warehouse Management System</NavLink>
            </MUILink>
            {". All rights reserved."}
        </Typography>
    );
}
