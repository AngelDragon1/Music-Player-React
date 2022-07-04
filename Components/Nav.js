import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Nav = ({setLibraryStatus, libraryStatus }) => {
    return (
        <nav>
            <h1>Groovy</h1>
            <button 
            onClick={() => setLibraryStatus(!libraryStatus)}>
               <p> Library  </p>
                <FontAwesomeIcon icon={faMusic} id="icon"/>
            </button>
        </nav>
    )
};

export default Nav;