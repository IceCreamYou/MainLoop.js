[![Build Status](https://travis-ci.org/IceCreamYou/MainLoop.js.svg?branch=gh-pages)](https://travis-ci.org/IceCreamYou/MainLoop.js) [![npm version](https://badge.fury.io/js/mainloop.js.svg)](https://www.npmjs.com/package/mainloop.js)

MainLoop.js provides a **well-constructed main loop** useful for JavaScript
games and other animated or time-dependent applications.

The main loop is a core part of any application in which state changes over
time. In games, it is typically responsible for computing physics and AI as
well as drawing the result on the screen.

Main loops are
[difficult to write correctly](http://www.isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing)
due to timing issues. **The vast majority of main loops found online are
written incorrectly**, resulting in applications that speed up or slow down
depending on the frame rate. This can cause unfortunate behavior like
characters running through walls or being unable to jump over obstacles. These
main loops can also result in applications that are non-deterministic. This
project solves these problems.

## Get started

 - **[Example](http://icecreamyou.github.com/MainLoop.js/demo/)**
   ([source code](https://github.com/IceCreamYou/MainLoop.js/blob/gh-pages/demo/index.html))
 - **[API documentation](http://icecreamyou.github.com/MainLoop.js/docs/#!/api/MainLoop)**
 - **[MainLoop.js source code](https://github.com/IceCreamYou/MainLoop.js/blob/gh-pages/src/mainloop.js)**
   (heavily documented to explain how it works - the source is about 75% docs)
 - **[How it works](http://www.isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing)**
   and a detailed walkthrough of what problems this project solves

### Installation

You can download the script normally, install it with Bower (`bower install
mainloop`), or install it with npm (`npm install mainloop.js`). To include it
on a page client-side without a module loader:

```html
<!-- from a direct download or git clone -->
<script src="build/mainloop.min.js"></script>

<!-- from Bower -->
<script src="bower_components/mainloop.js/build/mainloop.min.js"></script>

<!-- from npm -->
<script src="node_modules/mainloop.js/build/mainloop.min.js"></script>
```

You then have access to the `MainLoop` global.

MainLoop.js is also compatible with CommonJS (e.g. with node.js, io.js, or
browserify) and AMD (e.g. with RequireJS). This means that if you are using
a module loader or want to use MainLoop server-side you can call
`require('mainloop')` to get the `MainLoop` object or include `'mainloop'` in
the dependencies you pass to a `define()` call.

For TypeScript users, there are
[typings](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/mainloop.js)
available. Install them with `typings install dt~mainloop.js --global --save`.

### Usage

`MainLoop` works by running functions you define every time the browser is
ready to update the screen (up to about 60 times per second on most monitors).
There are four such functions, all of which are optional. You can set them
using the following methods:

 - `MainLoop.setBegin()`: the `begin` function runs at the beginning of each
   frame and is typically used to process input.
 - `MainLoop.setUpdate()`: the `update` function runs zero or more times per
   frame depending on the frame rate. It is used to compute anything affected
   by time - typically physics and AI movements.
 - `MainLoop.setDraw()`: the `draw` function should update the screen, usually
   by changing the DOM or painting a canvas.
 - `MainLoop.setEnd()`: the `end` function runs at the end of each frame and is
   typically used for cleanup tasks such as adjusting the visual quality based
   on the frame rate.

The `update` function receives a `delta` parameter which holds the amount of
time in milliseconds that should be simulated. This should be used to calculate
movement. For example, if an object `obj` has an x-axis velocity of 100 units
per second (0.1 units per millisecond), the `update` function might look like
this:

```javascript
function update(delta) {
    obj.x += 0.1 * delta;
}
```

This structure will ensure that your application behaves regardless of the
frame rate.

To start the application, simply call `MainLoop.start()`. For example, to start
the application for the first time, you might write:

```javascript
MainLoop.setUpdate(update).setDraw(draw).start();
```

You can call `MainLoop.stop()` to stop the application.

For more detail about the API, check out the
[documentation](http://icecreamyou.github.com/MainLoop.js/docs/#!/api/MainLoop).
You can also check out a
[usage example](http://icecreamyou.github.com/MainLoop.js/demo/)
([source code](https://github.com/IceCreamYou/MainLoop.js/blob/gh-pages/demo/index.html)).

## Notes

This project is
[MIT-licensed](https://github.com/IceCreamYou/MainLoop.js/blob/gh-pages/LICENSE.txt).

Compatible with all modern browsers (IE9+) including mobile browsers, as well
as node.js and io.js. There are no dependencies.

Contributions are welcome. To get started contributing, run `npm install` in
the project's directory, then run `grunt` before submitting a pull request to
update the minified script and the docs as well as to perform a style check.

The library is < 1KB minified and gzipped.

[Isaac Sukin](http://www.isaacsukin.com/)
([@IceCreamYou](https://twitter.com/IceCreamYou)) is the author of this
project. I'd love to hear about what you make! Special thanks to
[Ian Langworth](https://github.com/statico) for reviewing a version of this I
wrote for my
[book about making 3D browser games](http://www.packtpub.com/game-development-with-three-js/book)
and for some tips about web workers.
