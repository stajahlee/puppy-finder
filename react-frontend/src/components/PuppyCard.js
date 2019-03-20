import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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

class PuppyCard extends Component {
  constructor() {
    super();

    this.getTableContents = this.getTableContents.bind(this);
    this.unique = this.unique.bind(this);
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

  renderCoordinateBoxes(canines) {
    let boxes = [];
    
    // incoming width of images is 640 so to render as 500, let's multiply by that ratio
    // to get the proper placement of our overlay box and add in the margin I placed around
    // the image
    if (!!canines) {
      for (let canine of canines){
        let positions = {
          thisLeft: canine.coordinates[0][0] * 0.78125 + 15,
          thisTop: canine.coordinates[0][1] * 0.78125 + 15, 
          thisWidth: (canine.coordinates[1][0] - canine.coordinates[0][0]) * 0.78125, 
          thisHeight: (canine.coordinates[1][1] - canine.coordinates[0][1]) * 0.78125
        }
        let box = ( <div style={{position: 'absolute', 
                  zIndex: 10,
                  left: positions.thisLeft, 
                  top: positions.thisTop, 
                  width: positions.thisWidth, 
                  height: positions.thisHeight, 
                  borderWidth: 3, 
                  borderStyle: 'solid', 
                  borderColor: '#6ed637', 
                  backgroundColor: 'transparent'}} 
                  alt="coordinates of puppy found"></div>
              );
          
        boxes.push(box);
      }
    }
    
    return boxes;
  }

  renderPuppyCards() {
    let { titles, images, canines } = this.state,
        { classes } = this.props,
        puppyCards = [];
        
    for (let i in titles) {  
      let puppyCard = (
        <div>
          <Typography variant='h6' style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
            { titles[i] }
          </Typography>

          <Paper elevation={3} style={{margin: 5, position: 'relative' }}>
            <img className={classes.img} id='puppy-results' style={{ width: 500, zIndex: 1, margin: 15  }} src={ images[i] } alt="machine learning puppy found" />
            { this.renderCoordinateBoxes(canines[i]) }
          </Paper>
          
          <Paper elevation={2} style={{margin: 5}}>
            <Table >

              <TableHead>
                <TableRow key={'puppy-table'}>
                  <TableCell style={{fontSize: '1.25em'}} size='medium'>Type</TableCell>
                  <TableCell style={{fontSize: '1.25em'}} size='medium'>Age</TableCell>
                  <TableCell style={{fontSize: '1.25em'}} size='medium'>Qty</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                { this.getTableContents(canines[i]) }  {/*  provide the canines array to use in this function  */}
              </TableBody>

            </Table>
          </Paper>
        </div>
      );

      puppyCards.push(puppyCard);
    }
    
    return puppyCards;
  }
 
  unique(value, index, self) { 
    return self.indexOf(value) === index;
  }

  getTableContents(canines) {
    let rows = [],
        puppyCounts = {};

    for (let i = 0; i < canines.length; i++) {
      puppyCounts[canines[i].type] = 1 + (puppyCounts[canines[i].type] || 0);
    }

    for (let i in puppyCounts) {
      let row = (
        <TableRow key={i}>
          <TableCell style={{fontSize: '1em'}} >{ i }</TableCell>
          <TableCell style={{fontSize: '1em'}} >{ canines[0] ? canines[0].age : '' }</TableCell>
          <TableCell style={{fontSize: '1em'}} >{ puppyCounts[i] }</TableCell>
        </TableRow>
      );
      rows.push(row);
    }

    return rows;
  }

  render() {
    const { classes, image, title, canines } = this.props;

    return (
        <div className={classes.container}>

          {/* SHOW THE TITLE */}
          <Typography variant='h6' style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
            { title }
          </Typography>

          {/* SHOW THE IMAGE WITH HIGHLIGHT BOXES */}
          <Paper elevation={3} style={{margin: 5, position: 'relative' }}>
            <img className={classes.img} id='puppy-results' style={{ width: 500, zIndex: 1, margin: 15  }} src={ image } alt="machine learning puppy found" />
            
            { this.renderCoordinateBoxes(canines) }
          </Paper>
          
          {/* SHOW THE TABLE */}
          <Paper elevation={2} style={{margin: 5}}>
            <Table >
              <TableHead>
                <TableRow key={'puppy-table'}>
                  <TableCell style={{fontSize: '1.25em'}} size='medium'>Type</TableCell>
                  <TableCell style={{fontSize: '1.25em'}} size='medium'>Age</TableCell>
                  <TableCell style={{fontSize: '1.25em'}} size='medium'>Qty</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                { this.getTableContents(canines) }  {/*  provide the canines array to use in this function  */}
              </TableBody>
            </Table>
          </Paper>
        </div>

    );
  }
}

export default withStyles(styles)(PuppyCard);
