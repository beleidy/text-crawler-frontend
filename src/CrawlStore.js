import { createContext } from "react";
import { decorate, observable, computed, action } from "mobx";
import io from "socket.io-client";

class CrawlStore {
  socketEvents = {
    GETSITETEXT: "GetSiteText",
    STATUSUPDATE: "StatusUpdate"
  };

  constructor() {
    this.socket = io.connect(process.env.REACT_APP_BACKEND_ADDRESS);
  }

  siteToCrawl = "";

  crawledSite = {
    domain: null,
    uri: null,
    siteText: null,
    lastUpdated: null
  };

  crawlingStatus = "Idle";

  getSiteText(uri) {
    this.socket.emit(
      this.socketEvents.GETSITETEXT,
      uri,
      data => (this.crawledSite = data[0]._source)
    );
  }

  getStatus() {
    this.socket.on(
      this.socketEvents.STATUSUPDATE,
      status => (this.crawledSite.status = status)
    );
  }
}

decorate(CrawlStore, {
  crawledSite: observable,
  crawlingStatus: observable,
  getSiteText: action,
  getStatus: action
});

export default createContext(new CrawlStore());
