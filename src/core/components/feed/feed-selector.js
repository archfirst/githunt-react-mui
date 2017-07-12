import React from 'react';
import { createStyleSheet, withStyles } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs';
import PropTypes from 'prop-types';
import { browserHistory } from '../../utils/index';

const styleSheet = createStyleSheet('FeedSelector', () => ({
    root: {
        flex: '0 0 54px'
    }
}));

class FeedSelector extends React.Component {

    static propTypes = {
        tab: PropTypes.string
    };

    render() {
        const { classes, tab } = this.props;

        return (
            <div className={classes.root}>
                <Tabs index={ this.tab2Index(tab) } onChange={ this.onTabChange }>
                    <Tab label="TOP" />
                    <Tab label="HOT" />
                    <Tab label="NEW" />
                </Tabs>
            </div>
        );
    }

    onTabChange = (event, index) => {
        browserHistory.push(`/feed/${ this.index2Tab(index) }`);
    };

    tab2Index(tab) {
        let map = {
            top: 0,
            hot: 1,
            new: 2,
        };
        return map[tab || 'top'];
    }

    index2Tab(index) {
        let tabs = [
            'top',
            'hot',
            'new',
        ];
        return tabs[index];
    }
}

export default withStyles(styleSheet)(FeedSelector);
