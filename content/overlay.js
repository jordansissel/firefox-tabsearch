var tabsearch = {
  onLoad: function() {
    this.initialized = true;
    this.strings = document.getElementById("tabsearch-strings");
    this._console = Components.classes["@mozilla.org/consoleservice;1"].
       getService(Components.interfaces.nsIConsoleService);
    this._running = false;
    this._matches = Array();
  },

  debug: function(val) {
    //this._console.logStringMessage(val);
    dump(val);
  },

  find: function(text) {
    var num = gBrowser.browsers.length;
    var tokens = text.split(/\s+/);
    //this.debug(tokens);
    var re = new RegExp(text, "i");

    this._matches = Array();
    for (var i = 0; i < num; i++) {
      var b = gBrowser.getBrowserAtIndex(i);
      var tab = gBrowser.mTabContainer.childNodes[i];
      if (this.find_in_browser_tab(i, tokens)) {
        //this.debug(i + " matches " + tokens);
        this.show_el(tab);
        this._matches[this._matches.length] = tab;
      } else {
        this.hide_el(tab);
      }
    }
  },

  find_in_browser_tab: function(index, tokens) {
    var browser = gBrowser.getBrowserAtIndex(index);
    var tab = gBrowser.mTabContainer.childNodes[index];
    this._matches;
    for (var i = 0; i < tokens.length; i++) {
      var re = new RegExp(tokens[i], "i");
      var label = tab.label;
      var url = browser.currentURI.spec;
      var t_label = re.test(label);
      var t_url = re.test(url);
      //this.debug("url: (" + t_url + ") " + url + " vs " + re);
      //this.debug("label: (" + t_label + ") " + label + " vs " + re);
      if (!(t_label || t_url))
        return false;
    }
    return true;
  },

  cancel_search: function() {
    //this.debug("cancel");
    var num = gBrowser.browsers.length;
    for (var i = 0; i < num; i++) {
      var tab = gBrowser.mTabContainer.childNodes[i];
      this.show_el(tab);
    }

    this.hide_toolbar();
  },

  onTabSearchKeyPress: function(e) {
    if (e.keyCode == KeyEvent.DOM_VK_RETURN) {
      var find_string = document.getElementById("tabsearch-find-field");
      if (!find_string.value)
        return;

      gBrowser.mTabContainer.selectedItem = this._matches[0];
      this.cancel_search();
    } else if (e.keyCode == KeyEvent.DOM_VK_ESCAPE) {
      this.cancel_search();
      return false;
    }
  },

  onTabSearchInput: function(e) {
    var find_string = document.getElementById("tabsearch-find-field").value;

    if (find_string)
      this.find(find_string);
    //else
      //this.debug("EMPTY!");
  },

  onTabSearchBlur: function(e) {
    if (this._running)
      this.cancel_search(false);
  },

  show_toolbar: function() {
    if (this._running)
      return;

    var tabsearch_toolbar = document.getElementById("tabsearch-toolbar");
    this.show_el(tabsearch_toolbar);

    var input = document.getElementById("tabsearch-find-field");
    input.value = "";
    input.inputField.focus();
    input.focus();
    this._running = true;
  },

  hide_toolbar: function() {
    var input = document.getElementById("tabsearch-find-field");
    this._running = false;
    input.inputField.blur();
    input.blur();
    //this.debug("Hiding...");

    var tabsearch_toolbar = document.getElementById("tabsearch-toolbar");
    this.hide_el(tabsearch_toolbar);
  },

  show_el: function(el) {
    el.setAttribute("hidden", "");
  },

  hide_el: function(el) {
    el.setAttribute("hidden", "true");
  },

};

window.addEventListener("load", function(e) { tabsearch.onLoad(e); }, false);

        //var an = document.getAnonymousNodes(tab);
        //for (var j = 0; j < an.length; j++) {
          //an[j].style.setProperty("background-color", "red", "");
        //}
        //tab.style.setProperty("background-color", "red", "");
