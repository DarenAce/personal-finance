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
    Account,
    AccountsQueryResult
} from "../utils/types";
import { ALL_ACCOUNTS_QUERY } from "../utils/api";
import AddAccountForm from "./AddAccountForm";

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

export default function Accounts() {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const { loading, error, data } = useQuery<AccountsQueryResult, null>(ALL_ACCOUNTS_QUERY);
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
        if (data.allAccounts.length === 0) {
            return <TableRow>
                <TableCell colSpan={numberOfColumns} align="center">Счета не найдены</TableCell>
            </TableRow>;
        }
        return data.allAccounts.map((account: Account) =>
            <TableRow key={account.id}>
                <TableCell>{account.number}</TableCell>
                <TableCell>{account.description}</TableCell>
                <TableCell>{account.bank.name}</TableCell>
                <TableCell>{account.owner.fullName}</TableCell>
                <TableCell>{account.currency.sign}</TableCell>
            </TableRow>
        );
    };

    return <>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="таблица счетов">
                <TableHead>
                    <TableRow>
                        <TableCell>Номер</TableCell>
                        <TableCell>Описание</TableCell>
                        <TableCell>Банк</TableCell>
                        <TableCell>Владелец</TableCell>
                        <TableCell>Валюта</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderTableBody(5)}
                </TableBody>
            </Table>
        </TableContainer>
        <Fab size="medium" color="secondary" onClick={handleModalOpen} className={classes.addButton}>
            <AddIcon />
        </Fab>
        <AddAccountForm isOpen={isModalOpen} onCloseCallback={handleModalClose} />
    </>;
};