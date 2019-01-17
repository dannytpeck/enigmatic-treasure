import React, { Component } from 'react';
import Airtable from 'airtable';
const base = new Airtable({ apiKey: 'keyCxnlep0bgotSrX' }).base('appx5d6Pp5tarqI1E');

import Header from './header';
import EditChallengeModal from './edit_challenge_modal';
import CreateNewTile from './create_new_tile';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      challenge: null
    };
  }

  componentDidMount() {
    this.fetchChallenge();
  }

  fetchChallenge() {
    const id = window.location.hash.slice(2);

    if (id) {
      base('Custom Tiles').find(id, (err, record) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(record);
        this.setState({ challenge: record });
      });
    }

  }

  render() {
    return (
      <div className="app">
        <Header />

        {
          this.state.challenge ?
          <EditChallengeModal challenge={this.state.challenge} /> :
          <CreateNewTile />
        }

      </div>
    );
  }
}

export default App;
