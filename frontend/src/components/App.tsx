import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache
} from "@apollo/client";
import DateFnsUtils from "@date-io/date-fns";
import {
    createStyles,
    CssBaseline,
    makeStyles,
    Theme
} from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { API_URL } from "../utils/api";
import routes from "../utils/routes";
import AppMenu from "./AppMenu";
import AppTopBar from "./AppTopBar";

const menuWidth: number = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex"
        },
        appBarSpacer: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        }
    })
);

export default function App() {
    const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
    const client = new ApolloClient({
        uri: API_URL,
        cache: new InMemoryCache()
    });
    const classes = useStyles();

    const openMenu = () => {
        setMenuOpen(true);
    }

    const closeMenu = () => {
        setMenuOpen(false);
    }

    return <ApolloProvider client={client}>
        <Router>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div className={classes.root}>
                    <CssBaseline />
                    <AppTopBar menuWidth={menuWidth} isMenuOpen={isMenuOpen} openMenu={openMenu} />
                    <AppMenu width={menuWidth} isOpen={isMenuOpen} closeMenu={closeMenu} />
                    <main className={classes.content}>
                        <div className={classes.appBarSpacer}></div>
                        <Switch>
                            {routes.map(route => <Route exact path={route.path} component={route.component} key={route.name} />)}
                            <Redirect from="/" to={routes[0].path} />
                        </Switch>
                    </main>
                </div>
            </MuiPickersUtilsProvider>
        </Router>
    </ApolloProvider>;
};
