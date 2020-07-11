import React, {
    ChangeEvent,
    useState
} from "react";
import { useMutation } from "@apollo/client";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@material-ui/core";
import {
    Bank,
    NewBankDetails
} from "../utils/types";
import { ADD_BANK_MUTATION } from "../utils/api";

interface AddBankFormProps {
    isOpen: boolean;
    onCloseCallback: () => void;
}

export default function AddBankForm(props: AddBankFormProps) {
    const { isOpen, onCloseCallback } = props;

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const [isNameCorrect, setNameCorrect] = useState<boolean>(true);
    const [isDescriptionCorrect, setDescriptionCorrect] = useState<boolean>(true);

    const [nameHelperText, setNameHelperText] = useState<string>(" ");

    const [saveBank, { error, data }] = useMutation<
        { created: Bank },
        { bank: NewBankDetails }
    >(ADD_BANK_MUTATION, {
        variables: {
            bank: {
                name,
                description
            }
        }
    });

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value;
        setName(name);
        const isCorrect = name !== null && name != undefined && name.length > 0;
        setNameCorrect(isCorrect);
        if (isCorrect) {
            setNameHelperText(" ");
        } else {
            setNameHelperText("Введите название");
        }
    };

    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleClose = () => {
        clearFields();
        onCloseCallback();
    };

    const handleSubmit = () => {
        isNameCorrect && saveBank();
        clearFields();
        onCloseCallback();
    };

    const clearFields = () => {
        setName("");
        setDescription("");
    };

    return <Dialog
        open={isOpen}
        onClose={onCloseCallback}
        aria-labelledby="add-bank-title"
    >
        <DialogTitle id="add-bank-title">Добавление банка</DialogTitle>
        <DialogContent>
            <TextField
                id="add-bank-name"
                name="name"
                label="Название"
                value={name}
                onChange={handleNameChange}
                error={!isNameCorrect}
                helperText={nameHelperText}
                autoFocus
                required
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                id="add-bank-description"
                name="description"
                label="Описание"
                value={description}
                onChange={handleDescriptionChange}
                error={!isDescriptionCorrect}
                helperText=" "
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Отмена</Button>
            <Button onClick={handleSubmit}>Ok</Button>
        </DialogActions>
    </Dialog>;
};
