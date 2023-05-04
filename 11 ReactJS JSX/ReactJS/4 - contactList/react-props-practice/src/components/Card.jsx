import React from "react";
import Avatar from "./Avatar";
import Details from "./Details";

// Note: Chrome extension 'React Developer Tools' can be installed
//       it adds tabs to 'Developer Tools' in Chrome that allow you to see the props tree
//       and makes it easier to see/debug which properties you can tap into

function Card(props) {
    return (
    <div>
      <div className="card">
        <div className="top">
          <h2 className="name">{props.name}</h2>
          <Avatar imgURL={props.imgURL}/>  
        </div>
        <div className="bottom">
          <div className="info">
            <Details phone={props.phone} email={props.email} />
          </div>
        </div>
      </div>
    </div>
    );
}

export default Card;