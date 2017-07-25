import React from 'react';
import blue from 'material-ui/colors/blue'
import pink from 'material-ui/colors/pink'
import red from 'material-ui/colors/red'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createPalette from 'material-ui/styles/palette';
import createMuiTheme from 'material-ui/styles/theme';
import createTypography from 'material-ui/styles/typography';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import { Router } from 'react-router-dom';
import { browserHistory } from './core/utils';
import Shell from './shell';

class App extends React.Component {

    createClient() {
        return new ApolloClient({
            networkInterface: createNetworkInterface({
                uri: 'http://api.githunt.com/graphql'
            }),
            // Inform Apollo about the id field of our objects.
            // Apollo will use this field as the key for its caches.
            dataIdFromObject: o => o.id
        });
    }

    render() {
        const palette = createPalette({
            primary: blue,
            accent: pink,
            error: red,
            type: 'light'
        });

        const typography = createTypography(palette, {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
        });

        const theme = createMuiTheme({ palette, typography });

        return (
            <ApolloProvider client={this.createClient()}>
                <MuiThemeProvider theme={theme}>
                    <Router history={browserHistory}>
                        <Shell />
                    </Router>
                </MuiThemeProvider>
            </ApolloProvider>
        );
    }
}

export default App;
