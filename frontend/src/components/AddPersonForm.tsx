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
import { KeyboardDatePicker } from "@material-ui/pickers";
import {
    NewPersonDetails,
    Person
} from "../utils/types";
import { ADD_PERSON_MUTATION } from "../utils/api";

interface AddPersonFormProps {
    isOpen: boolean;
    onCloseCallback: () => void;
}

export default function AddPersonForm(props: AddPersonFormProps) {
    const { isOpen, onCloseCallback } = props;

    const [firstName, setFirstName] = useState<string>("");
    const [middleName, setMiddleName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [birthday, setBirthday] = useState<Date | null>(null);
    const [email, setEmail] = useState<string>("");

    const [isFirstNameCorrect, setFirstNameCorrect] = useState<boolean>(true);
    const [isLastNameCorrect, setLastNameCorrect] = useState<boolean>(true);
    const [isEmailCorrect, setEmailCorrect] = useState<boolean>(true);

    const [firstNameHelperText, setFirstNameHelperText] = useState<string>(" ");
    const [lastNameHelperText, setLastNameHelperText] = useState<string>(" ");
    const [emailHelperText, setEmailHelperText] = useState<string>(" ");

    const [savePerson, { error, data }] = useMutation<
        { created: Person },
        { person: NewPersonDetails }
    >(ADD_PERSON_MUTATION, {
        variables: {
            person: {
                firstName,
                middleName,
                lastName,
                birthday: birthday ? birthday : new Date(),
                email
            }
        }
    });

    const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const firstName = event.target.value;
        setFirstName(firstName);
        const isCorrect = firstName !== null && firstName != undefined && firstName.length > 0;
        setFirstNameCorrect(isCorrect);
        if (isCorrect) {
            setFirstNameHelperText(" ");
        } else {
            setFirstNameHelperText("Введите имя");
        }
    };

    const handleMiddleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMiddleName(event.target.value);
    };

    const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const lastName = event.target.value;
        setLastName(lastName);
        const isCorrect = lastName !== null && lastName != undefined && lastName.length > 0;
        setLastNameCorrect(isCorrect);
        if (isCorrect) {
            setLastNameHelperText(" ");
        } else {
            setLastNameHelperText("Введите фамилию");
        }
    };

    const handleBirthdayChange = (date: Date | null) => {
        date && setBirthday(date);
    };

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        const email = event.target.value;
        setEmail(email);
        const isCorrect = email !== null && email != undefined && email.search(".+@.+") !== -1;
        setEmailCorrect(isCorrect);
        if (isCorrect) {
            setEmailHelperText(" ");
        } else {
            setEmailHelperText("Email должен удовлетворять маске *@*, где * — один или более символов");
        }
    };

    const handleClose = () => {
        clearFields();
        onCloseCallback();
    };

    const handleSubmit = () => {
        isFirstNameCorrect
            && isLastNameCorrect
            && birthday
            && isEmailCorrect
            && savePerson();
        clearFields();
        onCloseCallback();
    };

    const clearFields = () => {
        setFirstName("");
        setMiddleName("");
        setLastName("");
        setBirthday(null);
        setEmail("");
    };

    return <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="add-person-title"
    >
        <DialogTitle id="add-person-title">Добавление пользователя</DialogTitle>
        <DialogContent>
            <TextField
                id="add-person-first-name"
                name="firstName"
                label="Имя"
                value={firstName}
                onChange={handleFirstNameChange}
                error={!isFirstNameCorrect}
                helperText={firstNameHelperText}
                autoFocus
                required
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                id="add-person-middle-name"
                name="middleName"
                label="Отчество"
                value={middleName}
                onChange={handleMiddleNameChange}
                helperText=" "
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                id="add-person-last-name"
                name="lastName"
                label="Фамилия"
                value={lastName}
                onChange={handleLastNameChange}
                error={!isLastNameCorrect}
                helperText={lastNameHelperText}
                required
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <KeyboardDatePicker
                id="add-person-birthday"
                name="birthday"
                label="Дата рождения"
                value={birthday}
                onChange={handleBirthdayChange}
                required
                disableFuture
                format="dd.MM.yyyy"
                invalidDateMessage="Неверный формат даты"
                minDateMessage="Дата рождения не должна быть раньше, чем 01.01.1900"
                maxDate={new Date()}
                maxDateMessage="Дата рождения не должна быть позже, чем сегодня"
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                cancelLabel="Отмена"
            ></KeyboardDatePicker>
            <TextField
                id="add-person-email"
                name="email"
                label="Email"
                value={email}
                onChange={handleEmailChange}
                error={!isEmailCorrect}
                helperText={emailHelperText}
                type="email"
                required
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
