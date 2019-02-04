import React, { Component } from 'react';
import moment from 'moment';
import Airtable from 'airtable';
const base = new Airtable({ apiKey: 'keyCxnlep0bgotSrX' }).base('appx5d6Pp5tarqI1E');

import TilePreview from './tile_preview';

class CreateNewTile extends Component {
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
      tileType: 'Self-Report Challenge',
      category: '',
      tracking: 'One Time',
      participation: 'Individual',
      minTeamSize: '4',
      maxTeamSize: '12'
    };

    this.setTitle = this.setTitle.bind(this);
    this.setInstructions = this.setInstructions.bind(this);
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

  setCategory(e) {
    this.setState({ category: e.target.value });
  }

  setTracking(e) {
    this.setState({ tracking: e.target.value });
  }

  setParticipation(e) {
    this.setState({ participation: e.target.value });
  }

  setMinTeamSize(e) {
    this.setState({ minTeamSize: e.target.value });
  }

  setMaxTeamSize(e) {
    this.setState({ maxTeamSize: e.target.value });
  }

  saveNewChallenge() {
    /* global $ */
    let challenge = {};

    challenge['Title'] = this.state.title;
    challenge['Tile Type'] = this.state.tileType;
    challenge['Start date'] = this.state.startDate;
    challenge['End date'] = this.state.endDate;
    challenge['Points'] = this.state.points;
    challenge['Instructions'] = this.state.instructions;
    challenge['More Information Html'] = $('.description-text').html();
    challenge['Team Activity'] = this.state.individual ? 'no' : 'yes';
    challenge['Reward Occurrence'] = this.state.rewardOccurrence;
    challenge['Activity Tracking Type'] = this.state.activityTrackingType;
    challenge['Activity Goal'] = this.state.activityGoal;
    challenge['Activity Goal Text'] = this.state.trackingText;

    base('Custom Tiles').create(challenge, function(err, record) {
      if (err) {
        console.error(err);
        return;
      }

      // Add id to url fragment and reload page (to start editing)
      window.location.href += '#/' + record.getId();
      window.location.reload();

    });

  }

  renderStepsChallenge() {
    return (
      <div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="participation">Participation</label>
              <select className="form-control" id="participation" value={this.state.participation} onChange={(e) => this.setParticipation(e)}>
                <option>Individual</option>
                <option>Team</option>
              </select>
            </div>
          </div>
        </div>

        {
          this.state.participation !== 'Team' ?
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="frequency">Frequency</label>
                <select className="form-control" id="frequency" value={this.state.frequency} onChange={(e) => this.setFrequency(e)}>
                  <option>Weekly</option>
                  <option>By End Date</option>
                </select>
              </div>
            </div>
          </div> :
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="minTeamSize">Minimum Team Size</label>
                <select className="form-control" id="minTeamSize" value={this.state.minTeamSize} onChange={(e) => this.setMinTeamSize(e)}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="maxTeamSize">Maximum Team Size</label>
                <select className="form-control" id="maxTeamSize" value={this.state.maxTeamSize} onChange={(e) => this.setMaxTeamSize(e)}>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                  <option>13</option>
                  <option>14</option>
                  <option>15</option>
                  <option>16</option>
                  <option>17</option>
                  <option>18</option>
                  <option>19</option>
                  <option>20</option>
                </select>
              </div>
            </div>
          </div>
        }

        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="stepsGoal">Steps Goal</label>
              <input type="text" className="form-control" id="stepsGoal" value={this.state.stepsGoal} onChange={(e) => this.setStepsGoal(e)} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="row">

          <div className="col">

            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="tileType">Type of Tile</label>
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
                  <label htmlFor="points">Points</label>
                  <input type="text" className="form-control" id="points" value={this.state.points} onChange={(e) => this.setPoints(e)} />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="tracking">Tracking</label>
                  <select className="form-control" id="tracking" value={this.state.tracking} onChange={(e) => this.setTracking(e)}>
                    <option>One Time</option>
                    <option>Steps Challenge</option>
                  </select>
                </div>
              </div>
            </div>

            {
              this.state.tracking === 'One Time' ?
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="trackingText">To complete this... (50 character limit)</label>
                    <input type="text" className="form-control" id="trackingText" value={this.state.trackingText} onChange={(e) => this.setTrackingText(e)} />
                  </div>
                </div>
              </div> : this.renderStepsChallenge()
            }

            <div className="row">
              <div className="col">
                <button type="button" className="btn btn-primary" onClick={() => this.saveNewChallenge()}>Save Tile</button>
              </div>
            </div>

          </div>

          <div className="col">

            <TilePreview
              // imageSrc='https://mywellnessnumbers.com/aduro/placeholder-image.jpg
              title={this.state.title}
              instructions={this.state.instructions}
              description={this.state.description}
              setTitle={this.setTitle}
              setInstructions={this.setInstructions}
              tileType={this.state.tileType}
            />

            <p className="my-2">Does the client offer coaching?</p>
            <div className="form-check-inline">
              <input className="form-check-input" type="radio" name="coachingRadios" id="coachingRadios1" value="coaching" defaultChecked />
              <label className="form-check-label" htmlFor="coachingRadios1">Yes</label>
            </div>
            <div className="form-check-inline">
              <input className="form-check-input" type="radio" name="coachingRadios" id="coachingRadios2" value="noCoaching" />
              <label className="form-check-label" htmlFor="coachingRadios2">No</label>
            </div>

          </div>

        </div>
      </div>
    );
  }

}

export default CreateNewTile;
