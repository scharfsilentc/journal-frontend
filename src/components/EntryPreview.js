import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, Image, Button } from 'semantic-ui-react'
import auth from '../auth.js';
import api from '../api.js';

/*
logic:
1. Arrow links to that entry's ReadEntry
2. Date = date of that entry, needs to pull date from database. 
3. Delete = deletes entry
4. carosaul that shows 2 entries and an arrow on either side. not sure how to do this??
//todo: only display date momentjs 
*/

class EntryPreview extends Component {
  constructor() {
    super();
    this.state = {imageDeleted: false}
  }

  displayDate = timeStamp => {
  let newDateArray = timeStamp.split('T');
  let justDate = newDateArray[0];
  return justDate;
  }

  setMoodDescription = (rating) => {
    let entryMood = 
    rating >=9 ? "Super amazing!" : 
    rating >=7 ? "Pretty great" : 
    rating >= 5 ? "Perfectly okay" : 
    rating >= 3 ? 'Not so great' : 
    rating >= 0 ? "Just terrible" : "Another day";
    return entryMood;
  }

  handleDelete = (event) => {
    console.log('clicked', this.props.data.id, auth.getToken());
    api.requestDeleteEntry(this.props.data.id, auth.getToken())
      .then(this.setState( st => (
        {imageDeleted: true}
      )))
      
  }

  render() {
    return ( 
      <Grid.Column>
      {this.state.imageDeleted ? <Card.Header>Entry successfully deleted. </Card.Header> :
        <Card>
        <Link to={`/dashboard/readentry/${this.props.data.id}`}>
          <Image src={this.props.data.thumbnail_image_url} height='226px' width='290px' />
          </Link>
          <Card.Content>
            <Card.Header>
              {this.props.data.title}
            </Card.Header>
            <Card.Meta>
              <span className='date'>
              {this.displayDate(this.props.data.createdAt)}
              </span>
            </Card.Meta>
            <Card.Description>
              {this.setMoodDescription(this.props.data.mood)}
              {' '} 
            </Card.Description>
            <Card.Content extra>
            <Button onClick={this.handleDelete} icon='trash' size='small' ></Button>
            </Card.Content>
          </Card.Content>

        </Card>
      }
      

      </Grid.Column>


      /* <div>
        <Link to={`/readentry/${this.props.data.id}`}>
          <h4>^</h4>
        </Link>
        <h4>{this.props.data.createdAt}</h4>
        <Button>Delete</Button>
      </div> */
    );
  }
}

export default EntryPreview;
