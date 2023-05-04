import React from "react"

// Note: Chrome extension 'React Developer Tools' can be installed
//       it adds tabs to 'Developer Tools' in Chrome that allow you to see the props tree
//       and makes it easier to see/debug which properties you can tap into

function Avatar(props) {
    return (
        <div>
            <img
                className="circle-img"
                src={props.imgURL}
                alt="avatar_img"
            />
        </div>
    );
}

export default Avatar;