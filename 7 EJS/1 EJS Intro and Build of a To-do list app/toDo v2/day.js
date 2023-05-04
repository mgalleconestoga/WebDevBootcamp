/*  Custom node mudule that can be 'require()'d in another JS file (e.g. app.js) 
 *
 */

exports.getDate = function() {              // exports is short for module.exports
    const today = new Date();
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    return today.toLocaleDateString("en-US", options);
}

exports.getDay = function() {
    const today = new Date();
    const options = {
        weekday: "long",
    };
    const day = today.toLocaleDateString("en-US", options);
    return day;
}

//console.log(module);                    // view module object (contains the exports object) in console