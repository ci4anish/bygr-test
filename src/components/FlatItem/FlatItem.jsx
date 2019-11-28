import React from "react";
import "./FlatItem.css";
import { DeadlineStatusEnum, TimeFormat } from "../../enums";

class FlatItem extends React.PureComponent {
  getDeadlineStatusBgColor = status => {
    switch (status) {
      case DeadlineStatusEnum.Sent: {
        return { backgroundColor: '#B8DE91' }
      }
      case DeadlineStatusEnum.NotSent: {
        return { backgroundColor: '#FB9683' }
      }
      case DeadlineStatusEnum.InProgress: {
        return { backgroundColor: '#FBD277' }
      }
      default:
        return { backgroundColor: 'transparent' };
    }
  };

  formatDate = (date, format) => {
    const split = date.split(/\D+/);
    const dateFormat = new Date(Date.UTC(split[0], --split[1], split[2], split[3], split[4], split[5], split[6]));

    let day = dateFormat.getDate();
    let month = dateFormat.getUTCMonth();
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;

    switch (format) {
      case TimeFormat.LastLogin: {
        return `${day}.${month}.${dateFormat.getUTCFullYear()} ${dateFormat.getHours()}:${dateFormat.getMinutes()}`
      }
      case TimeFormat.DeadlineDate: {
        return `${day}.${month}.${dateFormat.getUTCFullYear()}`;
      }
      default:
        return '';
    }
  };

  render() {
    const { flat } = this.props;

    return (
      <div className="flat-item">
        <div className="item-title">Building A - H0102</div>
        <div className="item-info d-flex">
          <div className="xs-width">
            <div className="info-subtitle">Floor</div>
            <div>{flat.floor}</div>
            <div className="info-subtitle">Unit type</div>
            <div>{flat.type}</div>
            <div className="info-subtitle">Type</div>
            <div>{flat.layoutType}</div>
          </div>
          {
            flat.buyers.map((item, index) => (
              <div key={index}  className="sm-width">
                <div className="info-subtitle">
                  Buyer {index + 1}
                </div>
                <div>
                  <div>{item.firstName} {item.lastName}</div>
                  <div>+ {item.phoneNumber}</div>
                  <div>{item.email}</div>
                </div>
              </div>
            ))
          }
          <div  className="sm-width">
            <div className="info-subtitle">Last login</div>
            {
              flat.buyers.map((item, index) =>
                <div key={index}>
                  <div>{item.displayName}</div>
                  <div>{this.formatDate(item.lastVisitDate, TimeFormat.LastLogin)}</div>
                </div>
              )
            }
          </div>
          <div  className="lg-width">
            <div className="info-subtitle">Deadlines</div>
            {
              flat.deadlines.map((item, index) =>
                <div className="d-flex align-center" key={index}>
                  <div>Deadline {index + 1} ({this.formatDate(item.Date, TimeFormat.DeadlineDate)}) :</div>
                  <div className="info-status" style={this.getDeadlineStatusBgColor(item.Status)}/>
                  <div>{item.Status}</div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    )
  }
}

export { FlatItem };
