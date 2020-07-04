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
import AddPersonForm from "./AddPersonForm";
import { Person, PersonsQueryResult } from "../utils/types";
import { ALL_PERSONS_QUERY } from "../utils/api";

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

export default function Persons() {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const { loading, error, data } = useQuery<PersonsQueryResult, null>(ALL_PERSONS_QUERY);
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
        if (data.allPersons.length === 0) {
            return <TableRow>
                <TableCell colSpan={numberOfColumns} align="center">Пользователи не найдены</TableCell>
            </TableRow>;
        }
        return data.allPersons.map((person: Person) =>
            <TableRow key={person.id}>
                <TableCell>{person.firstName}</TableCell>
                <TableCell>{person.middleName}</TableCell>
                <TableCell>{person.lastName}</TableCell>
                <TableCell>{new Date(person.birthday).toLocaleDateString()}</TableCell>
                <TableCell>{person.email}</TableCell>
            </TableRow>
        );
    };

    return <>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="таблица пользователей">
                <TableHead>
                    <TableRow>
                        <TableCell>Имя</TableCell>
                        <TableCell>Отчество</TableCell>
                        <TableCell>Фамилия</TableCell>
                        <TableCell>Дата рождения</TableCell>
                        <TableCell>Email</TableCell>
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
        <AddPersonForm isOpen={isModalOpen} onCloseCallback={handleModalClose} />
    </>;
};