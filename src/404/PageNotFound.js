import "./PageNotFound.css"
import React from "react";
const PageNotFound = () => {
    return (
        <div>
             <div>
   
      <p className="zoom-area">
           cool 404 page.
      </p>
      <section className="error-container">
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
        <span className="zero">
          <span className="screen-reader-text">0</span>
        </span>
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
      </section>
      <div className="link-container">
        <a
          target="_blank"
          href="https://www.silocreativo.com/en/creative-examples-404-error-css/"
          className="more-link"
        >
          Visit the original article
        </a>
      </div>
    </div>


        </div>
    )
}

export default PageNotFound;