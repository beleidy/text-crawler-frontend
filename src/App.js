import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import io from "socket.io-client";

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = io.connect(process.env.REACT_APP_BACKEND_ADDRESS);
    this.getSiteText = this.getSiteText.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
  }

  state = {
    siteTextObject: {},
    uriToFetch: ""
  };

  getSiteText(e) {
    e.preventDefault();
    this.socket.emit("GetSiteText", this.state.uriToFetch, data =>
      this.setState({ siteTextObject: data[0]._source })
    );
  }

  copyToClipboard() {
    if (this.state.siteTextObject.siteText) {
      const el = document.createElement("textarea");
      el.value = this.state.siteTextObject.siteText;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      const selected =
        document.getSelection().rangeCount > 0
          ? document.getSelection().getRangeAt(0)
          : false;
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
      }
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { domain, siteText, uri, lastUpdated } = this.state.siteTextObject;
    return (
      <div className="container mx-auto px-4">
        <form className="w-full max-w-sm mx-auto">
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
          </div>
        </form>
        <div className="pt-8">
          <div
            className={(domain ? "text-grey-darkest " : "text-grey ") + "my-2 "}
          >
            Domain:{" "}
            {domain ? (
              <span className="bg-indigo-lightest px-1 py-1"> {domain} </span>
            ) : (
              " - "
            )}
          </div>
          <div
            className={(uri ? "text-grey-darkest " : "text-grey ") + "my-2 "}
          >
            URI:{" "}
            {uri ? (
              <span className="bg-indigo-lightest px-1 py-1">{uri}</span>
            ) : (
              " - "
            )}
          </div>
          <div
            className={
              (lastUpdated ? "text-grey-darkest " : "text-grey ") + "my-2 "
            }
          >
            Last Updated:{" "}
            {lastUpdated ? (
              <span className="bg-indigo-lightest px-1 py-1">
                {new Date(lastUpdated).toTimeString()}
              </span>
            ) : (
              " - "
            )}
          </div>
        </div>

        {siteText ? (
          <div>
            <div className="relative text-grey-darkest bg-grey-lightest rounded shadow border border-solid border-indigo-lighter my-8 p-12">
              <button
                className="absolute text-sm text-black font-black hover:bg-indigo bg-indigo-lighter px-2 py-2 rounded pin-r pin-t"
                onClick={this.copyToClipboard}
              >
                Copy
                <svg
                  className="ml-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4l6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L14 6.5V12z" />
                </svg>
              </button>
              {siteText}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default App;
