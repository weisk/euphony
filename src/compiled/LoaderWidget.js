// Generated by CoffeeScript 1.3.1
(function() {
  var LoaderWidget,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  LoaderWidget = (function() {

    LoaderWidget.name = 'LoaderWidget';

    LoaderWidget.prototype.opts = {
      color: '#aaaaaa',
      width: 4
    };

    function LoaderWidget() {
      this.stop = __bind(this.stop, this);

      this.start = __bind(this.start, this);

      this.message = __bind(this.message, this);

      this.onresize = __bind(this.onresize, this);
      this.window = $(window);
      this.overlay = $('<div>').width(this.window.width()).height(this.window.height()).hide().css({
        position: 'absolute',
        top: 0,
        left: 0,
        'z-index': 10000,
        background: 'rgba(0, 0, 0, 0.7)',
        'text-align': 'center'
      }).appendTo(document.body).on('selectstart', (function() {
        return false;
      }));
      this.box = $('<div>').width(300).height(200).appendTo(this.overlay);
      this.canvas = $('<div>').height(100).appendTo(this.box);
      this.text = $('<div>').css({
        color: '#ddd',
        'font-size': '0.9em',
        cursor: 'default'
      }).appendTo(this.box);
      this.onresize();
      this.window.resize(this.onresize);
    }

    LoaderWidget.prototype.onresize = function() {
      var height, width, _ref;
      _ref = [this.window.width(), this.window.height()], width = _ref[0], height = _ref[1];
      this.box.css({
        position: 'absolute',
        top: (height - 200) / 2,
        left: (width - 300) / 2
      });
      return this.overlay.width(width).height(height);
    };

    LoaderWidget.prototype.message = function(msg) {
      if (!this.isActive) {
        this.start();
      }
      if (msg != null) {
        return this.text.html(msg);
      }
    };

    LoaderWidget.prototype.start = function(callback) {
      var _this = this;
      this.overlay.fadeIn(function() {
        return typeof callback === "function" ? callback() : void 0;
      });
      if (this.spin) {
        this.spin.spin(this.canvas[0]);
      } else {
        this.spin = new Spinner(this.opts);
        this.spin.spin(this.canvas[0]);
      }
      return this.isActive = true;
    };

    LoaderWidget.prototype.stop = function(callback) {
      var _this = this;
      return this.overlay.fadeOut('slow', function() {
        var _ref;
        if ((_ref = _this.spin) != null) {
          _ref.stop();
        }
        _this.isActive = false;
        return typeof callback === "function" ? callback() : void 0;
      });
    };

    return LoaderWidget;

  })();

  this.LoaderWidget = LoaderWidget;

}).call(this);
