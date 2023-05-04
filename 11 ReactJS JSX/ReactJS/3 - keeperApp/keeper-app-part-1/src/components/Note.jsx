import React from "react";          // Allows file to run JSX

function Note(props) {              // Object the contains custom properties (e.g. title, content) we can pass data to (see App.js)
    return (
        <div>
            <div className="note">
                <h1>{props.title}</h1>
                <p>{props.content}</p>
            </div> 
        </div>  
    );
}

export default Note; 
// export {Note};         // Alternative 