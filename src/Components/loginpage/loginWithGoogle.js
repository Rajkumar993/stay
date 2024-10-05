import React, { Component } from 'react';
import $ from "jquery";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Grid, Image, Input, Button, Header, Icon } from 'semantic-ui-react';
import Cookies from "js-cookie";
import { DOMAIN } from '../../env';

class LoginWithGoogle extends Component {

  constructor(props) {
    super();
    this.state = {
      mobileNumberVerifyStatus: true,
      dialog: false
    }
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.hash);
    if (!urlParams.get('#access_token')) {
        
    }
    else {
        let accessToken = urlParams.get('#access_token');
        this.fetchUserProfile(accessToken);
    }
  }

  fetchUserProfile = async (accessToken) => {
    try {
        const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (response.ok) {
            let profile = await response.json();
        if (profile.email) {
            this.check(profile)
        }
        } else {
            console.error('Failed to fetch user profile');
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
  }

  check = async (profile) => {
    let context = this;
    let email = profile.email;
    let url = 'https://you.strackit.com/ALUMNI/loginandsignup/signuporsignin.php';
    let data = { email };
    $.ajax({
      type: 'POST', data, url,
      success: function(data) {
        if (data == 0 || data == '0') {
          context.setState({ profile, dialog: true })
        }
        else {
          context.login(profile.email, data)
        }
      },
      error: function(err) { }
    });
  }

  login = (email, mobile) => {
    let context = this;
    let url = 'https://you.strackit.com/ALUMNI/loginandsignup/googlewithlogin.php';
    let data = { email, mobile };
    $.ajax({
      type: 'POST', data, url,
      success: function(data) {
        try {
          JSON.parse(data);
          context.createCookie("stayyoung", data, 3);
        }
        catch(e) {
          context.setState({ errorText: "Invalid Credentials", loading: false });
        }
      },
      error: function(err) { }
    });
  }

  redirect() {
    return localStorage.getItem("redirect");
  }

  createCookie(name, value, days) {
    Cookies.set(name, value, days)
    window.location.href=DOMAIN
  }

  handleLogin = () => {
    const urlParams = new URLSearchParams(window.location.hash);
    const accessToken = urlParams.get('#access_token');
    if (accessToken) {
      this.fetchUserProfile(accessToken);
    }
    else {
      const googleLoginURL = 'https://accounts.google.com/o/oauth2/auth' +
        '?client_id=383556704030-8nsijq30u83uua2gngg9dnq5h5juo39q.apps.googleusercontent.com' +
        '&redirect_uri='+DOMAIN+'/login' +
        '&response_type=token' +
        '&scope=email profile openid';  // Add the required scopes here
      window.location.href = googleLoginURL;
    }
  };

  verifyMobileNumber = () => {
    let context = this;
    let { mobile } = this.state;
    let data = { mobile };
    let url = 'https://you.strackit.com/ALUMNI/loginandsignup/verifyphonenumber.php';
    $.ajax({
      type: 'POST', data, url,
      success: function(data) {
        if (data == 1 || data == '1') {
          alert('Mobile Number is Already Register!!!')
        }
        else {
          context.setState({ mobileNumberVerifyStatus: false })
          context.login(context.state.profile.email, mobile)
        }
      },
      error: function(err) { }
    });
  }

  render() {
    return (
      <div>

        <Icon circular style={{ cursor: 'pointer' }} onClick={ () => this.handleLogin()} name='google' />

        <Dialog open={this.state.dialog} aria-labelledby="responsive-dialog-title">
          <DialogTitle id="responsive-dialog-title" style={{width: 600}}>Enter Mobile Number</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <TextField id="Mobile" onChange={ (event) => this.setState({ mobile: event.target.value }) } label="Mobile" type="text" margin="normal" fullWidth /><br/>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.verifyMobileNumber} basic color='blue'>Verify Mobile Number</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
};

export default LoginWithGoogle;