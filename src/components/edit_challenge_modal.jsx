import React, { Component } from 'react';
import moment from 'moment';
import Airtable from 'airtable';
const base = new Airtable({ apiKey: 'keyCxnlep0bgotSrX' }).base('appx5d6Pp5tarqI1E');

import TilePreview from './tile_preview';

class EditChallengeModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teamSizeVisible: false,
      unitsVisible: false,
      startDate: '',
      endDate: '',
      individual: '',
      rewardOccurrence: 'Once',
      activityTrackingType: '',
      trackingText: '',
      activityGoal: '',
      title: '',
      instructions: '',
      description: 'Additional information can be added here.',
      points: '0',
      pointsVisible: true,
      tileType: 'Self-Report Challenge'
    };

    this.setTitle = this.setTitle.bind(this);
    this.setInstructions = this.setInstructions.bind(this);
  }

  componentDidMount() {
    const challenge = this.props.challenge;
    this.setState({
      startDate: challenge.fields['Start date'],
      endDate: challenge.fields['End date'],
      individual: challenge.fields['Team Activity'] === 'no',
      rewardOccurrence: challenge.fields['Reward Occurrence'],
      activityTrackingType: challenge.fields['Activity Tracking Type'],
      trackingText: challenge.fields['Activity Goal Text'] ? challenge.fields['Activity Goal Text'] : '',
      activityGoal: challenge.fields['Activity Goal'] ? challenge.fields['Activity Goal'] : '',
      points: challenge.fields['Points'],
      title: challenge.fields['Title'],
      instructions: challenge.fields['Instructions'] ? challenge.fields['Instructions'].replace(/<[^>]*>/g, '') : '',
      description: challenge.fields['More Information Html']
    });
  }

  setTeamSizeVisible(visible) {
    this.setState({ teamSizeVisible: visible });
  }

  setUnitsVisible(e) {
    switch (e.target.value) {
      case 'Units':
      case 'Days':
        this.setState({ unitsVisible: true });
        break;
      case 'Event':
        this.setState({ unitsVisible: false });
        break;
    }
  }

  setStartDate(e) {
    this.setState({ startDate: e.target.value });
  }

  setEndDate(e) {
    this.setState({ endDate: e.target.value });
  }

  setIndividual(e) {
    this.setState({ individual: e.target.value });
  }

  setRewardOccurrence(e) {
    this.setState({ rewardOccurrence: e.target.value });
  }

  setActivityTrackingType(e) {
    this.setState({ activityTrackingType: e.target.value });
  }

  setTrackingText(e) {
    this.setState({ trackingText: e.target.value });
  }

  setActivityGoal(e) {
    this.setState({ activityGoal: e.target.value });
  }

  setPoints(e) {
    this.setState({ points: e.target.value });
  }

  setTitle(e) {
    this.setState({ title: e.target.value });
  }

  setInstructions(e) {
    this.setState({ instructions: e.target.value });
  }

  setTileType(e) {
    if (e.target.value === 'Informational Tile') {
      this.setState({
        tileType: e.target.value,
        pointsVisible: false
      });
    } else {
      this.setState({
        tileType: e.target.value,
        pointsVisible: true
      });
    }
  }

  saveUpdatedChallenge(challenge) {
    /* global $ */

    challenge.fields['Title'] = this.state.title;
    challenge.fields['Tile Type'] = this.state.tileType;
    challenge.fields['Start date'] = this.state.startDate;
    challenge.fields['End date'] = this.state.endDate;
    challenge.fields['Points'] = this.state.points;
    challenge.fields['Instructions'] = this.state.instructions;
    challenge.fields['More Information Html'] = $('.description-text').html();
    challenge.fields['Team Activity'] = this.state.individual ? 'no' : 'yes';
    challenge.fields['Reward Occurrence'] = this.state.rewardOccurrence;
    challenge.fields['Activity Tracking Type'] = this.state.activityTrackingType;
    challenge.fields['Activity Goal'] = this.state.activityGoal;
    challenge.fields['Activity Goal Text'] = this.state.trackingText;

    // Delete computed fields
    delete challenge.fields['ID'];

    base('Custom Tiles').replace(challenge.id, challenge.fields, function(err, record) {
      if (err) {
        console.error(err);
        return;
      }

      console.log('Saving updated challenge!');
      console.log(challenge);
    });

  }

  render() {
    const challenge = this.props.challenge;

    return (
      <div>
        <div className="row">
          <div className="col">

          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="tileType">Type of Tile?</label>
                <select className="form-control" id="tileType" value={this.state.tileType} onChange={(e) => this.setTileType(e)}>
                  <option>Self-Report Challenge</option>
                  <option>Verified Challenge</option>
                  <option>Device-Enabled Challenge</option>
                  <option>Informational Tile</option>
                </select>
              </div>
            </div>
          </div>

            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="startDate">Start Date</label>
                  <input className="form-control" type="date" id="startDate" value={this.state.startDate} onChange={(e) => this.setStartDate(e)} />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="endDate">End Date</label>
                  <input className="form-control" type="date" id="endDate" value={this.state.endDate} onChange={(e) => this.setEndDate(e)} />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="rewardOccurrence">Reward Occurrence</label>
                  <select className="form-control" id="rewardOccurrence" value={this.state.rewardOccurrence} onChange={(e) => this.setRewardOccurrence(e)}>
                    <option>Once</option>
                    <option>Weekly</option>
                  </select>
                </div>
              </div>
              <div className="col">
                {
                  this.state.rewardOccurrence === 'Once' ?
                  <div className="form-group">
                    <label htmlFor="activityTrackingType">Activity Tracking Type</label>
                    <select className="form-control" id="activityTrackingType" value={this.state.activityTrackingType} onChange={(e) => this.setActivityTrackingType(e)}>
                      <option>Event</option>
                      <option>Days</option>
                      <option>Units</option>
                    </select>
                  </div> :
                  <div className="form-group">
                    <label htmlFor="activityTrackingType">Activity Tracking Type</label>
                    <select className="form-control" id="activityTrackingType" value={this.state.activityTrackingType} onChange={(e) => this.setActivityTrackingType(e)}>
                      <option>Days</option>
                      <option>Units</option>
                    </select>
                  </div>
                }
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="trackingText">Tracking Text</label>
                  <input type="text" className="form-control" id="trackingText" value={this.state.trackingText} onChange={(e) => this.setTrackingText(e)} />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="activityGoal">Activity Goal</label>
                  <input type="text" className="form-control" id="activityGoal" value={this.state.activityGoal} onChange={(e) => this.setActivityGoal(e)} />
                </div>
              </div>
            </div>

            {
              this.state.pointsVisible ?
              <div className="row">
                <div className="col-3">
                  <div className="form-group">
                    <label htmlFor="points">Points</label>
                    <input type="text" className="form-control" id="points" value={this.state.points} onChange={(e) => this.setPoints(e)} />
                  </div>
                </div>
              </div> :
              ''
            }

            <div className="row">
              <div className="col">
                <button type="button" className="btn btn-primary" onClick={() => this.saveUpdatedChallenge(challenge)}>Save Tile</button>
              </div>
            </div>

          </div>

          <div className="col">

            <TilePreview
              imageSrc={challenge.fields['Header Image']}
              title={this.state.title}
              instructions={this.state.instructions}
              description={this.state.description}
              setTitle={this.setTitle}
              setInstructions={this.setInstructions}
            />

          </div>
        </div>
      </div>
    );
  }
}

export default EditChallengeModal;
