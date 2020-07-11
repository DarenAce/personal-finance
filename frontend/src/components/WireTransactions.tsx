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
    Transaction,
    TransactionsQueryResult
} from "../utils/types";
import { ALL_WIRE_TRANSACTIONS_QUERY } from "../utils/api";
import AddWireTransactionForm from "./AddWireTransactionForm";

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

export default function Expenses() {
    const [isModalOpen, setModalOpen] = useState(false);
    const { loading, error, data } = useQuery<TransactionsQueryResult, null>(ALL_WIRE_TRANSACTIONS_QUERY);
    const classes = useStyles();

    const handleOpen = () => {
        setModalOpen(true);
    };

    const handleClose = () => {
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
        if (data.allTransactions.length === 0) {
            return <TableRow>
                <TableCell colSpan={numberOfColumns} align="center">Транзакции не найдены</TableCell>
            </TableRow>;
        }
        return data.allTransactions.map((transaction: Transaction) =>
            <TableRow key={transaction.id}>
                <TableCell>{transaction.account.bank.name}</TableCell>
                <TableCell>{transaction.account.description}</TableCell>
                <TableCell>{transaction.card ? transaction.card.description : ""}</TableCell>
                <TableCell>{new Date(transaction.transactionDate).toLocaleDateString()}</TableCell>
                <TableCell>{transaction.sum.toLocaleString()}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.category.name}</TableCell>
                <TableCell>{transaction.comment}</TableCell>
            </TableRow>
        );
    };

    return <>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="таблица расходов">
                <TableHead>
                    <TableRow>
                        <TableCell>Банк</TableCell>
                        <TableCell>Счёт</TableCell>
                        <TableCell>Карта</TableCell>
                        <TableCell>Дата</TableCell>
                        <TableCell>Сумма</TableCell>
                        <TableCell>Назначение</TableCell>
                        <TableCell>Категория</TableCell>
                        <TableCell>Комментарий</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderTableBody(8)}
                </TableBody>
            </Table>
        </TableContainer>
        <Fab size="medium" color="secondary" onClick={handleOpen} className={classes.addButton}>
            <AddIcon />
        </Fab>
        <AddWireTransactionForm isOpen={isModalOpen} onCloseCallback={handleClose} />
    </>
};
