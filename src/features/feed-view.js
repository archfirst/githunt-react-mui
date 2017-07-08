import React from 'react';
import { createStyleSheet, withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';

const styleSheet = createStyleSheet('FeedView', (theme) => ({
    root: {
        padding: theme.spacing.unit
    }
}));

function FeedView({ classes, feedType, data }) {

    if (data.loading) {
        return <div>Loading</div>;
    }

    if (data.error) {
        return <div>{ data.error.message }</div>;
    }

    return (
        <div className={classes.root}>
            <Typography type="title">FeedView { feedType }</Typography>

            {
                data.feed.map((item) => {
                    return (
                        <Typography>
                            `${item.repository.owner.login}/${item.repository.name}`
                        </Typography>
                    );
                }
            ) }


        </div>
    );
}

FeedView.propTypes = {
    feedType: PropTypes.string
};

const FeedQuery = gql`
    query {
        feed (type: NEW, limit: 10) {
            repository {
                owner { login }
                name
            }
            
            postedBy { login }
        }
    }
`;

const FeedViewWithData = graphql(FeedQuery)(FeedView);

export default withStyles(styleSheet)(FeedViewWithData);
