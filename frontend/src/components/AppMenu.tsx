import React from "react";
import clsx from "clsx";
import {
    createStyles,
    Divider,
    Drawer,
    IconButton,
    List,
    makeStyles,
    Theme,
    useTheme
} from "@material-ui/core";
import {
    AccountBalanceWallet as AccountBalanceWalletIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    Payment as PaymentIcon,
    Tune as TuneIcon
} from "@material-ui/icons";
import ListItemLink from "./ListItemLink";

interface AppMenuProps {
    width: number;
    isOpen: boolean;
    closeMenu: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        menu: {
            flexShrink: 0,
            whiteSpace: 'nowrap'
        },
        menuOpen: {
            width: (props: AppMenuProps) => props.width,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            })
        },
        menuClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9) + 1,
            }
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar
        }
    }));

export default function AppMenu(props: AppMenuProps) {
    const classes = useStyles(props);
    const theme = useTheme();
    const { isOpen, closeMenu } = props;

    return <Drawer
        variant="permanent"
        className={clsx(classes.menu, {
            [classes.menuOpen]: isOpen,
            [classes.menuClose]: !isOpen
        })}
        classes={{
            paper: clsx({
                [classes.menuOpen]: isOpen,
                [classes.menuClose]: !isOpen
            })
        }}
    >
        <div className={classes.toolbar}>
            <IconButton onClick={closeMenu}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
        </div>
        <Divider />
        <List aria-label="application menu">
            <ListItemLink to="/expenses" primary="Расходы" icon={<PaymentIcon />} />
            <ListItemLink to="/incomes" primary="Доходы" icon={<AccountBalanceWalletIcon />} />
            <ListItemLink to="/preferences" primary="Настройки" icon={<TuneIcon />} />
        </List>
        <Divider />
    </Drawer>;
}
