var FooBar = {};

(function(w, undefined){
  var
    options = {
      content: "FooBar Who?",
      background_colour: 'white',
      text_colour: [10,10,10],
      border_colour: [0,0,0, 0.4],
    },

    foobar,
    content,
    open,
    close;


  var init = function(){
    extend_options();
    injectStyles();

    inject();

    bindHandlers();

    if(isOpen()) {
      foobar.classList.add("foobar-active");
    } else {
      open.classList.toggle("foobar-active");
    };

    content.innerHTML = options.content;
  };

  var supported = function(){
    // https://developer.mozilla.org/en-US/docs/DOM/element.classList
    //
    // IE9 and under do not support classList. This is ideal, since we
    // only want FooBar to work on the latest modern browsers.
    return document.body.hasOwnProperty('classList');
  };

  var bindHandlers = function() {
    close.addEventListener('click', toggle);
    open.addEventListener('click', toggle);
  };

  var toggle = function(){
    if(isOpen()) {
      w.localStorage.setItem('foobar/close', "true");
    } else {
      w.localStorage.clear('foobar/close');
    }
    foobar.classList.toggle("foobar-active");
    open.classList.toggle("foobar-active");
  };

  var isOpen = function(){
    return w.localStorage.getItem('foobar/close') === null;
  };

  var inject = function(){
    foobar = document.createElement("div");
    foobar.id = "foobar";

    content = document.createElement("div");
    content.id = "foobar-content";

    close = document.createElement("span");
    close.id = "foobar-close";

    foobar.appendChild(content);
    foobar.appendChild(close);

    open = document.createElement("div");
    open.id = "foobar-open";
    open.innerHTML = "<span class='foobar-plus'></span>"

    document.body.appendChild(foobar);
    document.body.appendChild(open);
  };

  var extend_options = function(){
    if(typeof my_foobar === "object"){
      for (var prop in my_foobar) {
        if (options[prop] !== undefined) {
          options[prop] = my_foobar[prop];
        }
      }
    }
  };

  var injectStyles = function(){
    var
        // Create the style tag
        tag = document.createElement('style'),

        // Memo will hold our concatenated CSS string
        memo = '';

    // Iterate over each property in the styles object
    for (element in styles()) {
      memo += element + "{";
      for( style in styles()[element]){
        memo += style + ":" + styles()[element][style] + ';';
      }
      memo += "}";
    }

    tag.textContent = memo;
    document.body.insertBefore(tag, document.body.childNodes[0]);
  };

  var colour = function(value){

    // does value behave like an array?..
    if(value.join) {

      // ... and has frou elements, then assume it's an rgba color reference
      if(value.length === 4){
        return "rgba(" + value + ")";
      } else {
        return "rgb(" + value + ")";
      }
    } else {
      // Doesn't behave like an array? Then assume it's a string.
      return value;
    }
  };

  var styles = function(){
    return {
      '#foobar': {
        "background": colour(options.background_colour),
        "color": options.text_colour,
        "border-color": colour(options.border_colour),
      },
      '#foobar-open': {
        "border-color": colour(options.border_colour),
        "background": colour(options.background_colour)
      }
    };
  };

  w.onload = function(){
    if(supported()){
      init();
    }
  };

}(window));