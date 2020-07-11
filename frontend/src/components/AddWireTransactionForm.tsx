import React, {
    ChangeEvent,
    useState
} from "react";
import {
    useMutation,
    useQuery
} from "@apollo/client";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField
} from "@material-ui/core";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import {
    AccountsQueryResult,
    CardsQueryResult,
    CategoriesQueryResult,
    CurrenciesQueryResult,
    NewTransactionDetails,
    Transaction
} from "../utils/types";
import {
    ALL_ACCOUNTS_QUERY,
    ALL_CARDS_QUERY,
    ALL_CATEGORIES_QUERY,
    ALL_CURRENCIES_QUERY,
    ADD_WIRE_TRANSACTION_MUTATION
} from "../utils/api";

interface AddWireTransactionFormProps {
    isOpen: boolean;
    onCloseCallback: () => void;
}

export default function AddWireTransactionForm(props: AddWireTransactionFormProps) {
    const { isOpen, onCloseCallback } = props;

    const [account, setAccount] = useState<string>("");
    const [card, setCard] = useState<string>("");
    const [currency, setCurrency] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [sum, setSum] = useState<number>(0);
    const [sumInAccountCurrency, setSumInAccountCurrency] = useState<number>(0);
    const [transactionDate, setTransactionDate] = useState<Date | null>(null);
    const [processedDate, setProcessedDate] = useState<Date | null>(null);
    const [description, setDescription] = useState<string>("");
    const [comment, setComment] = useState<string>("");

    const [isAccountCorrect, setAccountCorrect] = useState<boolean>(true);
    const [isCurrencyCorrect, setCurrencyCorrect] = useState<boolean>(true);
    const [isCategoryCorrect, setCategoryCorrect] = useState<boolean>(true);
    const [isSumCorrect, setSumCorrect] = useState<boolean>(true);
    const [isSumInAccountCurrencyCorrect, setSumInAccountCurrencyCorrect] = useState<boolean>(true);
    const [isTransactionDateCorrect, setTransactionDateCorrect] = useState<boolean>(true);
    const [isProcessedDateCorrect, setProcessedDateCorrect] = useState<boolean>(true);
    const [isDescriptionCorrect, setDescriptionCorrect] = useState<boolean>(true);

    const [accountHelperText, setAccountHelperText] = useState<string>(" ");
    const [currencyHelperText, setCurrencyHelperText] = useState<string>(" ");
    const [categoryHelperText, setCategoryHelperText] = useState<string>(" ");
    const [sumHelperText, setSumHelperText] = useState<string>(" ");
    const [sumInAccountCurrencyHelperText, setSumInAccountCurrencyHelperText] = useState<string>(" ");
    const [descriptionHelperText, setDescriptionHelperText] = useState<string>(" ");

    const [saveTransaction, { error, data }] = useMutation<
        { created: Transaction },
        { transaction: NewTransactionDetails }
    >(ADD_WIRE_TRANSACTION_MUTATION, {
        variables: {
            transaction: {
                account,
                card,
                currency,
                category,
                sum,
                sumInAccountCurrency,
                transactionDate: transactionDate ? transactionDate : new Date(),
                processedDate: processedDate ? processedDate : new Date(),
                description,
                comment
            }
        }
    });

    const accountsQuery = useQuery<AccountsQueryResult, null>(ALL_ACCOUNTS_QUERY);
    const cardsQuery = useQuery<CardsQueryResult, null>(ALL_CARDS_QUERY);
    const currenciesQuery = useQuery<CurrenciesQueryResult, null>(ALL_CURRENCIES_QUERY);
    const categoriesQuery = useQuery<CategoriesQueryResult, null>(ALL_CATEGORIES_QUERY);

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

    const handleCardChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCard(event.target.value);
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

    const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
        const category = event.target.value;
        setCategory(category);
        const isCorrect = category !== null && category != undefined && category.length > 0;
        setCategoryCorrect(isCorrect);
        if (isCorrect) {
            setCategoryHelperText(" ");
        } else {
            setCategoryHelperText("Выберите категорию");
        }
    };

    const handleSumChange = (event: ChangeEvent<HTMLInputElement>) => {
        const sum = parseFloat(event.target.value);
        const isCorrect = sum !== NaN;
        setSumCorrect(isCorrect);
        if (isCorrect) {
            setSum(sum);
            setSumHelperText(" ");
        } else {
            setSumHelperText("Некорретный формат числа");
        }
    };

    const handleSumInAccountCurrencyChange = (event: ChangeEvent<HTMLInputElement>) => {
        const sum = parseFloat(event.target.value);
        const isCorrect = sum !== NaN;
        setSumInAccountCurrencyCorrect(isCorrect);
        if (isCorrect) {
            setSumInAccountCurrency(sum);
            setSumInAccountCurrencyHelperText(" ");
        } else {
            setSumInAccountCurrencyHelperText("Некорретный формат числа");
        }
    };

    const handleTransactionDateChange = (date: Date | null) => {
        date && setTransactionDate(date);
    };

    const handleProcessedDateChange = (date: Date | null) => {
        date && setProcessedDate(date);
    };

    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        const description = event.target.value;
        setDescription(description);
        const isCorrect = description !== null && description != undefined && description.length > 0;
        setDescriptionCorrect(isCorrect);
        if (isCorrect) {
            setDescriptionHelperText(" ");
        } else {
            setDescriptionHelperText("Введите описание");
        }
    };

    const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    };

    const handleClose = () => {
        clearFields();
        onCloseCallback();
    };

    const handleSubmit = () => {
        isAccountCorrect
            && isCurrencyCorrect
            && isCategoryCorrect
            && isSumCorrect
            && isSumInAccountCurrencyCorrect
            && isTransactionDateCorrect
            && isProcessedDateCorrect
            && isDescriptionCorrect
            && saveTransaction();
        clearFields();
        onCloseCallback();
    };

    const clearFields = () => {
        setAccount("");
        setCard("");
        setCurrency("");
        setCategory("");
        setSum(0);
        setSumInAccountCurrency(0);
        setTransactionDate(null);
        setProcessedDate(null);
        setDescription("");
        setComment("");
    };

    return <Dialog
        open={isOpen}
        onClose={onCloseCallback}
        aria-labelledby="add-wire-transaction-title"
    >
        <DialogTitle id="add-wire-transaction-title">Добавление безналичной транзакции</DialogTitle>
        <DialogContent>
            <TextField
                id="add-wire-transaction-account"
                select
                name="account"
                label="Счёт"
                value={account}
                onChange={handleAccountChange}
                error={!isAccountCorrect}
                helperText={accountHelperText}
                autoFocus
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
                id="add-wire-transaction-card"
                select
                name="card"
                label="Карта"
                value={card}
                onChange={handleCardChange}
                helperText=" "
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            >
                {cardsQuery.data && cardsQuery.data.allCards.map(card => (
                    <MenuItem key={card.id} value={card.id}>
                        {card.number + " | " + card.description}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                id="add-wire-transaction-currency"
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
                id="add-wire-transaction-category"
                select
                name="category"
                label="Категория"
                value={category}
                onChange={handleCategoryChange}
                error={!isCategoryCorrect}
                helperText={categoryHelperText}
                required
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            >
                {categoriesQuery.data && categoriesQuery.data.allCategories.map(category => (
                    <MenuItem key={category.id} value={category.id}>
                        {category.name}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                id="add-wire-transaction-sum"
                name="sum"
                label="Сумма"
                value={sum}
                onChange={handleSumChange}
                error={!isSumCorrect}
                helperText={sumHelperText}
                type="number"
                required
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                id="add-wire-transaction-sum-in-account-currency"
                name="sum-in-account-currency"
                label="Сумма в валюте счёта"
                value={sumInAccountCurrency}
                onChange={handleSumInAccountCurrencyChange}
                error={!isSumInAccountCurrencyCorrect}
                helperText={sumInAccountCurrencyHelperText}
                type="number"
                required
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <KeyboardDateTimePicker
                id="add-person-transaction-date"
                name="transaction-date"
                label="Дата транзакции"
                value={transactionDate}
                onChange={handleTransactionDateChange}
                required
                disableFuture
                ampm={false}
                format="dd.MM.yyyy hh:mm:ss"
                invalidDateMessage="Неверный формат даты"
                minDateMessage="Дата транзакции не должна быть раньше, чем 01.01.1900"
                maxDate={new Date()}
                maxDateMessage="Дата транзакции не должна быть позже, чем сегодня"
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                cancelLabel="Отмена"
            />
            <KeyboardDateTimePicker
                id="add-person-processed-date"
                name="processed-date"
                label="Дата обработки"
                value={processedDate}
                onChange={handleProcessedDateChange}
                required
                disableFuture
                ampm={false}
                format="dd.MM.yyyy hh:mm:ss"
                invalidDateMessage="Неверный формат даты"
                minDateMessage="Дата обработки не должна быть раньше, чем 01.01.1900"
                maxDate={new Date()}
                maxDateMessage="Дата обработки не должна быть позже, чем сегодня"
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                cancelLabel="Отмена"
            />
            <TextField
                id="add-wire-transaction-description"
                name="description"
                label="Описание"
                value={description}
                onChange={handleDescriptionChange}
                error={!isDescriptionCorrect}
                helperText={descriptionHelperText}
                required
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                id="add-wire-transaction-comment"
                name="comment"
                label="Комментарий"
                value={comment}
                onChange={handleCommentChange}
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
