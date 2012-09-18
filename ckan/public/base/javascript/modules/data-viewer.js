// data viewer module
// resizes the iframe when the content is loaded
this.ckan.module('data-viewer', function (jQuery, _) {
  return {
    initialize: function () {
      jQuery.proxyAll(this, /_on/);
      this.el.on('load', this._onLoad);
      this._FirefoxFix();
    },

    _onLoad: function() {
      // WHAT IS THIS DOING AND WHY?
      loc = window.location.protocol + '//' + window.location.host;
      if (this.el.attr('src').substring(0, loc.length) === loc) {
        this._recalibrate();
        this.el.contents().find('body').resize(function() {
          this._recalibrate();
        });
      }
      else {
        this.el.animate({height: 600}, 600);
      }
    },

    _recalibrate: function() {
      // save reference to this to use in timeout
      var that = this;
      resizeTimer = setTimeout(function() {
        var height = that.el.contents().height();
        that.el.animate({height: height}, height);
      }, 100);
    },

    // firefox caches iframes so force it to get fresh content
    _FirefoxFix: function() {
      if(/#$/.test(this.el.src)){
        this.el.src = this.el.src.substr(0, this.src.length - 1);
      } else {
        this.el.src = this.el.src + '#';
      }
    }
  };
});
