import React, {
    ChangeEvent,
    useState
} from "react";
import {
    useQuery,
    useMutation
} from "@apollo/client";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    MenuItem
} from "@material-ui/core";
import {
    AccountsQueryResult,
    Card,
    NewCardDetails,
    PersonsQueryResult
} from "../../utils/types";
import {
    ADD_CARD_MUTATION,
    ALL_ACCOUNTS_QUERY,
    ALL_PERSONS_QUERY
} from "../../utils/api";

interface AddCardFormProps {
    isOpen: boolean;
    onCloseCallback: (wasAdded: boolean) => void;
}

export default function AddCardForm(props: AddCardFormProps) {
    const { isOpen, onCloseCallback } = props;

    const [number, setNumber] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [account, setAccount] = useState<string>("");
    const [owner, setOwner] = useState<string>("");

    const [isNumberCorrect, setNumberCorrect] = useState<boolean>(true);
    const [isAccountCorrect, setAccountCorrect] = useState<boolean>(true);
    const [isOwnerCorrect, setOwnerCorrect] = useState<boolean>(true);

    const [numberHelperText, setNumberHelperText] = useState<string>(" ");
    const [accountHelperText, setAccountHelperText] = useState<string>(" ");
    const [ownerHelperText, setOwnerHelperText] = useState<string>(" ");

    const [saveCard, { error, data }] = useMutation<
        { created: Card },
        { card: NewCardDetails }
    >(ADD_CARD_MUTATION, {
        variables: {
            card: {
                number,
                description,
                account,
                owner
            }
        }
    });

    const accountsQuery = useQuery<AccountsQueryResult, null>(ALL_ACCOUNTS_QUERY);
    const personsQuery = useQuery<PersonsQueryResult, null>(ALL_PERSONS_QUERY);

    const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        const number = event.target.value;
        setNumber(number);
        const isCorrect = number !== null && number != undefined && number.length > 0;
        setNumberCorrect(isCorrect);
        if (isCorrect) {
            setNumberHelperText(" ");
        } else {
            setNumberHelperText("Введите номер");
        }
    };

    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleAccountChange = (event: ChangeEvent<HTMLInputElement>) => {
        const account = event.target.value;
        setAccount(account);
        const isCorrect = account !== null && account != undefined && account.length > 0;
        setAccountCorrect(isCorrect);
        if (isCorrect) {
            setAccountHelperText(" ");
        } else {
            setAccountHelperText("Выберите счёт");
        }
    };

    const handleOwnerChange = (event: ChangeEvent<HTMLInputElement>) => {
        const owner = event.target.value;
        setOwner(owner);
        const isCorrect = owner !== null && owner != undefined && owner.length > 0;
        setOwnerCorrect(isCorrect);
        if (isCorrect) {
            setOwnerHelperText(" ");
        } else {
            setOwnerHelperText("Выберите владельца");
        }
    };

    const handleClose = () => {
        clearFields();
        onCloseCallback(false);
    };

    const handleSubmit = () => {
        isNumberCorrect
            && isAccountCorrect
            && isOwnerCorrect
            && saveCard();
        clearFields();
        onCloseCallback(true);
    };

    const clearFields = () => {
        setNumber("");
        setDescription("");
        setAccount("");
        setOwner("");
    };

    return <Dialog
        open={isOpen}
        onClose={onCloseCallback}
        aria-labelledby="add-card-title"
    >
        <DialogTitle id="add-card-title">Добавление карты</DialogTitle>
        <DialogContent>
            <TextField
                id="add-card-number"
                name="number"
                label="Номер"
                value={number}
                onChange={handleNumberChange}
                error={!isNumberCorrect}
                helperText={numberHelperText}
                autoFocus
                required
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                id="add-card-account"
                select
                name="account"
                label="Счёт"
                value={account}
                onChange={handleAccountChange}
                error={!isAccountCorrect}
                helperText={accountHelperText}
                required
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            >
                {accountsQuery.data && accountsQuery.data.allAccounts.map(account => (
                    <MenuItem key={account.id} value={account.id}>
                        {account.number + " | " + account.description}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                id="add-card-owner"
                select
                name="owner"
                label="Владелец"
                value={owner}
                onChange={handleOwnerChange}
                error={!isOwnerCorrect}
                helperText={ownerHelperText}
                required
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            >
                {personsQuery.data && personsQuery.data.allPersons.map(person => (
                    <MenuItem key={person.id} value={person.id}>
                        {person.fullName}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                id="add-card-description"
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
