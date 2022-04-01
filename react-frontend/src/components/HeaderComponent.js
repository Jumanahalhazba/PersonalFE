import React, { Component } from 'react';
import Retro8 from "../../src/components/Retro8.png";
import Retro2 from "../../src/components/Retro2.png";
class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        const mystyle = {
            backgroundColor: "white",
           // CSS CODE
           };
        return (
            <div>
                {/* <div><a class="navbar-brand" href="#"> <img src= {Retro2} marginRight= "100" width="150" height="100" alt=""></img></a></div> */}

                <header>
                    
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark justify-content-center" >     
                    <a class="navbar-brand" href="#"> <img src= {Retro8} width="50" height="50" alt=""></img></a>   
                    <div><a href="/" className="navbar-brand">Home</a></div>
                    <div><a href= "/employees" className="navbar-brand">Employee Data</a></div>
                    <div><a href="/analysis" className="navbar-brand">Analytics</a></div>
                    {/* <a class="navbar-brand" href="/employees"> <img src= {Retro6} width="50" height="50" alt=""></img> </a>                                  */}

                    {/* <form class="form-inline my-2 my-lg-0"> */}
                    {/* <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input> */}
                    {/* <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
                    {/* </form> */}
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent
