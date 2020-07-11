import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import {
    createStyles,
    Fab,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Theme
} from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import {
    CurrenciesQueryResult,
    Currency
} from "../utils/types";
import { ALL_CURRENCIES_QUERY } from "../utils/api";
import AddCurrencyForm from "./AddCurrencyForm";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table: {
            minWidth: 650
        },
        addButton: {
            position: "absolute",
            bottom: theme.spacing(2),
            right: theme.spacing(2)
        }
    })
);

export default function Currencies() {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const { loading, error, data } = useQuery<CurrenciesQueryResult, null>(ALL_CURRENCIES_QUERY);
    const classes = useStyles();

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const renderTableBody = (numberOfColumns: number) => {
        if (loading) {
            return <TableRow>
                <TableCell colSpan={numberOfColumns} align="center">Загрузка...</TableCell>
            </TableRow>;
        }
        if (error || !data) {
            return <TableRow>
                <TableCell colSpan={numberOfColumns} align="center">Ошибка загрузки</TableCell>
            </TableRow>;
        }
        if (data.allCurrencies.length === 0) {
            return <TableRow>
                <TableCell colSpan={numberOfColumns} align="center">Валюты не найдены</TableCell>
            </TableRow>;
        }
        return data.allCurrencies.map((currency: Currency) =>
            <TableRow key={currency.id}>
                <TableCell>{currency.code}</TableCell>
                <TableCell>{currency.country}</TableCell>
                <TableCell>{currency.sign}</TableCell>
            </TableRow>
        );
    };

    return <>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="таблица валют">
                <TableHead>
                    <TableRow>
                        <TableCell>Код</TableCell>
                        <TableCell>Код страны</TableCell>
                        <TableCell>Знак</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderTableBody(3)}
                </TableBody>
            </Table>
        </TableContainer>
        <Fab size="medium" color="secondary" onClick={handleModalOpen} className={classes.addButton}>
            <AddIcon />
        </Fab>
        <AddCurrencyForm isOpen={isModalOpen} onCloseCallback={handleModalClose} />
    </>;
};