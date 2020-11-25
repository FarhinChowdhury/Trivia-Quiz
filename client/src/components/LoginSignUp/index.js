import './LoginSignUp.css';
import { useHistory } from 'react-router-dom';

function LoginSignUp(props) {
  let history = useHistory();
  let disableSubmit = !(props.formInfo.username && 
                        props.formInfo.password && (props.formInfo.password.length>=8) && 
                        (props.action==='SignUp' ? props.formInfo.email : true)); 

  // Allow user to switch between login/signup
  let switchOption, switchText, switchButtonText;
  if (props.action==='Login') {
    switchText = "New User? Click here to";
    switchButtonText = "SignUp";
  } else {
    switchText = "Already Registered? Click here to";
    switchButtonText = "Login";
  }    
  switchOption = <p className="mb-2 text-center">{switchText}
    <span className="font-weight-bold" style={{cursor: 'pointer'}} 
          onClick={props.handleClick}> {switchButtonText}</span></p>;

  function submitThenNavigate(evt) {
    // console.log('[submitThenNavigate]');
    if (props.handleSubmit(evt)) {
      // console.log('[submitThenNavigate] (User logged in/Signed up)');
      // Redirect to Game page (TBD)
      // Redirect to Home page for now
      history.push("/");
    }
  }

  return (
    <div className="bg-secondary p-2 text-white login-signup">
      <form className="d-flex flex-column" onSubmit={submitThenNavigate}>
        {props.action==='SignUp' &&
          <>
            <label htmlFor="email">email</label>
            <input className="mb-3" type="text" id="email" name="email" placeholder="email"
                   value={props.formInfo.email} onChange={props.handleChange} />
          </>
        }
        <label htmlFor="username">username</label>
        <input className="mb-3" type="text" id="username" name="username" placeholder="username"
               value={props.formInfo.username} onChange={props.handleChange} />
        <label htmlFor="password">password (8+ characters) (currently:{props.formInfo.password.length})</label>
        <input className="mb-3" type="password" id="password" name="password" placeholder="password"
               value={props.formInfo.password} onChange={props.handleChange} />
        <button className="mb-2" type="submit" disabled={disableSubmit}>{props.action}</button>
        <button className="mb-2" type="button" onClick={()=>history.goBack()}>Cancel</button>
        <p className="text-center font-weight-bold">{props.formInfo.error}</p>
        {switchOption}
      </form>
    </div>
  );
}

export default LoginSignUp;