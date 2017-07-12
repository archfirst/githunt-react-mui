import React from 'react';
import IconButton from 'material-ui/IconButton';
import RefreshIcon from 'material-ui-icons/Refresh';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import { EntryListCompact, LoadingStateViewer } from '../core/components';

class FeedViewCompact extends React.Component {

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

                <EntryListCompact entries={this.props.entries} />
            </div>
        );
    }

    onRefreshClicked = () => {
        this.props.refetch();
    };
}

const FEED_QUERY = gql`
query Feed($type: FeedType!, $offset: Int, $limit: Int) {
    feed(type: $type, offset: $offset, limit: $limit) {
        id,
        score,
        repository {
            full_name,
            stargazers_count,
            open_issues_count
        }
    }
}`;

// FeedViewCompactWithData = graphql(...)(LoadingStateViewer(FeedViewCompact))
const ITEMS_PER_PAGE = 10;
const FeedViewCompactWithData = graphql(
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
)(LoadingStateViewer(FeedViewCompact));

export default FeedViewCompactWithData;
