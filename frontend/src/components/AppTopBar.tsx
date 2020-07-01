import React from "react";
import { useLocation } from "react-router-dom";
import {
    AppBar,
    IconButton,
    Toolbar,
    Typography,
    makeStyles,
    Theme,
    createStyles
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import clsx from "clsx";
import routes from "../utils/routes";

interface AppTopBarProps {
    menuWidth: number;
    isMenuOpen: boolean;
    openMenu: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: (props: AppTopBarProps) => ({
            marginLeft: props.menuWidth,
            width: `calc(100% - ${props.menuWidth}px)`,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            })
        }),
        menuButton: {
            marginRight: theme.spacing(2)
        },
        title: {
            flexGrow: 1
        },
        hide: {
            display: "none",
        }
    })
);

const getTitle = () => {
    const location = useLocation();
    const route = routes.find(route => route.path === location.pathname);
    return route ? route.displayName : "";
}

export default function AppTopBar(props: AppTopBarProps) {
    const { isMenuOpen, openMenu } = props;
    const classes = useStyles(props);

    return <AppBar
        className={clsx(classes.appBar, {
            [classes.appBarShift]: isMenuOpen
        })}
    >
        <Toolbar>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open menu"
                onClick={openMenu}
                className={clsx(classes.menuButton, {
                    [classes.hide]: isMenuOpen
                })}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>{getTitle()}</Typography>
        </Toolbar>
    </AppBar>
};