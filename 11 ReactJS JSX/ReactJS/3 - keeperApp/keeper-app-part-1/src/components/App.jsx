import React from "react";          // Allows file to run JSX

import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";

function App() {                    // Functions can only return a single HTML element (i.e. put inside a div)
    return (
        <div>
            <Header />
            <Note title="This is the title" content="This is the content" />
            <Note title="This is the next title" content="This is the next content"/>
            <Footer />
        </div> 
    );
}

export default App; 