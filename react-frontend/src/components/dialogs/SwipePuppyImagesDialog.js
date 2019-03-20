import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import BaseDialog from './BaseDialog';
import Paper from '@material-ui/core/Paper';
import SwipeableViews from 'react-swipeable-views';
import MobileStepper from '@material-ui/core/MobileStepper';
import puppyIcon from '../../assets/images/puppy.jpg';
import PuppyCard from '../PuppyCard';

const styles = theme => ({
  container: {
    maxWidth: 600,
    flexGrow: 1,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  stepsContainer: {
    marginLeft: 72,
    textAlign: 'left',
    marginTop: 20,
    height: 65
  },
  bottomMargin: {
    marginBottom: theme.spacing(2)
  }
});

class SwipePuppyImagesDialog extends Component {
  constructor() {
    super();

    this.state = {
      activeStep: 0,
      titles: [],
      images: [],
      canines: []
    };

    this.renderPuppyCards = this.renderPuppyCards.bind(this);
    this.cleanPuppyData = this.cleanPuppyData.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:8080/getPuppies')
      .then(results => {
        if (results) {
          return results.json();
        }
        else {
          console.log('Results unable to be fetched.')
        }
      }).then(data => {
        this.cleanPuppyData(data);
    });
  }

  cleanPuppyData(data) {
    let titles = [],
        images = [],
        canines = [];

    for (let i in data) {
        titles.push(data[i].title);
        images.push(data[i].image);
        canines.push(data[i].canines);
    }
    
    this.setState({
      titles: titles,
      images: images,
      canines: canines
    });
}

  renderPuppyCards() {
    let { titles, images, canines } = this.state,
        numCards = titles.length,
        cards = [];

    for (let i = 0; i < numCards; i++){
      let puppyCard = (
            <PuppyCard
              title={titles[i]}
              image={images[i]}
              canines={canines[i]} />
      );
      cards.push(puppyCard);
    }

    return cards;
  }

  // action functins for swipeable dialog
  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  render() {
    const { classes } = this.props;
    const maxSteps = this.state.titles.length + 1;
    const { activeStep } = this.state;

    return (
      <BaseDialog {...this.props}>
        <div className={classes.container}>

            <SwipeableViews
              axis='x'
              index={activeStep}
              onChangeIndex={this.handleStepChange}
              enableMouseEvents
              animateHeight={true}
            >

              <Paper elevation={6} className="" style={{ padding: '25px'}}>
                <div>
                  <Typography variant="h3" style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                    Puppy Finder
                  </Typography>

                  <Typography variant="h5" style={{textTransform: 'uppercase'}} gutterBottom>
                    Machine Learning Results
                  </Typography>

                  <Typography variant="subtitle1" gutterBottom>
                    <p>Canines will be highlighted in the bright green square</p>
                    <p>Details about the found canines can be reviewed in the table below the image. <i>No data in the table means that no canines were found.</i></p>
                  </Typography>

                  <img src={puppyIcon} style={{height: 50}} alt="puppy icon"/>

                  <Typography variant="subtitle2" color='primary' gutterBottom>
                    <em>Use the <b>NEXT</b> and <b>BACK</b> buttons to view images.</em>
                  </Typography>

                </div>
              </Paper>
              
              { this.renderPuppyCards() }

            </SwipeableViews>

            <br />
            
            <MobileStepper
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              className={classes.mobileStepper}
              nextButton={
                <Button size="large" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
                  Next
                </Button>
              }
              backButton={
                <Button size="large" onClick={this.handleBack} disabled={activeStep === 0}>
                  Back
                </Button>
              }
            />
        </div>
      </BaseDialog>
    )
  }
}

export default withStyles(styles)(SwipePuppyImagesDialog);
