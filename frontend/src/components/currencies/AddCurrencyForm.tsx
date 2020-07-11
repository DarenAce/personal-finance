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
    Currency,
    NewCurrencyDetails
} from "../../utils/types";
import { ADD_CURRENCY_MUTATION } from "../../utils/api";

interface AddCurrencyFormProps {
    isOpen: boolean;
    onCloseCallback: (wasAdded: boolean) => void;
}

export default function AddCurrencyForm(props: AddCurrencyFormProps) {
    const { isOpen, onCloseCallback } = props;

    const [code, setCode] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [sign, setSign] = useState<string>("");

    const [isCodeCorrect, setCodeCorrect] = useState<boolean>(true);
    const [isCountryCorrect, setCountryCorrect] = useState<boolean>(true);
    const [isSignCorrect, setSignCorrect] = useState<boolean>(true);

    const [codeHelperText, setCodeHelperText] = useState<string>(" ");
    const [countryHelperText, setCountryHelperText] = useState<string>(" ");
    const [signHelperText, setSignHelperText] = useState<string>(" ");

    const [saveCurrency, { error, data }] = useMutation<
        { created: Currency },
        { currency: NewCurrencyDetails }
    >(ADD_CURRENCY_MUTATION, {
        variables: {
            currency: {
                code,
                country,
                sign
            }
        }
    });

    const handleCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const code = event.target.value;
        setCode(code);
        const isCorrect = code !== null && code != undefined && code.length > 0;
        setCodeCorrect(isCorrect);
        if (isCorrect) {
            setCodeHelperText(" ");
        } else {
            setCodeHelperText("Введите код");
        }
    };

    const handleCountryChange = (event: ChangeEvent<HTMLInputElement>) => {
        const country = event.target.value;
        setCountry(country);
        const isCorrect = country !== null && country != undefined && country.length > 0;
        setCountryCorrect(isCorrect);
        if (isCorrect) {
            setCountryHelperText(" ");
        } else {
            setCountryHelperText("Введите код страны");
        }
    };

    const handleSignChange = (event: ChangeEvent<HTMLInputElement>) => {
        const sign = event.target.value;
        setSign(sign);
        const isCorrect = sign !== null && sign != undefined && sign.length > 0;
        setSignCorrect(isCorrect);
        if (isCorrect) {
            setSignHelperText(" ");
        } else {
            setSignHelperText("Введите знак");
        }
    };

    const handleClose = () => {
        clearFields();
        onCloseCallback(false);
    };

    const handleSubmit = () => {
        isCodeCorrect
            && isCountryCorrect
            && isSignCorrect
            && saveCurrency();
        clearFields();
        onCloseCallback(true);
    };

    const clearFields = () => {
        setCode("");
        setCountry("");
        setSign("");
    };

    return <Dialog
        open={isOpen}
        onClose={onCloseCallback}
        aria-labelledby="add-currency-title"
    >
        <DialogTitle id="add-currency-title">Добавление валюты</DialogTitle>
        <DialogContent>
            <TextField
                id="add-currency-code"
                name="code"
                label="Код"
                value={code}
                onChange={handleCodeChange}
                error={!isCodeCorrect}
                helperText={codeHelperText}
                autoFocus
                required
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                id="add-currency-country"
                name="country"
                label="Код страны"
                value={country}
                onChange={handleCountryChange}
                error={!isCountryCorrect}
                helperText={countryHelperText}
                required
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                id="add-currency-sign"
                name="sign"
                label="Знак"
                value={sign}
                onChange={handleSignChange}
                error={!isSignCorrect}
                helperText={signHelperText}
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
