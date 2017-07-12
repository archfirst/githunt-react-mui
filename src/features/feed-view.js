import React from 'react';
import IconButton from 'material-ui/IconButton';
import RefreshIcon from 'material-ui-icons/Refresh';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import { EntryList, LoadingStateViewer } from '../core/components';

class FeedView extends React.Component {

    static propTypes = {
        entries: PropTypes.arrayOf(PropTypes.object).isRequired,
        refetch: PropTypes.func.isRequired
    };

    render() {
        return (
            <div>
                <IconButton aria-label="Refresh" onClick={ this.onRefreshClicked }>
                    <RefreshIcon />
                </IconButton>

                <EntryList entries={this.props.entries} />
            </div>
        );
    }

    onRefreshClicked = () => {
        this.props.refetch();
    };
}

// Note that this query does not have score, which is present in feed-view-compact
const FEED_QUERY = gql`
query Feed($type: FeedType!, $offset: Int, $limit: Int) {
    feed(type: $type, offset: $offset, limit: $limit) {
        id,
        createdAt,
        commentCount,
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

// FeedViewCompactWithData = graphql(...)(LoadingStateViewer(FeedViewCompact))
const ITEMS_PER_PAGE = 10;
const FeedViewWithData = graphql(
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
)(LoadingStateViewer(FeedView));

export default FeedViewWithData;
