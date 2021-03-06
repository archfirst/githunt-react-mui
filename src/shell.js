import React from 'react';
import { createStyleSheet, withStyles } from 'material-ui/styles';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Titlebar } from './core/components';
import { FeedPage } from './features';
// import DevTools from 'mobx-react-devtools';

const styleSheet = createStyleSheet('Shell', (theme) => ({
    '@global': {
        html: {
            height: '100%',
            boxSizing: 'border-box',
        },
        '*, *:before, *:after': {
            boxSizing: 'inherit',
        },
        body: {
            height: '100%',
            margin: 0,
            background: theme.palette.background.default,
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.fontSize,
            color: theme.palette.text.primary,

            // Helps fonts on OSX look more consistent with other systems
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',

            // Use momentum-based scrolling on iOS devices
            WebkitOverflowScrolling: 'touch'
        },
        '#root': {
            height: '100%',
        }
    },
    root: {
        height: '100%',
    }
}));

class Shell extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>

                <Titlebar>GitHunt</Titlebar>

                <Switch>
                    <Route exact path="/" component={ FeedPage } />
                    <Route exact path="/feed/:feedType" component={ FeedPage } />
                </Switch>

                {/* <DevTools position={{top: 46, left: 25}} /> */}
            </div>
        );
    }
}

export default withRouter(withStyles(styleSheet)(Shell));
