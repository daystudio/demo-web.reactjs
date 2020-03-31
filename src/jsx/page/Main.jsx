import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';

import Dialog from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const styles = theme => ({
  root: {
    marginTop: '60px',
    marginBottom: '60px',
    paddingLeft: '5px',
    paddingRight: '5px',
  },
  card: {
    padding: '10px',
  },
  top_nav: {
    width: '100%',
    position: 'fixed',
    top: 0,
    backgroundColor: '#008577',
    color: "#FFFFFF",
  },
  top_nav_title: {
    fontWeight: "bold",
    flexGrow: 1,
  },
  top_nav_menu: {
    marginRight: theme.spacing(2),
  },
  media: {
    height: 240,
  },
});

const URL_POSTS = "https://crt8b3p0n9.execute-api.ap-southeast-1.amazonaws.com/prod"
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
      ],
      rs:{
        a: 'https://s3-ap-southeast-1.amazonaws.com/k.demo-mobile/steve.png',
        u: 'Steve Jobs',
        t: '2019-12-31',
        c: 'Toy Story 5: Woody, Buzz Lightyear and the rest of the gang embark on a road trip with Bonnie and a new toy named Forky.',
        i: 'https://s3-ap-southeast-1.amazonaws.com/k.demo-mobile/toystory4.jpg'
      },
      dialog_open: false
    };
    this.get_data();
  }
  handleClickOpen=()=> {
    this.setState({ dialog_open: true});
  };

  handleClose=()=> {
    this.setState({ dialog_open: false});
  };
  Transition=React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  get_data=()=>{
    axios
      .get(URL_POSTS, {
        params:{
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        console.log('response.data=' + JSON.stringify(response.data))
        if (response.data.length > 0) {
          this.setState({ data: response.data});
        } else {
          this.setState({ data: []});
        }
      })
  };
  render() {
    const { classes } = this.props;
    const self = this;
    return(
      <div>
        <AppBar className={classes.top_nav}>
          <Toolbar>
            <IconButton onClick={this.handleDrawerToggle} edge="start" className={classes.top_nav_menu} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Button
              color="inherit"
              className={classes.top_nav_title}
              onClick={(e) => {
              }}>
              <Typography variant="h6" className={classes.top_nav_title}>
                Demo
              </Typography>
            </Button>
            <IconButton color="inherit"
              onClick={async(e) => {
                this.handleClickOpen();
                // const rs = this.state.rs;
                // rs.push({n:"New",t:"NIV",r:"",c:"0/1189"});
                // await this.setState({rs:rs});
                // this.save_data();
              }}>
              <AddIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className={classes.root}>
        {self.state.data.map(d => (
          <Card key={d.id}>
            <CardHeader
              className={classes.card}
              avatar={
                <Avatar src={d.a}/>
              }
              title={d.u}
              subheader={d.t}
            />
            <CardContent
              className={classes.card}
            >
              <Typography variant="body2" color="textSecondary" component="p">
                {d.c}
              </Typography>
            </CardContent>
            <CardMedia
              className={classes.media}
              image={d.i}
            />
          </Card>
        ))}
        </div>
        <Dialog fullScreen open={this.state.dialog_open} onClose={this.handleClose} TransitionComponent={this.Transition}>
          <AppBar className={classes.top_nav}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.top_nav_title}>
              New Record
            </Typography>
            <IconButton color="inherit"
              onClick={async(e) => {
                console.log("sent:" + JSON.stringify(this.state.rs));
                axios
                  .post(URL_POSTS, this.state.rs,{
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }).then(response => {
                    console.log('response.data=' + JSON.stringify(response.data));
                    if (response.data.length > 0) {
                      this.setState({ data: response.data});
                    } else {
                      this.setState({ data: []});
                    }
                    this.handleClose();
                  })
              }}>
              <SaveIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List className={classes.root}>
          <ListItem>
            <TextField fullWidth label="Avatar" defaultValue={this.state.rs.a}
              onChange={event => self.setState({rs:{
                  a: event.target.value,
                  u: this.state.rs.u,
                  t: this.state.rs.t,
                  c: this.state.rs.c,
                  i: this.state.rs.i
                }
              })}/>
          </ListItem>
          <Divider/>
          <ListItem>
            <TextField fullWidth label="Name" defaultValue={this.state.rs.u}
              onChange={event => self.setState({rs:{
                a: this.state.rs.a,
                u: event.target.value,
                t: this.state.rs.t,
                c: this.state.rs.c,
                i: this.state.rs.i
              }
            })}/>
          </ListItem>
          <Divider/>
          <ListItem>
            <TextField fullWidth label="Time" defaultValue={this.state.rs.t}
              onChange={event => self.setState({rs:{
                a: this.state.rs.a,
                u: this.state.rs.u,
                t: event.target.value,
                c: this.state.rs.c,
                i: this.state.rs.i
              }
            })}/>
          </ListItem>
          <Divider/>
          <ListItem>
            <TextField fullWidth label="Content" defaultValue={this.state.rs.c}
              onChange={event => self.setState({rs:{
                a: this.state.rs.a,
                u: this.state.rs.u,
                t: this.state.rs.t,
                c: event.target.value,
                i: this.state.rs.i
              }
            })}/>
          </ListItem>
          <Divider/>
          <ListItem>
            <TextField fullWidth label="Image" defaultValue={this.state.rs.i}
              onChange={event => self.setState({rs:{
                a: this.state.rs.a,
                u: this.state.rs.u,
                t: this.state.rs.t,
                c: this.state.rs.c,
                i: event.target.value
              }
            })}/>
          </ListItem>
          <Divider/>
        </List>
      </Dialog>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);