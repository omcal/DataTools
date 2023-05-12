import React from 'react';
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: '#3f51b5', // You can change the color to match your theme
    },
    title: {
        flexGrow: 1,
    },
    navLink: {
        marginRight: theme.spacing(2),
    },
}));


function Header() {
    const classes = useStyles();
    const MAIN_TOOL_URL = "https://bbm479.vercel.app/"
    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar>
                <div className={classes.title}>
                    <Typography variant="h6">
                        AHP Data Tool Selection
                    </Typography>
                    <Typography variant="h6">
                        <Button color="inherit" href={MAIN_TOOL_URL} className={classes.navLink}>
                            Main Tool
                        </Button>
                    </Typography>
                </div>
                <Typography variant="subtitle1">
                    Choose parameters and make decisions based on your preferences
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
