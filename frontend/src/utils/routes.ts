import {
    AccountBalanceWallet as AccountBalanceWalletIcon,
    Payment as PaymentIcon,
    Tune as TuneIcon
} from "@material-ui/icons";
import { Route } from "./types";
import WireTransactions from "../components/wire-transactions/WireTransactions";
import CashTransactions from "../components/cash-transactions/CashTransactions";
import Preferences from "../components/Preferences";

const routes: Route[] = [
    {
        name: "wire-transactions",
        path: "/wire-transactions",
        displayName: "Безналичные",
        component: WireTransactions,
        iconComponent: PaymentIcon
    },
    {
        name: "cash-transactions",
        path: "/cash-transactions",
        displayName: "Наличные",
        component: CashTransactions,
        iconComponent: AccountBalanceWalletIcon
    },
    {
        name: "preferences",
        path: "/preferences",
        displayName: "Настройки",
        component: Preferences,
        iconComponent: TuneIcon
    }
];

export default routes;