import React, { Component } from 'react'

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
                    <div><a href="/" className="navbar-brand">Home</a></div>
                    <div><a href= "/employees" className="navbar-brand">Employee Data</a></div>
                    <div><a href="/employees" className="navbar-brand">Analytics</a></div>
                    <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent
