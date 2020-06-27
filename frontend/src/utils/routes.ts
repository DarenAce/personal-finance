import { Route } from "./types";
import Expenses from "../components/Expenses";
import Incomes from "../components/Incomes";
import Preferences from "../components/Preferences";

const routes: Route[] = [
    {
        name: "expences",
        path: "/expenses",
        displayName: "Расходы",
        component: Expenses
    },
    {
        name: "incomes",
        path: "/incomes",
        displayName: "Доходы",
        component: Incomes
    },
    {
        name: "preferences",
        path: "/preferences",
        displayName: "Настройки",
        component: Preferences
    }
];

export default routes;