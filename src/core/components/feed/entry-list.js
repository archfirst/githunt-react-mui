import React from 'react';
import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { createStyleSheet, withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

const styleSheet = createStyleSheet('EntryList', (theme) => ({
    root: {
    }
}));

function EntryList({ classes, entries }) {

    return (
        <div className={classes.root}>
            <List>
                {
                    entries.map((entry) => {
                        const repo = entry.repository;
                        return (
                            <ListItem key={entry.id} divider>
                                <Avatar src={repo.owner.avatar_url} />
                                <ListItemText
                                    primary={ repo.full_name }
                                    secondary={ `
                                        Stars: ${repo.stargazers_count},
                                        Issues: ${repo.open_issues_count},
                                        Comments: ${entry.commentCount},
                                        Score: ${entry.score}` } />
                            </ListItem>
                        );
                    })
                }
            </List>
        </div>
    );
}

EntryList.propTypes = {
    entries: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStyles(styleSheet)(EntryList);
