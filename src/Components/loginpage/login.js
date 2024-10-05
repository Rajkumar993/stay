import React, { Component } from 'react';
import { FaGoogle } from "react-icons/fa";
import $ from "jquery";
import { DOMAIN } from '../../env';
// import Dialog from '@material-ui/core/Dialog';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import TextField from '@material-ui/core/TextField';
// import { Button, Icon } from 'semantic-ui-react';

class LoginWithGoogle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNumberVerifyStatus: true,
      dialog: false,
      profile: null,
      mobile: '',
      errorText: '',
      loading: false,
    };
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.hash);
    const accessToken = urlParams.get('#access_token');
    if (accessToken) {
      this.fetchUserProfile(accessToken);
    } else {
      let url = window.location.href;
      url = url.split("redirectto=");
      if (url.length === 2) {
        localStorage.setItem("redirect", url[1]);
      } else {
        localStorage.setItem("redirect", window.location.href);
      }
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
        const profile = await response.json();
        if (profile.email) {
          this.check(profile);
        }
      } else {
        console.error('Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  check = async (profile) => {
    const email = profile.email;
    const url = `https://you.strackit.com/ALUMNI/loginandsignup/signuporsignin.php`;
    const data = { email };
    $.ajax({
      type: 'POST',
      data,
      url,
      success: (data) => {
        if (data === '0') {
          this.setState({ profile, dialog: true });
        } else {
          this.login(profile.email, data);
        }
      },
      error: (err) => {
        console.error('Error during check:', err);
      },
    });
  };

  login = (email, mobile) => {
    const url = `https://you.strackit.com/ALUMNI/loginandsignup/googlewithlogin.php`;
    const data = { email, mobile };
    $.ajax({
      type: 'POST',
      data,
      url,
      success: (data) => {
        try {
          JSON.parse(data);
          this.createCookie("stayyoung", data, 3);
        } catch (e) {
          this.setState({ errorText: "Invalid Credentials", loading: false });
        }
      },
      error: (err) => {
        console.error('Error during login:', err);
      },
    });
  };

  createCookie = (name, value, days) => {
    window.location.href = DOMAIN;
  };

  redirect = () => {
    return localStorage.getItem("redirect");
  };

  handleLogin = () => {
    const urlParams = new URLSearchParams(window.location.hash);
    const accessToken = urlParams.get('#access_token');
    if (accessToken) {
      this.fetchUserProfile(accessToken);
    } else {
      const googleLoginURL = 'https://accounts.google.com/o/oauth2/auth' +
        '?client_id=994442559389-q30qb1o7chsfdnkrjmohb22ohghd3a7b.apps.googleusercontent.com' +
        `&redirect_uri=${DOMAIN}` +
        '&response_type=token' +
        '&scope=email profile openid';  // Add the required scopes here
      window.location.href = googleLoginURL;
    }
  };

  verifyMobileNumber = () => {
    const { mobile, profile } = this.state;
    const url = `https://you.strackit.com/ALUMNI/loginandsignup/verifyphonenumber.php`;
    const data = { mobile };
    $.ajax({
      type: 'POST',
      data,
      url,
      success: (data) => {
        if (data === '1') {
          alert('Mobile Number is Already Register!!!');
        } else {
          this.setState({ mobileNumberVerifyStatus: false });
          this.login(profile.email, mobile);
        }
      },
      error: (err) => {
        console.error('Error verifying mobile number:', err);
      },
    });
  };

  render() {
    const { dialog, mobile } = this.state;

    return (
      <div>
        <button fluid onClick={this.handleLogin}>
        
        <FaGoogle />
        </button>

  
        
  { dialog && <div >
         <input
                id="Mobile"
                onChange={(event) => this.setState({ mobile: event.target.value })}
                label="Mobile"
                type="text"
                margin="normal"
                fullWidth
                value={mobile}
              /><br />
     
         
            <button onClick={this.verifyMobileNumber} basic color='blue'>Verify Mobile Number</button>
         </div>}
        
      </div>
    );
  }
}

export default LoginWithGoogle;