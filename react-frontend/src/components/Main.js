import React,  { Component } from 'react';
import SwipePuppyImagesDialog from './dialogs/SwipePuppyImagesDialog';

class Main extends Component {

	state = {
		getResultsDialog: false
	};

	componentDidMount() {}

	closeResultsDialog = (event) => {
		this.setState({ getResultsDialog: true });
	}

	render() {
		return (
        <div style={{textAlign: 'center'}} className="">
              
			    <SwipePuppyImagesDialog
			  	  classes={null}
			  	  open={true}
		  		  onClose={this.closeResultsDialog} />
        </div>
    );
  }
}

export default Main;
