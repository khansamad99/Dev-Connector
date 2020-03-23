import React,{Fragment,useState} from 'react';
import {Link} from 'react-router-dom';

const Login = () => {

    const [formData,setFormData] = useState({
      email:'',
      password:''
    });

    const {email,password} = formData;

    const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});

    const onSubmit = e => {
      e.preventDefault();
      console.log('Success');
    }
    return (
        <Fragment>
        <h1 className="large text-primary">Log In</h1>
        <p className="lead"><i class="fas fa-user"></i>Login to your account</p>
        <form className="form" action="create-profile.html" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input 
             type="email" 
             placeholder="Email Address" onChange={e => onChange(e)}
             value={email} 
             onChange={e => onChange(e)}
             name="email" />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={password}
              onChange={e => onChange(e)}
              name="password"
              minLength="6"
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="./register">Sign Up</Link>
        </p>
        </Fragment>
    )
}

export default Login;