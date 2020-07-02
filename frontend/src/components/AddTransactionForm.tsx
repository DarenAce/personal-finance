import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@material-ui/core";

export default function AddTransactionForm(props: { open: boolean, handleClose: () => void }) {
    // const [open, setOpen] = React.useState(false);

    // const handleClose = () => {
    //     setOpen(false);
    // };

    const { open, handleClose } = props;

    return <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="add-expense-title"
    >
        <DialogTitle id="add-expense-title">Добавление расхода</DialogTitle>
        <DialogContent>
            <TextField id="add-expense-date" label="Дата" />
            <TextField id="add-expense-sum" label="Сумма" />
            <TextField id="add-expense-description" label="Описание" />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Добавить</Button>
            <Button color="secondary" onClick={handleClose}>Отмена</Button>
        </DialogActions>
    </Dialog>;
};
