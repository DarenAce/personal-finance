import React, { createElement } from "react";
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
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon
} from "@material-ui/icons";
import routes from "../utils/routes";
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
            {routes.map(route => (
                <ListItemLink to={route.path} primary={route.displayName} icon={createElement(route.iconComponent)} key={route.name} />
            ))}
        </List>
        <Divider />
    </Drawer>;
}
