import React, { Component } from 'react';
import TicketCard from '../ticketListing/TicketCard';
import EventCard from '../events/EventCard';
import CategoryCard from '../categories/CategoryCard';
import CityCard from '../locations/CityCard';
import axios from 'axios';
import '../../css/List.css'
import SPRING_SECURITY from '../../config_keys.js'

const base_url = 'http://localhost:8080'
const username = `${SPRING_SECURITY.username}`
const password = `${SPRING_SECURITY.password}`

class List extends Component {    
  constructor(props) {
    super(props);

    this.state = {
      collection: undefined,
    }
  }

  componentDidMount = () => {
    const url = `${base_url}${this.props.url}`
    this.fetchCollection(url);
  }

  fetchCollection(url) {
    axios.get( url,  
      { headers: 
          { authorization: 'Basic ' + window.btoa( username + ":" + password) } 
      }
    ).then((response) => {
        this.setState({collection: response.data})
      })
      .catch((error) => {
        console.log(error)
        // this.setState({errors: error})
      });
  }
  
  render() {    
    let collection;
    if (this.state.collection) {
      if (this.props.cardType === "ticket") {
        collection = this.state.collection.map((ticket, i) => {
          return (<TicketCard ticket={ticket} key={i}/>)
        });
      } else if (this.props.cardType === "event") {
        collection = this.state.collection.map((event, i) => {
            return (<EventCard event={event} key={i}/>)
          });
      } else if (this.props.cardType === "category") {
        collection = this.state.collection.map((category, i) => {
          return (<CategoryCard category={category} key={i}/>)
        });
      } else if (this.props.cardType === "city") {
        collection = this.state.collection.map((city, i) => {
          return (<CityCard city={city} key={i}/>)
        });
      }
    } else {
      return (
        <section>
          <div className="alert alert-warning">One moment, pulling listings for you now...</div>
          <p>{username}</p>
        </section>
      )
    }
    return (
        <section className="list-container" >
          {collection}
        </section>
    )
  }
}

export default List;