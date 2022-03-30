import React, { Component } from 'react';
import Retro3 from "../../src/components/Retro3.png";

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">     
                    <a class="navbar-brand" href="#"> <img src= {Retro3} width="200" height="50" alt=""></img></a>                  
                    <div><a href="/" className="navbar-brand">Home</a></div>
                    <div><a href= "/employees" className="navbar-brand">Employee Data</a></div>
                    <div><a href="/analysis" className="navbar-brand">Analytics</a></div>
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
