/*!
pluginify v1.0.0 (https://github.com/TechTarget/pluginify)
Author: Morgan Wigmanich <okize123@gmail.com> (http://github.com/okize)
Copyright (c) 2013 | Licensed under the MIT license
http://www.opensource.org/licenses/mit-license.php
*/
(function(factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory); // AMD
  } else if (typeof exports === 'object') {
    factory(require('jquery')); // CommonJS
  } else {
    factory(jQuery); // Browser globals
  }
})(function($) {

  'use strict';

  var pluginName = 'pluginify';

  var defaults = {
    property: true
  };

  var Plugin = (function() {
    function Plugin(element, options) {
      this.element = element;
      this.options = $.extend({}, defaults, options);
      this._defaults = defaults;
      this._name = pluginName;
      this.el = $(this.element);
      this.init();
    }

    Plugin.prototype.init = function() {
      this.el.css('color', '#FC1501');
    };

    return Plugin;

  })();

  $.fn[pluginName] = function (options) {
    this.each(function() {
      if (!$.data(this, pluginName)) {
        $.data(this, pluginName, new Plugin(this, options));
      }
    });
    return this;
  };

});
