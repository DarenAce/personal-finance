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
    Category,
    NewCategoryDetails
} from "../../utils/types";
import { ADD_CATEGORY_MUTATION } from "../../utils/api";

interface AddCategoryFormProps {
    isOpen: boolean;
    onCloseCallback: (wasAdded: boolean) => void;
}

export default function AddCategoryForm(props: AddCategoryFormProps) {
    const { isOpen, onCloseCallback } = props;

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const [isNameCorrect, setNameCorrect] = useState<boolean>(true);

    const [nameHelperText, setNameHelperText] = useState<string>(" ");

    const [saveCategory, { error, data }] = useMutation<
        { created: Category },
        { category: NewCategoryDetails }
    >(ADD_CATEGORY_MUTATION, {
        variables: {
            category: {
                name,
                description
            }
        }
    });

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const code = event.target.value;
        setName(code);
        const isCorrect = code !== null && code != undefined && code.length > 0;
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
        onCloseCallback(false);
    };

    const handleSubmit = () => {
        isNameCorrect && saveCategory();
        clearFields();
        onCloseCallback(true);
    };

    const clearFields = () => {
        setName("");
        setDescription("");
    };

    return <Dialog
        open={isOpen}
        onClose={onCloseCallback}
        aria-labelledby="add-category-title"
    >
        <DialogTitle id="add-category-title">Добавление категории</DialogTitle>
        <DialogContent>
            <TextField
                id="add-category-name"
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
                id="add-category-description"
                name="description"
                label="Описание"
                value={description}
                onChange={handleDescriptionChange}
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
