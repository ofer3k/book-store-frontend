import React from "react";
import Menu from "./Menu";
import MyGallery from './SlidingMenu'
import '../styles.css'
import '../aaStyle/layout.css'



const Layout = ({
    title = "Title",
    description = "Description",
    className,
    children
}) => (
    <div >
        <Menu />
        {/* <div className="jumbotron">
        
            <p className="lead"></p>
        </div> */}
      
        <div className={className}>{children}</div>
        
    </div>
);

export default Layout;
