import React from "react";

function Form(props) {
  return (
    <form className="form">
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      {!props.registered && <input type="password" placeholder="Confirm Password" /> }
      <button type="submit">{props.registered ? "Login" : "Register"} </button>
    </form>
  );
}

// Less efficient alternatives
// {props.registered === false && <input type="password" placeholder="Confirm Password" /> }
// {props.registered === false ? <input type="password" placeholder="Confirm Password" : null /> }
// Above we used 'not registered' (i.e. !props.registered)

export default Form;
