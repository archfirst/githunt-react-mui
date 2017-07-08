import React from 'react';
import { createStyleSheet, withStyles } from 'material-ui/styles';
import FeedView from './feed-view';
import NavBar from './navbar';

const styleSheet = createStyleSheet('FeedPage', (theme) => ({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    }
}));

class FeedPage extends React.Component {

    render() {
        const { classes, match } = this.props;
        const { feedType } = match.params;

        return (
            <div className={classes.root}>
                <NavBar tab={feedType} />
                <FeedView feedType={feedType} />
            </div>
        );
    }
}


export default withStyles(styleSheet)(FeedPage);
