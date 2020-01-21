import React, { Component } from 'react';
import '../../css/NewTicketForm.css';
import DateTimePicker from 'react-datetime-picker';

class NewTicketFormAuction extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  

  render() {
    const auctionStates = ["ticketQuantity", "ticketGrouping", "auctionStart", "auctionEnd", "startTotalPrice", "endTotalPrice", "auctionDetails", "pitch"]
    const auctionLabels = ["Ticket Quantity", "Ticket Grouping", "Auction Start", "Auction End", "Start Total Price: $", "End Total Price: $", "Details", "Auction Pitch"]

    
    const inputs = (states, labels, index = -1) => states.map((state) => {
        index++;
          if (state === "auctionStart") {
            return (
                  <div>
                  <DateTimePicker
                    onChange={this.props.onStartChange}
                    value={this.props.startDate}
                  />
                </div>
            )
          }  else if (state === "auctionEnd") {
            return (
                  <div>
                  <DateTimePicker
                    onChange={this.props.onEndChange}
                    value={this.props.endDate}
                  />
                </div>
            )
          } else {
          return (
            <div>
              <label htmlFor={state}> {labels[index]}: </label>
              <input
                name={state}
                onChange={this.props.onInputChange}
              />
            </div>
          )}
    })

    return (
      <section className="new-ticket-auction-container">
        <form>
          {inputs(auctionStates, auctionLabels)}
        </form>      
      </section>
    )
  }
}

export default NewTicketFormAuction;