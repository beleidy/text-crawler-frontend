import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import io from "socket.io-client";

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = io.connect("localhost:8000");
    this.getSiteText = this.getSiteText.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    siteTextObject: {},
    uriToFetch: ""
  };

  getSiteText(uri) {
    this.socket.emit("GetSiteText", this.state.uriToFetch, data =>
      this.setState({ siteTextObject: data[0]._source })
    );
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="container mx-auto px-4">
        <form class="w-full max-w-sm mx-auto">
          <div className="flex items-center border-b border-b-2 border-indigo py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-grey-darker mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              name="uriToFetch"
              value={this.state.uriToFetch}
              onChange={this.handleChange}
            />
            <button
              className="flex-no-shrink bg-indigo hover:bg-indigo-dark border-indigo hover:border-indigo-dark text-sm border-4 text-white py-1 px-2 rounded"
              onClick={this.getSiteText}
            >
              Get Text
            </button>
            <div>
              {"siteText" in this.state.siteTextObject &&
                this.state.siteTextObject.siteText}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
