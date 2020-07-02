import React, { useState, ChangeEvent } from "react";
import { useMutation, useQuery } from "react-apollo";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    MenuItem
} from "@material-ui/core";
import { ADD_ACCOUNT_MUTATION, ALL_BANKS_QUERY, ALL_CURRENCIES_QUERY, ALL_PERSONS_QUERY } from "../utils/api";
import { Account, NewAccountDetails, BanksQueryResult, CurrenciesQueryResult, PersonsQueryResult } from "../utils/types";

interface AddAccountFormProps {
    open: boolean;
    handleClose: () => void;
}

export default function AddAccountForm(props: AddAccountFormProps) {
    const { open, handleClose } = props;
    const [number, setNumber] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [bank, setBank] = useState<string>("");
    const [currency, setCurrency] = useState<string>("");
    const [owner, setOwner] = useState<string>("");
    const [isNumberCorrect, setNumberCorrect] = useState<boolean>(true);
    const [isBankCorrect, setBankCorrect] = useState<boolean>(true);
    const [isCurrencyCorrect, setCurrencyCorrect] = useState<boolean>(true);
    const [isOwnerCorrect, setOwnerCorrect] = useState<boolean>(true);
    const [numberHelperText, setNumberHelperText] = useState<string>(" ");
    const [bankHelperText, setBankHelperText] = useState<string>(" ");
    const [currencyHelperText, setCurrencyHelperText] = useState<string>(" ");
    const [ownerHelperText, setOwnerHelperText] = useState<string>(" ");

    const [saveAccount, { error, data }] = useMutation<
        { created: Account },
        { account: NewAccountDetails }
    >(ADD_ACCOUNT_MUTATION, {
        variables: {
            account: {
                number,
                description,
                bank,
                currency,
                owner
            }
        }
    });

    const banksQuery = useQuery<BanksQueryResult, null>(ALL_BANKS_QUERY);
    const currenciesQuery = useQuery<CurrenciesQueryResult, null>(ALL_CURRENCIES_QUERY);
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

    const handleBankChange = (event: ChangeEvent<HTMLInputElement>) => {
        const bank = event.target.value;
        setBank(bank);
        const isCorrect = bank !== null && bank != undefined && bank.length > 0;
        setBankCorrect(isCorrect);
        if (isCorrect) {
            setBankHelperText(" ");
        } else {
            setBankHelperText("Выберите банк");
        }
    };

    const handleCurrencyChange = (event: ChangeEvent<HTMLInputElement>) => {
        const currency = event.target.value;
        setCurrency(currency);
        const isCorrect = currency !== null && currency != undefined && currency.length > 0;
        setCurrencyCorrect(isCorrect);
        if (isCorrect) {
            setCurrencyHelperText(" ");
        } else {
            setCurrencyHelperText("Выберите валюту");
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

    const handleSubmit = () => {
        isNumberCorrect && isBankCorrect && isCurrencyCorrect && isOwnerCorrect && saveAccount();
        handleClose();
    };

    return <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="add-account-title"
    >
        <DialogTitle id="add-account-title">Добавление счёта</DialogTitle>
        <DialogContent>
            <TextField
                id="add-account-number"
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
                id="add-account-bank"
                select
                name="bank"
                label="Банк"
                value={bank}
                onChange={handleBankChange}
                error={!isBankCorrect}
                helperText={bankHelperText}
                required
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            >
                {banksQuery.data && banksQuery.data.allBanks.map(bank => (
                    <MenuItem key={bank.id} value={bank.id}>
                        {bank.name}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                id="add-account-currency"
                select
                name="currency"
                label="Валюта"
                value={currency}
                onChange={handleCurrencyChange}
                error={!isCurrencyCorrect}
                helperText={currencyHelperText}
                required
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            >
                {currenciesQuery.data && currenciesQuery.data.allCurrencies.map(currency => (
                    <MenuItem key={currency.id} value={currency.id}>
                        {currency.sign}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                id="add-account-owner"
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
                id="add-account-description"
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
