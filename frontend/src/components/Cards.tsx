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
import { Card, CardsQueryResult } from "../utils/types";
import { ALL_CARDS_QUERY } from "../utils/api";
import AddCardForm from "./AddCardForm";

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

export default function Cards() {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);    
    const { loading, error, data } = useQuery<CardsQueryResult, null>(ALL_CARDS_QUERY);
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
        if (data.allCards.length === 0) {
            return <TableRow>
                <TableCell colSpan={numberOfColumns} align="center">Карты не найдены</TableCell>
            </TableRow>;
        }
        return data.allCards.map((card: Card) =>
            <TableRow key={card.id}>
                <TableCell>{card.number}</TableCell>
                <TableCell>{card.description}</TableCell>
                <TableCell>{card.account.number}</TableCell>
                <TableCell>{card.account.description}</TableCell>
                <TableCell>{card.owner.fullName}</TableCell>
            </TableRow>
        );
    };

    return <>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="таблица карт">
                <TableHead>
                    <TableRow>
                        <TableCell>Номер</TableCell>
                        <TableCell>Описание</TableCell>
                        <TableCell>Номер счёта</TableCell>
                        <TableCell>Описание счёта</TableCell>
                        <TableCell>Владелец</TableCell>
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
        <AddCardForm isOpen={isModalOpen} onCloseCallback={handleModalClose} />
    </>;
};