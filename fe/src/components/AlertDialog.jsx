import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({
    open,
    handleClose,
    title,
    description,
    agreeText,
    disagreeText,
    agreeAction,
}) {
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                data-action-prop="true"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{disagreeText}</Button>
                    <Button onClick={agreeAction} autoFocus>
                        {agreeText}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
