import React from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { createStyleSheet, withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

const styleSheet = createStyleSheet('EntryListCompact', (theme) => ({
    root: {
    }
}));

function EntryListCompact({ classes, entries }) {

    return (
        <div className={classes.root}>
            <List>
                {
                    entries.map((entry) => {
                        const repo = entry.repository;
                        return (
                            <ListItem key={entry.id} divider>
                                <ListItemText
                                    primary={ repo.full_name }
                                    secondary={ `
                                        Stars: ${repo.stargazers_count},
                                        Issues: ${repo.open_issues_count},
                                        Score: ${entry.score}` } />
                            </ListItem>
                        );
                    })
                }
            </List>
        </div>
    );
}

EntryListCompact.propTypes = {
    entries: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withStyles(styleSheet)(EntryListCompact);
