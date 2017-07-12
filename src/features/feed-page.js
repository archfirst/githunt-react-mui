import React from 'react';
import IconButton from 'material-ui/IconButton';
import { createStyleSheet, withStyles } from 'material-ui/styles';
import RefreshIcon from 'material-ui-icons/Refresh';
import { gql, graphql } from 'react-apollo';
import { EntryList, FeedSelector, LoadingStateViewer } from '../core/components';

const styleSheet = createStyleSheet('FeedPage', (theme) => ({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    content: {
        padding: theme.spacing.unit
    }
}));

class FeedPage extends React.Component {

    render() {
        const { classes, match } = this.props;

        return (
            <div className={classes.root}>

                <FeedSelector tab={match.params.feedType} />

                <div className={classes.content}>
                    <EntryListWrapperWithData feedType={match.params.feedType} />
                </div>
            </div>
        );
    }
}


const FEED_QUERY = gql`
query Feed($type: FeedType!, $offset: Int, $limit: Int) {
    feed(type: $type, offset: $offset, limit: $limit) {
        id,
        createdAt,
        commentCount,
        score,
        postedBy {
            html_url,
            login
        },
        repository {
            name,
            full_name,
            description,
            stargazers_count,
            open_issues_count,
            html_url,
            owner {
                login,
                avatar_url
            }
        }
    }
}`;

class EntryListWrapper extends React.Component {

    render() {
        const { entries } = this.props;

        return (
            <div>
                <IconButton aria-label="Refresh" onClick={ this.onRefreshClicked }>
                    <RefreshIcon />
                </IconButton>

                <EntryList entries={entries} />
            </div>
        );
    }

    onRefreshClicked = () => {
        this.props.refetch();
    };
}

// EntryListWrapperWithData = graphql(...)(LoadingStateViewer(EntryListWrapper))
const ITEMS_PER_PAGE = 10;
const EntryListWrapperWithData = graphql(
    FEED_QUERY,
    {
        options: props => ({
            variables: {
                type: (props.feedType && props.feedType.toUpperCase()) || 'TOP',
                offset: 0,
                limit: ITEMS_PER_PAGE
            },
            fetchPolicy: 'cache-and-network',
        }),
        props: ({ data: { loading, error, feed, refetch } }) => ({
            loading,
            error,
            entries: feed,
            refetch
        })
    }
)(LoadingStateViewer(EntryListWrapper));

export default withStyles(styleSheet)(FeedPage);
