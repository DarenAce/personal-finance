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
import { CategoriesQueryResult, CategoryQuery } from "../utils/types";
import { ALL_CATEGORIES_QUERY } from "../utils/api";
import AddCategoryForm from "./AddCategoryForm";

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

export default function Categories() {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);    
    const { loading, error, data } = useQuery<CategoriesQueryResult, null>(ALL_CATEGORIES_QUERY);
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
        if (data.allCategories.length === 0) {
            return <TableRow>
                <TableCell colSpan={numberOfColumns} align="center">Категории не найдены</TableCell>
            </TableRow>;
        }
        return data.allCategories.map((category: CategoryQuery) =>
            <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
            </TableRow>
        );
    };

    return <>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="таблица категорий">
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
        <AddCategoryForm open={isModalOpen} handleClose={handleModalClose} />
    </>;
};