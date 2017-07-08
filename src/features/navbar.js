import React from 'react';
import { createStyleSheet, withStyles } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs';
import PropTypes from 'prop-types';
import { browserHistory } from '../core/utils';

const styleSheet = createStyleSheet('ConfNavBar', () => ({
    root: {
        flex: '0 0 54px'
    }
}));

class NavBar extends React.Component {

    static propTypes = {
        confId: PropTypes.string.isRequired,
        tab: PropTypes.string.isRequired
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
        return map[tab];
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

export default withStyles(styleSheet)(NavBar);
