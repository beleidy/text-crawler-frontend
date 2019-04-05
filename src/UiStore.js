import { createContext } from "react";
import { decorate, observable, computed } from "mobx";

class UiStore {
  siteAddressTextBox = "";
}

decorate(UiStore, {
  siteAddressTextBox: observable
});

export default createContext(new UiStore());
