import React from 'react'
import './Schedule.css'

// 3rd party
import moment from 'moment';

export class Schedule extends React.Component {

  render() {
		let sheet = this.props.timesheets.map(function(track, i) {
			return (
				<li className={track.checkIn ? "list check-in" :"list"} key={ i }>
					<div className="title">{track.employeeName}</div>
					<div className="duration">{moment(track.eventDate).format('H:mm a')}</div>
				</li>
			);
		});
		return (
			<ul className="TrackList">
				{sheet}
			</ul>
		);
	}
}

Schedule.protTypes = {
  timesheets: React.PropTypes.array
}

export default Schedule
