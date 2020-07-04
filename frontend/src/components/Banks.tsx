import React, { useState } from "react";
import { useQuery } from "react-apollo";
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
import { BankQuery, BanksQueryResult } from "../utils/types";
import { ALL_BANKS_QUERY } from "../utils/api";
import AddBankForm from "./AddBankForm";

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
    const { loading, error, data } = useQuery<BanksQueryResult, null>(ALL_BANKS_QUERY);
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
        if (data.allBanks.length === 0) {
            return <TableRow>
                <TableCell colSpan={numberOfColumns} align="center">Банки не найдены</TableCell>
            </TableRow>;
        }
        return data.allBanks.map((bank: BankQuery) =>
            <TableRow key={bank.id}>
                <TableCell>{bank.name}</TableCell>
                <TableCell>{bank.description}</TableCell>
            </TableRow>
        );
    };

    return <>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="таблица банков">
                <TableHead>
                    <TableRow>
                        <TableCell>Название</TableCell>
                        <TableCell>Описание</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderTableBody(2)}
                </TableBody>
            </Table>
        </TableContainer>
        <Fab size="medium" color="secondary" onClick={handleModalOpen} className={classes.addButton}>
            <AddIcon />
        </Fab>
        <AddBankForm isOpen={isModalOpen} onCloseCallback={handleModalClose} />
    </>;
};