import React from 'react';
import { createStyleSheet, withStyles } from 'material-ui/styles';
import { FeedSelector } from '../core/components';
import { default as FeedView } from './feed-view';
import { default as FeedViewCompact } from './feed-view-compact';

const styleSheet = createStyleSheet('FeedPage', (theme) => ({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    content: {
        padding: theme.spacing.unit,
        display: 'flex',
        flexDirection: 'row'
    }
}));

class FeedPage extends React.Component {

    render() {
        const { classes, match } = this.props;

        return (
            <div className={classes.root}>

                <FeedSelector tab={match.params.feedType} />

                <div className={classes.content}>
                    <FeedView feedType={match.params.feedType} />
                    <FeedViewCompact feedType={match.params.feedType} />
                </div>
            </div>
        );
    }
}

export default withStyles(styleSheet)(FeedPage);
