import React,{Fragment,useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {setAlert} from '../../actions/alert';
import PropTypes from 'prop-types';


const Register = ({setAlert}) => {

    const [formData,setFormData] = useState({
      name:'',
      email:'',
      password:'',
      password2:''
    });

    const {name,email,password,password2} = formData;

    const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});

    const onSubmit = e => {
      e.preventDefault();
      if(password!==password2){
       setAlert('Passwords do not match','danger');
      }
      else{
        console.log(formData);
      }
    }
    return (
        <Fragment>
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead"><i class="fas fa-user"></i> Create Your Account</p>
        <form className="form" action="create-profile.html" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
             type="text"
             placeholder="Name" 
             value={name} 
             onChange={e => onChange(e)}
             name="name" 
             required />
          </div>
          <div className="form-group">
            <input 
             type="email" 
             placeholder="Email Address" onChange={e => onChange(e)}
             value={email} 
             onChange={e => onChange(e)}
             name="email" />
            <small className="form-text">
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email</small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => onChange(e)}
              name="password"
              minLength="6"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={password2}
              onChange={e => onChange(e)}
              name="password2"
              minLength="6"
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="./login">Sign In</Link>
        </p>
        </Fragment>
    )
}

Register.propTypes = {
  setAlert:PropTypes.func.isRequired,
}

export default connect(null,{setAlert})(Register);