var tabsearch = {
  onLoad: function() {
    // initialization code
    this.initialized = true;
    this.strings = document.getElementById("tabsearch-strings");
  },

  onMenuItemCommand: function(e) {
    var promptService = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
                                  .getService(Components.interfaces.nsIPromptService);
    promptService.alert(window, this.strings.getString("helloMessageTitle"),
                                this.strings.getString("helloMessage"));
  },

  debug: function(val) {
    document.getElementById("tabsearch-debug").setAttribute("value", val);
  },

  find: function(text) {
    var num = gBrowser.browsers.length;
    var tokens = text.split(/\s+/);
    this.debug(tokens);
    var re = new RegExp(text, "i");
    for (var i = 0; i < num; i++) {
      var b = gBrowser.getBrowserAtIndex(i);
      var tab = gBrowser.mTabContainer.childNodes[i];
      if (this.find_in_browser_tab(i, tokens)) {
        tab.setAttribute("hidden", "");
      } else {
        tab.setAttribute("hidden", "true");
      }
    }
  },

  find_in_browser_tab: function(index, tokens) {
    var browser = gBrowser.getBrowserAtIndex(index);
    var tab = gBrowser.mTabContainer.childNodes[i];
    for (var i = 0; i < tokens.length; i++) {
      var re = new RegExp(tokens[i], "i");
      if (!(re.test(browser.currentURI.spec) && re.test(tab.label))) {
        return false;
      }
    }
    return true;
  },

  cancel_search: function() {
    var num = gBrowser.browsers.length;
    for (var i = 0; i < num; i++) {
      var tab = gBrowser.mTabContainer.childNodes[i];
      tab.setAttribute("hidden", "");
    }

    this.hide_toolbar();
  },

  onTabSearchKeyPress: function(e) {
    if (e.keyCode == KeyEvent.DOM_VK_RETURN) {
      var find_string = document.getElementById("tabsearch-find-field");
      //alert("Enter. " + find_string);
      if (!find_string.value)
        return;

      //alert(find_string.value);
      this.find(find_string.value);
      return false;
    } else if (e.keyCode == KeyEvent.DOM_VK_ESCAPE) {
      this.cancel_search();
      return false;
    }

    //var find_string = document.getElementById("tabsearch-find-field").value;

    //if (find_string)
      //this.find(find_string);
    //else 
      //this.cancel_search();
  },

  onTabSearchInput: function(e) {
    var find_string = document.getElementById("tabsearch-find-field").value;

    if (find_string)
      this.find(find_string);
    else 
      this.cancel_search();
  },

  onTabSearchBlur: function(e) {
    this.cancel_search();
  },

  show_toolbar: function() {
    var tabsearch_toolbar = document.getElementById("tabsearch-toolbar");
    tabsearch_toolbar.setAttribute("hidden", "");

    var input = document.getElementById("tabsearch-find-field");
    input.inputField.focus();
  },

  hide_toolbar: function() {
    var tabsearch_toolbar = document.getElementById("tabsearch-toolbar");
    tabsearch_toolbar.setAttribute("hidden", "true");
  },

};

window.addEventListener("load", function(e) { tabsearch.onLoad(e); }, false);

        //var an = document.getAnonymousNodes(tab);
        //for (var j = 0; j < an.length; j++) {
          //an[j].style.setProperty("background-color", "red", "");
        //}
        //tab.style.setProperty("background-color", "red", "");
