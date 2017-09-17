// Unknown object could be in namespace:  at line: 12 in file: ./v1.5.1/rpg_core.js
// function JsExtensions() {
// Unknown object could be in namespace: Number at line: 89 in file: ./v1.5.1/rpg_core.js
//         value: function(array) {
// Unknown object could be in namespace: Number at line: 113 in file: ./v1.5.1/rpg_core.js
//         value: function() {
// Unknown object could be in namespace: Number at line: 126 in file: ./v1.5.1/rpg_core.js
//         value: function(element) {
// Unknown object could be in namespace: Utils at line: 304 in file: ./v1.5.1/rpg_core.js
//         get: function() { passive = true; }
// Unknown object could be in namespace: Bitmap at line: 801 in file: ./v1.5.1/rpg_core.js
//         get: function(){
// Unknown object could be in namespace: Bitmap at line: 807 in file: ./v1.5.1/rpg_core.js
//         get: function(){
// Unknown object could be in namespace: Bitmap at line: 814 in file: ./v1.5.1/rpg_core.js
//         get: function(){
// Unknown object could be in namespace: Bitmap at line: 1403 in file: ./v1.5.1/rpg_core.js
//     function rgbToHsl(r, g, b) {
// Unknown object could be in namespace: Bitmap at line: 1424 in file: ./v1.5.1/rpg_core.js
//     function hslToRgb(h, s, l) {
// Unknown object could be in namespace: Graphics at line: 2729 in file: ./v1.5.1/rpg_core.js
//     var oncontextmenu = function() { return false; };
// Unknown object could be in namespace: ScreenSprite at line: 6184 in file: ./v1.5.1/rpg_core.js
//     set: function (value) {
//undefined
declare interface Number {

/**
* Returns a number whose value is limited to the given range.
*
* @method Number.prototype.clamp
* @param {Number} min The lower boundary
* @param {Number} max The upper boundary
* @return {Number} A number in the range (min, max)
*/
	clamp(min, max);

/**
* Returns a modulo value which is always positive.
*
* @method Number.prototype.mod
* @param {Number} n The divisor
* @return {Number} A modulo value
*/
	mod(n);

/**
* Makes a number string with leading zeros.
*
* @method Number.prototype.padZero
* @param {Number} length The length of the output string
* @return {String} A string with leading zeros
*/
	padZero(length);
}

//undefined
declare interface String {

/**
* Replaces %1, %2 and so on in the string to the arguments.
*
* @method String.prototype.format
* @param {Any} ...args The objects to format
* @return {String} A formatted string
*/
	format();

/**
* Makes a number string with leading zeros.
*
* @method String.prototype.padZero
* @param {Number} length The length of the output string
* @return {String} A string with leading zeros
*/
	padZero(length);

/**
* Checks whether the string contains a given string.
*
* @method String.prototype.contains
* @param {String} string The string to search for
* @return {Boolean} True if the string contains a given string
*/
	contains(string);
}

//undefined
declare interface Math {

/**
* Generates a random integer in the range (0, max-1).
*
* @static
* @method Math.randomInt
* @param {Number} max The upper boundary (excluded)
* @return {Number} A random integer
*/
	randomInt(max);
}

/**
* The static class that defines utility methods.
*
* @class Utils
*/
declare class Utils {

/**
* Checks whether the option is in the query string.
*
* @static
* @method isOptionValid
* @param {String} name The option name
* @return {Boolean} True if the option is in the query string
*/
	isOptionValid(name);

/**
* Checks whether the platform is NW.js.
*
* @static
* @method isNwjs
* @return {Boolean} True if the platform is NW.js
*/
	isNwjs();

/**
* Checks whether the platform is a mobile device.
*
* @static
* @method isMobileDevice
* @return {Boolean} True if the platform is a mobile device
*/
	isMobileDevice();

/**
* Checks whether the browser is Mobile Safari.
*
* @static
* @method isMobileSafari
* @return {Boolean} True if the browser is Mobile Safari
*/
	isMobileSafari();

/**
* Checks whether the browser is Android Chrome.
*
* @static
* @method isAndroidChrome
* @return {Boolean} True if the browser is Android Chrome
*/
	isAndroidChrome();

/**
* Checks whether the browser can read files in the game folder.
*
* @static
* @method canReadGameFiles
* @return {Boolean} True if the browser can read files in the game folder
*/
	canReadGameFiles();

/**
* Makes a CSS color string from RGB values.
*
* @static
* @method rgbToCssColor
* @param {Number} r The red value in the range (0, 255)
* @param {Number} g The green value in the range (0, 255)
* @param {Number} b The blue value in the range (0, 255)
* @return {String} CSS color string
*/
	rgbToCssColor(r, g, b);
	generateRuntimeId();

/**
* Test this browser support passive event feature
*
* @static
* @method isSupportPassiveEvent
* @return {Boolean} this browser support passive event or not
*/
	isSupportPassiveEvent();
}

/**
* The resource class. Allows to be collected as a garbage if not use for some time or ticks
*
* @class CacheEntry
* @constructor
* @param {ResourceManager} resource manager
* @param {string} key, url of the resource
* @param {string} item - Bitmap, HTML5Audio, WebAudio - whatever you want to store in the cache
*/
declare class CacheEntry {

/**
* frees the resource
*/
	free(byTTL);

/**
* Allocates the resource
* @returns {CacheEntry}
*/
	allocate();

/**
* Sets the time to live
* @param {number} ticks TTL in ticks, 0 if not set
* @param {number} time TTL in seconds, 0 if not set
* @returns {CacheEntry}
*/
	setTimeToLive(ticks, seconds);
	isStillAlive();

/**
* makes sure that resource wont freed by Time To Live
* if resource was already freed by TTL, put it in cache again
*/
	touch();
}

/**
* Cache for images, audio, or any other kind of resource
* @param manager
* @constructor
*/
declare class CacheMap {

/**
* checks ttl of all elements and removes dead ones
*/
	checkTTL();

/**
* cache item
* @param key url of cache element
* @returns {*|null}
*/
	getItem(key);
	clear();
	setItem(key, item);
	update(ticks, delta);
}

declare class ImageCache {
	initialize();
	add(key, value);
	get(key);
	reserve(key, value, reservationId);
	releaseReservation(reservationId);
	_truncateCache();
	_mustBeHeld(item);
	isReady();
	getErrorBitmap();
}

declare class RequestQueue {
	initialize();
	enqueue(key, value);
	update();
	raisePriority(key);
	clear();
}

/**
* The point class.
*
* @class Point
* @constructor
* @param {Number} x The x coordinate
* @param {Number} y The y coordinate
*/
declare class Point extends PIXI.Point {

//undefined
	initialize(x?, y?);
}

/**
* The rectangle class.
*
* @class Rectangle
* @constructor
* @param {Number} x The x coordinate for the upper-left corner
* @param {Number} y The y coordinate for the upper-left corner
* @param {Number} width The width of the rectangle
* @param {Number} height The height of the rectangle
*/
declare class Rectangle extends PIXI.Rectangle {

//undefined
	initialize(x?, y?, width?, height?);
}

/**
* The basic object that represents an image.
*
* @class Bitmap
* @constructor
* @param {Number} width The width of the bitmap
* @param {Number} height The height of the bitmap
*/
declare class Bitmap {

/**
* Bitmap states(Bitmap._loadingState):
*
* none:
* Empty Bitmap
*
* pending:
* Url requested, but pending to load until startRequest called
*
* purged:
* Url request completed and purged.
*
* requesting:
* Requesting supplied URI now.
*
* requestCompleted:
* Request completed
*
* decrypting:
* requesting encrypted data from supplied URI or decrypting it.
*
* decryptCompleted:
* Decrypt completed
*
* loaded:
* loaded. isReady() === true, so It's usable.
*
* error:
* error occurred
*
*/
	_createCanvas(width, height);
	_createBaseTexture(source);
	_clearImgInstance();
	_renewCanvas();

//undefined
	initialize(width?, height?);

/**
* Loads a image file and returns a new bitmap object.
*
* @static
* @method load
* @param {String} url The image url of the texture
* @return Bitmap
*/
	load(url);

/**
* Takes a snapshot of the game screen and returns a new bitmap object.
*
* @static
* @method snap
* @param {Stage} stage The stage object
* @return Bitmap
*/
	snap(stage);

/**
* Checks whether the bitmap is ready to render.
*
* @method isReady
* @return {Boolean} True if the bitmap is ready to render
*/
	isReady();

/**
* Checks whether a loading error has occurred.
*
* @method isError
* @return {Boolean} True if a loading error has occurred
*/
	isError();

/**
* touch the resource
* @method touch
*/
	touch();

/**
* [read-only] The url of the image file.
*
* @property url
* @type String
*/
	url;

/**
* [read-only] The base texture that holds the image.
*
* @property baseTexture
* @type PIXI.BaseTexture
*/
	baseTexture;

/**
* [read-only] The bitmap canvas.
*
* @property canvas
* @type HTMLCanvasElement
*/
	canvas;

/**
* [read-only] The 2d context of the bitmap canvas.
*
* @property context
* @type CanvasRenderingContext2D
*/
	context;

/**
* [read-only] The width of the bitmap.
*
* @property width
* @type Number
*/
	width;

/**
* [read-only] The height of the bitmap.
*
* @property height
* @type Number
*/
	height;

/**
* [read-only] The rectangle of the bitmap.
*
* @property rect
* @type Rectangle
*/
	rect;

/**
* Whether the smooth scaling is applied.
*
* @property smooth
* @type Boolean
*/
	smooth;

/**
* The opacity of the drawing object in the range (0, 255).
*
* @property paintOpacity
* @type Number
*/
	paintOpacity;

/**
* Resizes the bitmap.
*
* @method resize
* @param {Number} width The new width of the bitmap
* @param {Number} height The new height of the bitmap
*/
	resize(width, height);

/**
* Performs a block transfer.
*
* @method blt
* @param {Bitmap} source The bitmap to draw
* @param {Number} sx The x coordinate in the source
* @param {Number} sy The y coordinate in the source
* @param {Number} sw The width of the source image
* @param {Number} sh The height of the source image
* @param {Number} dx The x coordinate in the destination
* @param {Number} dy The y coordinate in the destination
* @param {Number} [dw=sw] The width to draw the image in the destination
* @param {Number} [dh=sh] The height to draw the image in the destination
*/
	blt(source, sx, sy, sw, sh, dx, dy, dw, dh);

/**
* Performs a block transfer, using assumption that original image was not modified (no hue)
*
* @method blt
* @param {Bitmap} source The bitmap to draw
* @param {Number} sx The x coordinate in the source
* @param {Number} sy The y coordinate in the source
* @param {Number} sw The width of the source image
* @param {Number} sh The height of the source image
* @param {Number} dx The x coordinate in the destination
* @param {Number} dy The y coordinate in the destination
* @param {Number} [dw=sw] The width to draw the image in the destination
* @param {Number} [dh=sh] The height to draw the image in the destination
*/
	bltImage(source, sx, sy, sw, sh, dx, dy, dw, dh);

/**
* Returns pixel color at the specified point.
*
* @method getPixel
* @param {Number} x The x coordinate of the pixel in the bitmap
* @param {Number} y The y coordinate of the pixel in the bitmap
* @return {String} The pixel color (hex format)
*/
	getPixel(x, y);

/**
* Returns alpha pixel value at the specified point.
*
* @method getAlphaPixel
* @param {Number} x The x coordinate of the pixel in the bitmap
* @param {Number} y The y coordinate of the pixel in the bitmap
* @return {String} The alpha value
*/
	getAlphaPixel(x, y);

/**
* Clears the specified rectangle.
*
* @method clearRect
* @param {Number} x The x coordinate for the upper-left corner
* @param {Number} y The y coordinate for the upper-left corner
* @param {Number} width The width of the rectangle to clear
* @param {Number} height The height of the rectangle to clear
*/
	clearRect(x, y, width, height);

/**
* Clears the entire bitmap.
*
* @method clear
*/
	clear();

/**
* Fills the specified rectangle.
*
* @method fillRect
* @param {Number} x The x coordinate for the upper-left corner
* @param {Number} y The y coordinate for the upper-left corner
* @param {Number} width The width of the rectangle to fill
* @param {Number} height The height of the rectangle to fill
* @param {String} color The color of the rectangle in CSS format
*/
	fillRect(x, y, width, height, color);

/**
* Fills the entire bitmap.
*
* @method fillAll
* @param {String} color The color of the rectangle in CSS format
*/
	fillAll(color);

/**
* Draws the rectangle with a gradation.
*
* @method gradientFillRect
* @param {Number} x The x coordinate for the upper-left corner
* @param {Number} y The y coordinate for the upper-left corner
* @param {Number} width The width of the rectangle to fill
* @param {Number} height The height of the rectangle to fill
* @param {String} color1 The gradient starting color
* @param {String} color2 The gradient ending color
* @param {Boolean} vertical Wether the gradient should be draw as vertical or not
*/
	gradientFillRect(x, y, width, height, color1, color2, vertical);

/**
* Draw a bitmap in the shape of a circle
*
* @method drawCircle
* @param {Number} x The x coordinate based on the circle center
* @param {Number} y The y coordinate based on the circle center
* @param {Number} radius The radius of the circle
* @param {String} color The color of the circle in CSS format
*/
	drawCircle(x, y, radius, color);

/**
* Draws the outline text to the bitmap.
*
* @method drawText
* @param {String} text The text that will be drawn
* @param {Number} x The x coordinate for the left of the text
* @param {Number} y The y coordinate for the top of the text
* @param {Number} maxWidth The maximum allowed width of the text
* @param {Number} lineHeight The height of the text line
* @param {String} align The alignment of the text
*/
	drawText(text, x, y, maxWidth, lineHeight, align);

/**
* Returns the width of the specified text.
*
* @method measureTextWidth
* @param {String} text The text to be measured
* @return {Number} The width of the text in pixels
*/
	measureTextWidth(text);

/**
* Changes the color tone of the entire bitmap.
*
* @method adjustTone
* @param {Number} r The red strength in the range (-255, 255)
* @param {Number} g The green strength in the range (-255, 255)
* @param {Number} b The blue strength in the range (-255, 255)
*/
	adjustTone(r, g, b);

/**
* Rotates the hue of the entire bitmap.
*
* @method rotateHue
* @param {Number} offset The hue offset in 360 degrees
*/
	rotateHue(offset);

/**
* Applies a blur effect to the bitmap.
*
* @method blur
*/
	blur();

/**
* Add a callback function that will be called when the bitmap is loaded.
*
* @method addLoadListener
* @param {Function} listner The callback function
*/
	addLoadListener(listner);

/**
* @method _makeFontNameText
* @private
*/
	_makeFontNameText();

/**
* @method _drawTextOutline
* @param {String} text
* @param {Number} tx
* @param {Number} ty
* @param {Number} maxWidth
* @private
*/
	_drawTextOutline(text, tx, ty, maxWidth);

/**
* @method _drawTextBody
* @param {String} text
* @param {Number} tx
* @param {Number} ty
* @param {Number} maxWidth
* @private
*/
	_drawTextBody(text, tx, ty, maxWidth);

/**
* @method _onLoad
* @private
*/
	_onLoad();
	decode();

/**
* @method _callLoadListeners
* @private
*/
	_callLoadListeners();

/**
* @method _onError
* @private
*/
	_onError();

/**
* @method _setDirty
* @private
*/
	_setDirty();

/**
* updates texture is bitmap was dirty
* @method checkDirty
*/
	checkDirty();
	request(url);
	_requestImage(url);
	isRequestOnly();
	isRequestReady();
	startRequest();
}

/**
* The static class that carries out graphics processing.
*
* @class Graphics
*/
declare class Graphics {

/**
* Initializes the graphics system.
*
* @static
* @method initialize
* @param {Number} width The width of the game screen
* @param {Number} height The height of the game screen
* @param {String} type The type of the renderer.
*                 'canvas', 'webgl', or 'auto'.
*/
	initialize(width?, height?, type?);
	_setupCssFontLoading();
	canUseCssFontLoading();

/**
* Marks the beginning of each frame for FPSMeter.
*
* @static
* @method tickStart
*/
	tickStart();

/**
* Marks the end of each frame for FPSMeter.
*
* @static
* @method tickEnd
*/
	tickEnd();

/**
* Renders the stage to the game screen.
*
* @static
* @method render
* @param {Stage} stage The stage object to be rendered
*/
	render(stage);

/**
* Checks whether the renderer type is WebGL.
*
* @static
* @method isWebGL
* @return {Boolean} True if the renderer type is WebGL
*/
	isWebGL();

/**
* Checks whether the current browser supports WebGL.
*
* @static
* @method hasWebGL
* @return {Boolean} True if the current browser supports WebGL.
*/
	hasWebGL();

/**
* Checks whether the canvas blend mode 'difference' is supported.
*
* @static
* @method canUseDifferenceBlend
* @return {Boolean} True if the canvas blend mode 'difference' is supported
*/
	canUseDifferenceBlend();

/**
* Checks whether the canvas blend mode 'saturation' is supported.
*
* @static
* @method canUseSaturationBlend
* @return {Boolean} True if the canvas blend mode 'saturation' is supported
*/
	canUseSaturationBlend();

/**
* Sets the source of the "Now Loading" image.
*
* @static
* @method setLoadingImage
*/
	setLoadingImage(src);

/**
* Initializes the counter for displaying the "Now Loading" image.
*
* @static
* @method startLoading
*/
	startLoading();

/**
* Increments the loading counter and displays the "Now Loading" image if necessary.
*
* @static
* @method updateLoading
*/
	updateLoading();

/**
* Erases the "Now Loading" image.
*
* @static
* @method endLoading
*/
	endLoading();

/**
* Displays the loading error text to the screen.
*
* @static
* @method printLoadingError
* @param {String} url The url of the resource failed to load
*/
	printLoadingError(url);

/**
* Erases the loading error text.
*
* @static
* @method eraseLoadingError
*/
	eraseLoadingError();

/**
* Displays the error text to the screen.
*
* @static
* @method printError
* @param {String} name The name of the error
* @param {String} message The message of the error
*/
	printError(name, message);

/**
* Shows the FPSMeter element.
*
* @static
* @method showFps
*/
	showFps();

/**
* Hides the FPSMeter element.
*
* @static
* @method hideFps
*/
	hideFps();

/**
* Loads a font file.
*
* @static
* @method loadFont
* @param {String} name The face name of the font
* @param {String} url The url of the font file
*/
	loadFont(name, url);

/**
* Checks whether the font file is loaded.
*
* @static
* @method isFontLoaded
* @param {String} name The face name of the font
* @return {Boolean} True if the font file is loaded
*/
	isFontLoaded(name);

/**
* Starts playback of a video.
*
* @static
* @method playVideo
* @param {String} src
*/
	playVideo(src);

/**
* @static
* @method _playVideo
* @param {String} src
* @private
*/
	_playVideo(src);

/**
* Checks whether the video is playing.
*
* @static
* @method isVideoPlaying
* @return {Boolean} True if the video is playing
*/
	isVideoPlaying();

/**
* Checks whether the browser can play the specified video type.
*
* @static
* @method canPlayVideoType
* @param {String} type The video type to test support for
* @return {Boolean} True if the browser can play the specified video type
*/
	canPlayVideoType(type);

/**
* Sets volume of a video.
*
* @static
* @method setVideoVolume
* @param {Number} value
*/
	setVideoVolume(value);

/**
* Converts an x coordinate on the page to the corresponding
* x coordinate on the canvas area.
*
* @static
* @method pageToCanvasX
* @param {Number} x The x coordinate on the page to be converted
* @return {Number} The x coordinate on the canvas area
*/
	pageToCanvasX(x);

/**
* Converts a y coordinate on the page to the corresponding
* y coordinate on the canvas area.
*
* @static
* @method pageToCanvasY
* @param {Number} y The y coordinate on the page to be converted
* @return {Number} The y coordinate on the canvas area
*/
	pageToCanvasY(y);

/**
* Checks whether the specified point is inside the game canvas area.
*
* @static
* @method isInsideCanvas
* @param {Number} x The x coordinate on the canvas area
* @param {Number} y The y coordinate on the canvas area
* @return {Boolean} True if the specified point is inside the game canvas area
*/
	isInsideCanvas(x, y);

/**
* Calls pixi.js garbage collector
*/
	callGC();

/**
* The width of the game screen.
*
* @static
* @property width
* @type Number
*/
	width;

/**
* The height of the game screen.
*
* @static
* @property height
* @type Number
*/
	height;

/**
* The width of the window display area.
*
* @static
* @property boxWidth
* @type Number
*/
	boxWidth;

/**
* The height of the window display area.
*
* @static
* @property boxHeight
* @type Number
*/
	boxHeight;

/**
* The zoom scale of the game screen.
*
* @static
* @property scale
* @type Number
*/
	scale;

/**
* @static
* @method _createAllElements
* @private
*/
	_createAllElements();

/**
* @static
* @method _updateAllElements
* @private
*/
	_updateAllElements();

/**
* @static
* @method _updateRealScale
* @private
*/
	_updateRealScale();

/**
* @static
* @method _makeErrorHtml
* @param {String} name
* @param {String} message
* @return {String}
* @private
*/
	_makeErrorHtml(name, message);

/**
* @static
* @method _defaultStretchMode
* @private
*/
	_defaultStretchMode();

/**
* @static
* @method _testCanvasBlendModes
* @private
*/
	_testCanvasBlendModes();

/**
* @static
* @method _modifyExistingElements
* @private
*/
	_modifyExistingElements();

/**
* @static
* @method _createErrorPrinter
* @private
*/
	_createErrorPrinter();

/**
* @static
* @method _updateErrorPrinter
* @private
*/
	_updateErrorPrinter();

/**
* @static
* @method _createCanvas
* @private
*/
	_createCanvas();

/**
* @static
* @method _updateCanvas
* @private
*/
	_updateCanvas();

/**
* @static
* @method _createVideo
* @private
*/
	_createVideo();

/**
* @static
* @method _updateVideo
* @private
*/
	_updateVideo();

/**
* @static
* @method _createUpperCanvas
* @private
*/
	_createUpperCanvas();

/**
* @static
* @method _updateUpperCanvas
* @private
*/
	_updateUpperCanvas();

/**
* @static
* @method _clearUpperCanvas
* @private
*/
	_clearUpperCanvas();

/**
* @static
* @method _paintUpperCanvas
* @private
*/
	_paintUpperCanvas();

/**
* @static
* @method _createRenderer
* @private
*/
	_createRenderer();

/**
* @static
* @method _updateRenderer
* @private
*/
	_updateRenderer();

/**
* @static
* @method _createFPSMeter
* @private
*/
	_createFPSMeter();

/**
* @static
* @method _createModeBox
* @private
*/
	_createModeBox();

/**
* @static
* @method _createGameFontLoader
* @private
*/
	_createGameFontLoader();

/**
* @static
* @method _createFontLoader
* @param {String} name
* @private
*/
	_createFontLoader(name);

/**
* @static
* @method _centerElement
* @param {HTMLElement} element
* @private
*/
	_centerElement(element);

/**
* @static
* @method _disableTextSelection
* @private
*/
	_disableTextSelection();

/**
* @static
* @method _disableContextMenu
* @private
*/
	_disableContextMenu();

/**
* @static
* @method _applyCanvasFilter
* @private
*/
	_applyCanvasFilter();

/**
* @static
* @method _onVideoLoad
* @private
*/
	_onVideoLoad();

/**
* @static
* @method _onVideoError
* @private
*/
	_onVideoError();

/**
* @static
* @method _onVideoEnd
* @private
*/
	_onVideoEnd();

/**
* @static
* @method _updateVisibility
* @param {Boolean} videoVisible
* @private
*/
	_updateVisibility(videoVisible);

/**
* @static
* @method _isVideoVisible
* @return {Boolean}
* @private
*/
	_isVideoVisible();

/**
* @static
* @method _setupEventHandlers
* @private
*/
	_setupEventHandlers();

/**
* @static
* @method _onWindowResize
* @private
*/
	_onWindowResize();

/**
* @static
* @method _onKeyDown
* @param {KeyboardEvent} event
* @private
*/
	_onKeyDown(event);

/**
* @static
* @method _onTouchEnd
* @param {TouchEvent} event
* @private
*/
	_onTouchEnd(event);

/**
* @static
* @method _switchFPSMeter
* @private
*/
	_switchFPSMeter();

/**
* @static
* @method _switchStretchMode
* @return {Boolean}
* @private
*/
	_switchStretchMode();

/**
* @static
* @method _switchFullScreen
* @private
*/
	_switchFullScreen();

/**
* @static
* @method _isFullScreen
* @return {Boolean}
* @private
*/
	_isFullScreen();

/**
* @static
* @method _requestFullScreen
* @private
*/
	_requestFullScreen();

/**
* @static
* @method _cancelFullScreen
* @private
*/
	_cancelFullScreen();
}

declare class button {
	ontouchstart(event);
}

/**
* The static class that handles input data from the keyboard and gamepads.
*
* @class Input
*/
declare class Input {

/**
* Initializes the input system.
*
* @static
* @method initialize
*/
	initialize();

/**
* Clears all the input data.
*
* @static
* @method clear
*/
	clear();

/**
* Updates the input data.
*
* @static
* @method update
*/
	update();

/**
* Checks whether a key is currently pressed down.
*
* @static
* @method isPressed
* @param {String} keyName The mapped name of the key
* @return {Boolean} True if the key is pressed
*/
	isPressed(keyName);

/**
* Checks whether a key is just pressed.
*
* @static
* @method isTriggered
* @param {String} keyName The mapped name of the key
* @return {Boolean} True if the key is triggered
*/
	isTriggered(keyName);

/**
* Checks whether a key is just pressed or a key repeat occurred.
*
* @static
* @method isRepeated
* @param {String} keyName The mapped name of the key
* @return {Boolean} True if the key is repeated
*/
	isRepeated(keyName);

/**
* Checks whether a key is kept depressed.
*
* @static
* @method isLongPressed
* @param {String} keyName The mapped name of the key
* @return {Boolean} True if the key is long-pressed
*/
	isLongPressed(keyName);

/**
* [read-only] The four direction value as a number of the numpad, or 0 for neutral.
*
* @static
* @property dir4
* @type Number
*/
	dir4;

/**
* [read-only] The eight direction value as a number of the numpad, or 0 for neutral.
*
* @static
* @property dir8
* @type Number
*/
	dir8;

/**
* [read-only] The time of the last input in milliseconds.
*
* @static
* @property date
* @type Number
*/
	date;

/**
* @static
* @method _wrapNwjsAlert
* @private
*/
	_wrapNwjsAlert();

/**
* @static
* @method _setupEventHandlers
* @private
*/
	_setupEventHandlers();

/**
* @static
* @method _onKeyDown
* @param {KeyboardEvent} event
* @private
*/
	_onKeyDown(event);

/**
* @static
* @method _shouldPreventDefault
* @param {Number} keyCode
* @private
*/
	_shouldPreventDefault(keyCode);

/**
* @static
* @method _onKeyUp
* @param {KeyboardEvent} event
* @private
*/
	_onKeyUp(event);

/**
* @static
* @method _onLostFocus
* @private
*/
	_onLostFocus();

/**
* @static
* @method _pollGamepads
* @private
*/
	_pollGamepads();

/**
* @static
* @method _updateGamepadState
* @param {Gamepad} gamepad
* @param {Number} index
* @private
*/
	_updateGamepadState(gamepad);

/**
* @static
* @method _updateDirection
* @private
*/
	_updateDirection();

/**
* @static
* @method _signX
* @private
*/
	_signX();

/**
* @static
* @method _signY
* @private
*/
	_signY();

/**
* @static
* @method _makeNumpadDirection
* @param {Number} x
* @param {Number} y
* @return {Number}
* @private
*/
	_makeNumpadDirection(x, y);

/**
* @static
* @method _isEscapeCompatible
* @param {String} keyName
* @return {Boolean}
* @private
*/
	_isEscapeCompatible(keyName);
}

//undefined
declare interface window {
	alert();
}

/**
* The static class that handles input data from the mouse and touchscreen.
*
* @class TouchInput
*/
declare class TouchInput {

/**
* Initializes the touch system.
*
* @static
* @method initialize
*/
	initialize();

/**
* Clears all the touch data.
*
* @static
* @method clear
*/
	clear();

/**
* Updates the touch data.
*
* @static
* @method update
*/
	update();

/**
* Checks whether the mouse button or touchscreen is currently pressed down.
*
* @static
* @method isPressed
* @return {Boolean} True if the mouse button or touchscreen is pressed
*/
	isPressed();

/**
* Checks whether the left mouse button or touchscreen is just pressed.
*
* @static
* @method isTriggered
* @return {Boolean} True if the mouse button or touchscreen is triggered
*/
	isTriggered();

/**
* Checks whether the left mouse button or touchscreen is just pressed
* or a pseudo key repeat occurred.
*
* @static
* @method isRepeated
* @return {Boolean} True if the mouse button or touchscreen is repeated
*/
	isRepeated();

/**
* Checks whether the left mouse button or touchscreen is kept depressed.
*
* @static
* @method isLongPressed
* @return {Boolean} True if the left mouse button or touchscreen is long-pressed
*/
	isLongPressed();

/**
* Checks whether the right mouse button is just pressed.
*
* @static
* @method isCancelled
* @return {Boolean} True if the right mouse button is just pressed
*/
	isCancelled();

/**
* Checks whether the mouse or a finger on the touchscreen is moved.
*
* @static
* @method isMoved
* @return {Boolean} True if the mouse or a finger on the touchscreen is moved
*/
	isMoved();

/**
* Checks whether the left mouse button or touchscreen is released.
*
* @static
* @method isReleased
* @return {Boolean} True if the mouse button or touchscreen is released
*/
	isReleased();

/**
* [read-only] The horizontal scroll amount.
*
* @static
* @property wheelX
* @type Number
*/
	wheelX;

/**
* [read-only] The vertical scroll amount.
*
* @static
* @property wheelY
* @type Number
*/
	wheelY;

/**
* [read-only] The x coordinate on the canvas area of the latest touch event.
*
* @static
* @property x
* @type Number
*/
	x;

/**
* [read-only] The y coordinate on the canvas area of the latest touch event.
*
* @static
* @property y
* @type Number
*/
	y;

/**
* [read-only] The time of the last input in milliseconds.
*
* @static
* @property date
* @type Number
*/
	date;

/**
* @static
* @method _setupEventHandlers
* @private
*/
	_setupEventHandlers();

/**
* @static
* @method _onMouseDown
* @param {MouseEvent} event
* @private
*/
	_onMouseDown(event);

/**
* @static
* @method _onLeftButtonDown
* @param {MouseEvent} event
* @private
*/
	_onLeftButtonDown(event);

/**
* @static
* @method _onMiddleButtonDown
* @param {MouseEvent} event
* @private
*/
	_onMiddleButtonDown(event);

/**
* @static
* @method _onRightButtonDown
* @param {MouseEvent} event
* @private
*/
	_onRightButtonDown(event);

/**
* @static
* @method _onMouseMove
* @param {MouseEvent} event
* @private
*/
	_onMouseMove(event);

/**
* @static
* @method _onMouseUp
* @param {MouseEvent} event
* @private
*/
	_onMouseUp(event);

/**
* @static
* @method _onWheel
* @param {WheelEvent} event
* @private
*/
	_onWheel(event);

/**
* @static
* @method _onTouchStart
* @param {TouchEvent} event
* @private
*/
	_onTouchStart(event);

/**
* @static
* @method _onTouchMove
* @param {TouchEvent} event
* @private
*/
	_onTouchMove(event);

/**
* @static
* @method _onTouchEnd
* @param {TouchEvent} event
* @private
*/
	_onTouchEnd(event);

/**
* @static
* @method _onTouchCancel
* @param {TouchEvent} event
* @private
*/
	_onTouchCancel(event);

/**
* @static
* @method _onPointerDown
* @param {PointerEvent} event
* @private
*/
	_onPointerDown(event);

/**
* @static
* @method _onTrigger
* @param {Number} x
* @param {Number} y
* @private
*/
	_onTrigger(x, y);

/**
* @static
* @method _onCancel
* @param {Number} x
* @param {Number} y
* @private
*/
	_onCancel(x, y);

/**
* @static
* @method _onMove
* @param {Number} x
* @param {Number} y
* @private
*/
	_onMove(x, y);

/**
* @static
* @method _onRelease
* @param {Number} x
* @param {Number} y
* @private
*/
	_onRelease(x, y);
}

/**
* The basic object that is rendered to the game screen.
*
* @class Sprite
* @constructor
* @param {Bitmap} bitmap The image for the sprite
*/
declare class Sprite extends PIXI.Sprite {

//undefined
	initialize(bitmap?);

/**
* The image for the sprite.
*
* @property bitmap
* @type Bitmap
*/
	bitmap;

/**
* The width of the sprite without the scale.
*
* @property width
* @type Number
*/
	width;

/**
* The height of the sprite without the scale.
*
* @property height
* @type Number
*/
	height;

/**
* The opacity of the sprite (0 to 255).
*
* @property opacity
* @type Number
*/
	opacity;

/**
* Updates the sprite for each frame.
*
* @method update
*/
	update();

/**
* Sets the x and y at once.
*
* @method move
* @param {Number} x The x coordinate of the sprite
* @param {Number} y The y coordinate of the sprite
*/
	move(x, y);

/**
* Sets the rectagle of the bitmap that the sprite displays.
*
* @method setFrame
* @param {Number} x The x coordinate of the frame
* @param {Number} y The y coordinate of the frame
* @param {Number} width The width of the frame
* @param {Number} height The height of the frame
*/
	setFrame(x, y, width, height);

/**
* Gets the blend color for the sprite.
*
* @method getBlendColor
* @return {Array} The blend color [r, g, b, a]
*/
	getBlendColor();

/**
* Sets the blend color for the sprite.
*
* @method setBlendColor
* @param {Array} color The blend color [r, g, b, a]
*/
	setBlendColor(color);

/**
* Gets the color tone for the sprite.
*
* @method getColorTone
* @return {Array} The color tone [r, g, b, gray]
*/
	getColorTone();

/**
* Sets the color tone for the sprite.
*
* @method setColorTone
* @param {Array} tone The color tone [r, g, b, gray]
*/
	setColorTone(tone);

/**
* @method _onBitmapLoad
* @private
*/
	_onBitmapLoad(bitmapLoaded);

/**
* @method _refresh
* @private
*/
	_refresh();

/**
* @method _isInBitmapRect
* @param {Number} x
* @param {Number} y
* @param {Number} w
* @param {Number} h
* @return {Boolean}
* @private
*/
	_isInBitmapRect(x, y, w, h);

/**
* @method _needsTint
* @return {Boolean}
* @private
*/
	_needsTint();

/**
* @method _createTinter
* @param {Number} w
* @param {Number} h
* @private
*/
	_createTinter(w, h);

/**
* @method _executeTint
* @param {Number} x
* @param {Number} y
* @param {Number} w
* @param {Number} h
* @private
*/
	_executeTint(x, y, w, h);

/**
* @method _renderCanvas
* @param {Object} renderer
* @private
*/
	_renderCanvas(renderer);

/**
* checks if we need to speed up custom blendmodes
* @param renderer
* @private
*/
	_speedUpCustomBlendModes(renderer);

/**
* @method _renderWebGL
* @param {Object} renderer
* @private
*/
	_renderWebGL(renderer);
}

/**
* The tilemap which displays 2D tile-based game map.
*
* @class Tilemap
* @constructor
*/
declare class Tilemap extends PIXI.Container {
	initialize();

/**
* The width of the screen in pixels.
*
* @property width
* @type Number
*/
	width;

/**
* The height of the screen in pixels.
*
* @property height
* @type Number
*/
	height;

/**
* The width of a tile in pixels.
*
* @property tileWidth
* @type Number
*/
	tileWidth;

/**
* The height of a tile in pixels.
*
* @property tileHeight
* @type Number
*/
	tileHeight;

/**
* Sets the tilemap data.
*
* @method setData
* @param {Number} width The width of the map in number of tiles
* @param {Number} height The height of the map in number of tiles
* @param {Array} data The one dimensional array for the map data
*/
	setData(width, height, data);

/**
* Checks whether the tileset is ready to render.
*
* @method isReady
* @type Boolean
* @return {Boolean} True if the tilemap is ready
*/
	isReady();

/**
* Updates the tilemap for each frame.
*
* @method update
*/
	update();

/**
* Forces to repaint the entire tilemap.
*
* @method refresh
*/
	refresh();

/**
* Forces to refresh the tileset
*
* @method refresh
*/
	refreshTileset();

/**
* @method updateTransform
* @private
*/
	updateTransform();

/**
* @method _createLayers
* @private
*/
	_createLayers();

/**
* @method _updateLayerPositions
* @param {Number} startX
* @param {Number} startY
* @private
*/
	_updateLayerPositions(startX, startY);

/**
* @method _paintAllTiles
* @param {Number} startX
* @param {Number} startY
* @private
*/
	_paintAllTiles(startX, startY);

/**
* @method _paintTiles
* @param {Number} startX
* @param {Number} startY
* @param {Number} x
* @param {Number} y
* @private
*/
	_paintTiles(startX, startY, x, y);

/**
* @method _readLastTiles
* @param {Number} i
* @param {Number} x
* @param {Number} y
* @private
*/
	_readLastTiles(i, x, y);

/**
* @method _writeLastTiles
* @param {Number} i
* @param {Number} x
* @param {Number} y
* @param {Array} tiles
* @private
*/
	_writeLastTiles(i, x, y, tiles);

/**
* @method _drawTile
* @param {Bitmap} bitmap
* @param {Number} tileId
* @param {Number} dx
* @param {Number} dy
* @private
*/
	_drawTile(bitmap, tileId, dx, dy);

/**
* @method _drawNormalTile
* @param {Bitmap} bitmap
* @param {Number} tileId
* @param {Number} dx
* @param {Number} dy
* @private
*/
	_drawNormalTile(bitmap, tileId, dx, dy);

/**
* @method _drawAutotile
* @param {Bitmap} bitmap
* @param {Number} tileId
* @param {Number} dx
* @param {Number} dy
* @private
*/
	_drawAutotile(bitmap, tileId, dx, dy);

/**
* @method _drawTableEdge
* @param {Bitmap} bitmap
* @param {Number} tileId
* @param {Number} dx
* @param {Number} dy
* @private
*/
	_drawTableEdge(bitmap, tileId, dx, dy);

/**
* @method _drawShadow
* @param {Bitmap} bitmap
* @param {Number} shadowBits
* @param {Number} dx
* @param {Number} dy
* @private
*/
	_drawShadow(bitmap, shadowBits, dx, dy);

/**
* @method _readMapData
* @param {Number} x
* @param {Number} y
* @param {Number} z
* @return {Number}
* @private
*/
	_readMapData(x, y, z);

/**
* @method _isHigherTile
* @param {Number} tileId
* @return {Boolean}
* @private
*/
	_isHigherTile(tileId);

/**
* @method _isTableTile
* @param {Number} tileId
* @return {Boolean}
* @private
*/
	_isTableTile(tileId);

/**
* @method _isOverpassPosition
* @param {Number} mx
* @param {Number} my
* @return {Boolean}
* @private
*/
	_isOverpassPosition(mx, my);

/**
* @method _sortChildren
* @private
*/
	_sortChildren();

/**
* @method _compareChildOrder
* @param {Object} a
* @param {Object} b
* @private
*/
	_compareChildOrder(a, b);
	isVisibleTile(tileId);
	isAutotile(tileId);
	getAutotileKind(tileId);
	getAutotileShape(tileId);
	makeAutotileId(kind, shape);
	isSameKindTile(tileID1, tileID2);
	isTileA1(tileId);
	isTileA2(tileId);
	isTileA3(tileId);
	isTileA4(tileId);
	isTileA5(tileId);
	isWaterTile(tileId);
	isWaterfallTile(tileId);
	isGroundTile(tileId);
	isShadowingTile(tileId);
	isRoofTile(tileId);
	isWallTopTile(tileId);
	isWallSideTile(tileId);
	isWallTile(tileId);
	isFloorTypeAutotile(tileId);
	isWallTypeAutotile(tileId);
	isWaterfallTypeAutotile(tileId);
}

/**
* The tilemap which displays 2D tile-based game map using shaders
*
* @class Tilemap
* @constructor
*/
declare class ShaderTilemap extends Tilemap {

/**
* Uploads animation state in renderer
*
* @method _hackRenderer
* @private
*/
	_hackRenderer(renderer);

/**
* PIXI render method
*
* @method renderCanvas
* @param {Object} pixi renderer
*/
	renderCanvas(renderer);

/**
* PIXI render method
*
* @method renderWebGL
* @param {Object} pixi renderer
*/
	renderWebGL(renderer);

/**
* Forces to repaint the entire tilemap AND update bitmaps list if needed
*
* @method refresh
*/
	refresh();

/**
* Call after you update tileset
*
* @method updateBitmaps
*/
	refreshTileset();

/**
* @method updateTransform
* @private
*/
	updateTransform();

/**
* @method _createLayers
* @private
*/
	_createLayers();

/**
* @method _updateLayerPositions
* @param {Number} startX
* @param {Number} startY
* @private
*/
	_updateLayerPositions(startX, startY);

/**
* @method _paintAllTiles
* @param {Number} startX
* @param {Number} startY
* @private
*/
	_paintAllTiles(startX, startY);

/**
* @method _paintTiles
* @param {Number} startX
* @param {Number} startY
* @param {Number} x
* @param {Number} y
* @private
*/
	_paintTiles(startX, startY, x, y);

/**
* @method _drawTile
* @param {Array} layers
* @param {Number} tileId
* @param {Number} dx
* @param {Number} dy
* @private
*/
	_drawTile(layer, tileId, dx, dy);

/**
* @method _drawNormalTile
* @param {Array} layers
* @param {Number} tileId
* @param {Number} dx
* @param {Number} dy
* @private
*/
	_drawNormalTile(layer, tileId, dx, dy);

/**
* @method _drawAutotile
* @param {Array} layers
* @param {Number} tileId
* @param {Number} dx
* @param {Number} dy
* @private
*/
	_drawAutotile(layer, tileId, dx, dy);

/**
* @method _drawTableEdge
* @param {Array} layers
* @param {Number} tileId
* @param {Number} dx
* @param {Number} dy
* @private
*/
	_drawTableEdge(layer, tileId, dx, dy);

/**
* @method _drawShadow
* @param {Number} shadowBits
* @param {Number} dx
* @param {Number} dy
* @private
*/
	_drawShadow(layer, shadowBits, dx, dy);
}

/**
* The sprite object for a tiling image.
*
* @class TilingSprite
* @constructor
* @param {Bitmap} bitmap The image for the tiling sprite
*/
//FIXME: extends PIXI.extrax.PictureTilingSprite but no d.ts for it
declare class TilingSprite {

//undefined
	initialize(bitmap?);

/**
* @method _renderCanvas
* @param {Object} renderer
* @private
*/
	_renderCanvas(renderer);

/**
* @method _renderWebGL
* @param {Object} renderer
* @private
*/
	_renderWebGL(renderer);

/**
* The image for the tiling sprite.
*
* @property bitmap
* @type Bitmap
*/
	bitmap;

/**
* The opacity of the tiling sprite (0 to 255).
*
* @property opacity
* @type Number
*/
	opacity;

/**
* Updates the tiling sprite for each frame.
*
* @method update
*/
	update();

/**
* Sets the x, y, width, and height all at once.
*
* @method move
* @param {Number} x The x coordinate of the tiling sprite
* @param {Number} y The y coordinate of the tiling sprite
* @param {Number} width The width of the tiling sprite
* @param {Number} height The height of the tiling sprite
*/
	move(x, y, width, height);

/**
* Specifies the region of the image that the tiling sprite will use.
*
* @method setFrame
* @param {Number} x The x coordinate of the frame
* @param {Number} y The y coordinate of the frame
* @param {Number} width The width of the frame
* @param {Number} height The height of the frame
*/
	setFrame(x, y, width, height);

/**
* @method updateTransform
* @private
*/
	updateTransform();

/**
* @method _onBitmapLoad
* @private
*/
	_onBitmapLoad();

/**
* @method _refresh
* @private
*/
	_refresh();

/**
* @method _renderWebGL
* @param {Object} renderer
* @private
*/
	_renderWebGL(renderer);
}

/**
* The sprite which covers the entire game screen.
*
* @class ScreenSprite
* @constructor
*/
declare class ScreenSprite extends PIXI.Container {
	initialize();

/**
* The opacity of the sprite (0 to 255).
*
* @property opacity
* @type Number
*/
	opacity;
	warnYep();
	anchor;
	blendMode;

/**
* Sets black to the color of the screen sprite.
*
* @method setBlack
*/
	setBlack();

/**
* Sets white to the color of the screen sprite.
*
* @method setWhite
*/
	setWhite();

/**
* Sets the color of the screen sprite by values.
*
* @method setColor
* @param {Number} r The red value in the range (0, 255)
* @param {Number} g The green value in the range (0, 255)
* @param {Number} b The blue value in the range (0, 255)
*/
	setColor(r, g, b);
}

/**
* The window in the game.
*
* @class Window
* @constructor
*/
declare interface Window extends PIXI.Container {
	initialize();

/**
* The image used as a window skin.
*
* @property windowskin
* @type Bitmap
*/
	windowskin;

/**
* The bitmap used for the window contents.
*
* @property contents
* @type Bitmap
*/
	contents;

/**
* The width of the window in pixels.
*
* @property width
* @type Number
*/
	width;

/**
* The height of the window in pixels.
*
* @property height
* @type Number
*/
	height;

/**
* The size of the padding between the frame and contents.
*
* @property padding
* @type Number
*/
	padding;

/**
* The size of the margin for the window background.
*
* @property margin
* @type Number
*/
	margin;

/**
* The opacity of the window without contents (0 to 255).
*
* @property opacity
* @type Number
*/
	opacity;

/**
* The opacity of the window background (0 to 255).
*
* @property backOpacity
* @type Number
*/
	backOpacity;

/**
* The opacity of the window contents (0 to 255).
*
* @property contentsOpacity
* @type Number
*/
	contentsOpacity;

/**
* The openness of the window (0 to 255).
*
* @property openness
* @type Number
*/
	openness;

/**
* Updates the window for each frame.
*
* @method update
*/
	update();

/**
* Sets the x, y, width, and height all at once.
*
* @method move
* @param {Number} x The x coordinate of the window
* @param {Number} y The y coordinate of the window
* @param {Number} width The width of the window
* @param {Number} height The height of the window
*/
	move(x, y, width, height);

/**
* Returns true if the window is completely open (openness == 255).
*
* @method isOpen
*/
	isOpen();

/**
* Returns true if the window is completely closed (openness == 0).
*
* @method isClosed
*/
	isClosed();

/**
* Sets the position of the command cursor.
*
* @method setCursorRect
* @param {Number} x The x coordinate of the cursor
* @param {Number} y The y coordinate of the cursor
* @param {Number} width The width of the cursor
* @param {Number} height The height of the cursor
*/
	setCursorRect(x, y, width, height);

/**
* Changes the color of the background.
*
* @method setTone
* @param {Number} r The red value in the range (-255, 255)
* @param {Number} g The green value in the range (-255, 255)
* @param {Number} b The blue value in the range (-255, 255)
*/
	setTone(r, g, b);

/**
* Adds a child between the background and contents.
*
* @method addChildToBack
* @param {Object} child The child to add
* @return {Object} The child that was added
*/
	addChildToBack(child);

/**
* @method updateTransform
* @private
*/
	updateTransform();

/**
* @method _createAllParts
* @private
*/
	_createAllParts();

/**
* @method _onWindowskinLoad
* @private
*/
	_onWindowskinLoad();

/**
* @method _refreshAllParts
* @private
*/
	_refreshAllParts();

/**
* @method _refreshBack
* @private
*/
	_refreshBack();

/**
* @method _refreshFrame
* @private
*/
	_refreshFrame();

/**
* @method _refreshCursor
* @private
*/
	_refreshCursor();

/**
* @method _refreshContents
* @private
*/
	_refreshContents();

/**
* @method _refreshArrows
* @private
*/
	_refreshArrows();

/**
* @method _refreshPauseSign
* @private
*/
	_refreshPauseSign();

/**
* @method _updateCursor
* @private
*/
	_updateCursor();

/**
* @method _updateContents
* @private
*/
	_updateContents();

/**
* @method _updateArrows
* @private
*/
	_updateArrows();

/**
* @method _updatePauseSign
* @private
*/
	_updatePauseSign();
}

/**
* The layer which contains game windows.
*
* @class WindowLayer
* @constructor
*/
declare class WindowLayer extends PIXI.Container {
	initialize();
	onRemoveAsAChild();

/**
* The width of the window layer in pixels.
*
* @property width
* @type Number
*/
	width;

/**
* The height of the window layer in pixels.
*
* @property height
* @type Number
*/
	height;

/**
* Sets the x, y, width, and height all at once.
*
* @method move
* @param {Number} x The x coordinate of the window layer
* @param {Number} y The y coordinate of the window layer
* @param {Number} width The width of the window layer
* @param {Number} height The height of the window layer
*/
	move(x, y, width, height);

/**
* Updates the window layer for each frame.
*
* @method update
*/
	update();

/**
* @method _renderCanvas
* @param {Object} renderSession
* @private
*/
	renderCanvas(renderer);

/**
* @method _canvasClearWindowRect
* @param {Object} renderSession
* @param {Window} window
* @private
*/
	_canvasClearWindowRect(renderSession, window);

/**
* @method _renderWebGL
* @param {Object} renderSession
* @private
*/
	renderWebGL(renderer);

/**
* @method _maskWindow
* @param {Window} window
* @private
*/
	_maskWindow(window, shift);
}

/**
* The weather effect which displays rain, storm, or snow.
*
* @class Weather
* @constructor
*/
declare class Weather extends PIXI.Container {
	initialize();

/**
* Updates the weather for each frame.
*
* @method update
*/
	update();

/**
* @method _createBitmaps
* @private
*/
	_createBitmaps();

/**
* @method _createDimmer
* @private
*/
	_createDimmer();

/**
* @method _updateDimmer
* @private
*/
	_updateDimmer();

/**
* @method _updateAllSprites
* @private
*/
	_updateAllSprites();

/**
* @method _addSprite
* @private
*/
	_addSprite();

/**
* @method _removeSprite
* @private
*/
	_removeSprite();

/**
* @method _updateSprite
* @param {Sprite} sprite
* @private
*/
	_updateSprite(sprite);

/**
* @method _updateRainSprite
* @param {Sprite} sprite
* @private
*/
	_updateRainSprite(sprite);

/**
* @method _updateStormSprite
* @param {Sprite} sprite
* @private
*/
	_updateStormSprite(sprite);

/**
* @method _updateSnowSprite
* @param {Sprite} sprite
* @private
*/
	_updateSnowSprite(sprite);

/**
* @method _rebornSprite
* @param {Sprite} sprite
* @private
*/
	_rebornSprite(sprite);
}

/**
* The color matrix filter for WebGL.
*
* @class ToneFilter
* @extends PIXI.Filter
* @constructor
*/
declare class ToneFilter extends PIXI.filters.ColorMatrixFilter {

/**
* Changes the hue.
*
* @method adjustHue
* @param {Number} value The hue value in the range (-360, 360)
*/
	adjustHue(value);

/**
* Changes the saturation.
*
* @method adjustSaturation
* @param {Number} value The saturation value in the range (-255, 255)
*/
	adjustSaturation(value);

/**
* Changes the tone.
*
* @method adjustTone
* @param {Number} r The red strength in the range (-255, 255)
* @param {Number} g The green strength in the range (-255, 255)
* @param {Number} b The blue strength in the range (-255, 255)
*/
	adjustTone(r, g, b);
}

/**
* The sprite which changes the screen color in 2D canvas mode.
*
* @class ToneSprite
* @constructor
*/
declare class ToneSprite extends PIXI.Container {
	initialize();

/**
* Clears the tone.
*
* @method reset
*/
	clear();

/**
* Sets the tone.
*
* @method setTone
* @param {Number} r The red strength in the range (-255, 255)
* @param {Number} g The green strength in the range (-255, 255)
* @param {Number} b The blue strength in the range (-255, 255)
* @param {Number} gray The grayscale level in the range (0, 255)
*/
	setTone(r, g, b, gray);

/**
* @method _renderCanvas
* @param {Object} renderSession
* @private
*/
	_renderCanvas(renderer);

/**
* @method _renderWebGL
* @param {Object} renderSession
* @private
*/
	_renderWebGL(renderer);
}

/**
* The root object of the display tree.
*
* @class Stage
* @constructor
*/
declare class Stage extends PIXI.Container {
	initialize();
}

/**
* The audio object of Web Audio API.
*
* @class WebAudio
* @constructor
* @param {String} url The url of the audio file
*/
declare class WebAudio {

//undefined
	initialize(url?);

/**
* Initializes the audio system.
*
* @static
* @method initialize
* @param {Boolean} noAudio Flag for the no-audio mode
* @return {Boolean} True if the audio system is available
*/
	initialize(noAudio?);

/**
* Checks whether the browser can play ogg files.
*
* @static
* @method canPlayOgg
* @return {Boolean} True if the browser can play ogg files
*/
	canPlayOgg();

/**
* Checks whether the browser can play m4a files.
*
* @static
* @method canPlayM4a
* @return {Boolean} True if the browser can play m4a files
*/
	canPlayM4a();

/**
* Sets the master volume of the all audio.
*
* @static
* @method setMasterVolume
* @param {Number} value Master volume (min: 0, max: 1)
*/
	setMasterVolume(value);

/**
* @static
* @method _createContext
* @private
*/
	_createContext();

/**
* @static
* @method _detectCodecs
* @private
*/
	_detectCodecs();

/**
* @static
* @method _createMasterGainNode
* @private
*/
	_createMasterGainNode();

/**
* @static
* @method _setupEventHandlers
* @private
*/
	_setupEventHandlers();

/**
* @static
* @method _onTouchStart
* @private
*/
	_onTouchStart();

/**
* @static
* @method _onVisibilityChange
* @private
*/
	_onVisibilityChange();

/**
* @static
* @method _onHide
* @private
*/
	_onHide();

/**
* @static
* @method _onShow
* @private
*/
	_onShow();

/**
* @static
* @method _shouldMuteOnHide
* @private
*/
	_shouldMuteOnHide();

/**
* @static
* @method _fadeIn
* @param {Number} duration
* @private
*/
	_fadeIn(duration);

/**
* @static
* @method _fadeOut
* @param {Number} duration
* @private
*/
	_fadeOut(duration);

/**
* Clears the audio data.
*
* @method clear
*/
	clear();

/**
* [read-only] The url of the audio file.
*
* @property url
* @type String
*/
	url;

/**
* The volume of the audio.
*
* @property volume
* @type Number
*/
	volume;

/**
* The pitch of the audio.
*
* @property pitch
* @type Number
*/
	pitch;

/**
* The pan of the audio.
*
* @property pan
* @type Number
*/
	pan;

/**
* Checks whether the audio data is ready to play.
*
* @method isReady
* @return {Boolean} True if the audio data is ready to play
*/
	isReady();

/**
* Checks whether a loading error has occurred.
*
* @method isError
* @return {Boolean} True if a loading error has occurred
*/
	isError();

/**
* Checks whether the audio is playing.
*
* @method isPlaying
* @return {Boolean} True if the audio is playing
*/
	isPlaying();

/**
* Plays the audio.
*
* @method play
* @param {Boolean} loop Whether the audio data play in a loop
* @param {Number} offset The start position to play in seconds
*/
	play(loop, offset);

/**
* Stops the audio.
*
* @method stop
*/
	stop();

/**
* Performs the audio fade-in.
*
* @method fadeIn
* @param {Number} duration Fade-in time in seconds
*/
	fadeIn(duration);

/**
* Performs the audio fade-out.
*
* @method fadeOut
* @param {Number} duration Fade-out time in seconds
*/
	fadeOut(duration);

/**
* Gets the seek position of the audio.
*
* @method seek
*/
	seek();

/**
* Add a callback function that will be called when the audio data is loaded.
*
* @method addLoadListener
* @param {Function} listner The callback function
*/
	addLoadListener(listner);

/**
* Add a callback function that will be called when the playback is stopped.
*
* @method addStopListener
* @param {Function} listner The callback function
*/
	addStopListener(listner);

/**
* @method _load
* @param {String} url
* @private
*/
	_load(url);

/**
* @method _onXhrLoad
* @param {XMLHttpRequest} xhr
* @private
*/
	_onXhrLoad(xhr);

/**
* @method _startPlaying
* @param {Boolean} loop
* @param {Number} offset
* @private
*/
	_startPlaying(loop, offset);

/**
* @method _createNodes
* @private
*/
	_createNodes();

/**
* @method _connectNodes
* @private
*/
	_connectNodes();

/**
* @method _removeNodes
* @private
*/
	_removeNodes();

/**
* @method _createEndTimer
* @private
*/
	_createEndTimer();

/**
* @method _removeEndTimer
* @private
*/
	_removeEndTimer();

/**
* @method _updatePanner
* @private
*/
	_updatePanner();

/**
* @method _onLoad
* @private
*/
	_onLoad();

/**
* @method _readLoopComments
* @param {Uint8Array} array
* @private
*/
	_readLoopComments(array);

/**
* @method _readOgg
* @param {Uint8Array} array
* @private
*/
	_readOgg(array);

/**
* @method _readMp4
* @param {Uint8Array} array
* @private
*/
	_readMp4(array);

/**
* @method _readMetaData
* @param {Uint8Array} array
* @param {Number} index
* @param {Number} size
* @private
*/
	_readMetaData(array, index, size);

/**
* @method _readLittleEndian
* @param {Uint8Array} array
* @param {Number} index
* @private
*/
	_readLittleEndian(array, index);

/**
* @method _readBigEndian
* @param {Uint8Array} array
* @param {Number} index
* @private
*/
	_readBigEndian(array, index);

/**
* @method _readFourCharacters
* @param {Uint8Array} array
* @param {Number} index
* @private
*/
	_readFourCharacters(array, index);
}

/**
* The static class that handles HTML5 Audio.
*
* @class Html5Audio
* @constructor
*/
declare class Html5Audio {

/**
* Sets up the Html5 Audio.
*
* @static
* @method setup
* @param {String} url The url of the audio file
*/
	setup(url);

/**
* Initializes the audio system.
*
* @static
* @method initialize
* @return {Boolean} True if the audio system is available
*/
	initialize();

/**
* @static
* @method _setupEventHandlers
* @private
*/
	_setupEventHandlers();

/**
* @static
* @method _onTouchStart
* @private
*/
	_onTouchStart();

/**
* @static
* @method _onVisibilityChange
* @private
*/
	_onVisibilityChange();

/**
* @static
* @method _onLoadedData
* @private
*/
	_onLoadedData();

/**
* @static
* @method _onError
* @private
*/
	_onError();

/**
* @static
* @method _onEnded
* @private
*/
	_onEnded();

/**
* @static
* @method _onHide
* @private
*/
	_onHide();

/**
* @static
* @method _onShow
* @private
*/
	_onShow();

/**
* Clears the audio data.
*
* @static
* @method clear
*/
	clear();

/**
* Set the URL of static se.
*
* @static
* @param {String} url
*/
	setStaticSe(url);

/**
* [read-only] The url of the audio file.
*
* @property url
* @type String
*/
	url;

/**
* Checks whether the audio data is ready to play.
*
* @static
* @method isReady
* @return {Boolean} True if the audio data is ready to play
*/
	isReady();

/**
* Checks whether a loading error has occurred.
*
* @static
* @method isError
* @return {Boolean} True if a loading error has occurred
*/
	isError();

/**
* Checks whether the audio is playing.
*
* @static
* @method isPlaying
* @return {Boolean} True if the audio is playing
*/
	isPlaying();

/**
* Plays the audio.
*
* @static
* @method play
* @param {Boolean} loop Whether the audio data play in a loop
* @param {Number} offset The start position to play in seconds
*/
	play(loop, offset);

/**
* Stops the audio.
*
* @static
* @method stop
*/
	stop();

/**
* Performs the audio fade-in.
*
* @static
* @method fadeIn
* @param {Number} duration Fade-in time in seconds
*/
	fadeIn(duration);

/**
* Performs the audio fade-out.
*
* @static
* @method fadeOut
* @param {Number} duration Fade-out time in seconds
*/
	fadeOut(duration);

/**
* Gets the seek position of the audio.
*
* @static
* @method seek
*/
	seek();

/**
* Add a callback function that will be called when the audio data is loaded.
*
* @static
* @method addLoadListener
* @param {Function} listner The callback function
*/
	addLoadListener(listner);

/**
* @static
* @method _load
* @param {String} url
* @private
*/
	_load(url);

/**
* @static
* @method _startPlaying
* @param {Boolean} loop
* @param {Number} offset
* @private
*/
	_startPlaying(loop, offset);

/**
* @static
* @method _onLoad
* @private
*/
	_onLoad();

/**
* @static
* @method _startGainTween
* @params {Number} duration
* @private
*/
	_startGainTween(duration);

/**
* @static
* @method _applyTweenValue
* @param {Number} volume
* @private
*/
	_applyTweenValue(volume);
}

/**
* The static class that handles JSON with object information.
*
* @class JsonEx
*/
declare class JsonEx {
	_generateId();

/**
* Converts an object to a JSON string with object information.
*
* @static
* @method stringify
* @param {Object} object The object to be converted
* @return {String} The JSON string
*/
	stringify(object);
	_restoreCircularReference(circulars);

/**
* Parses a JSON string and reconstructs the corresponding object.
*
* @static
* @method parse
* @param {String} json The JSON string
* @return {Object} The reconstructed object
*/
	parse(json);
	_linkCircularReference(contents, circulars, registry);
	_cleanMetadata(object);

/**
* Makes a deep copy of the specified object.
*
* @static
* @method makeDeepCopy
* @param {Object} object The object to be copied
* @return {Object} The copied object
*/
	makeDeepCopy(object);

/**
* @static
* @method _encode
* @param {Object} value
* @param {Array} circular
* @param {Number} depth
* @return {Object}
* @private
*/
	_encode(value, circular, depth);

/**
* @static
* @method _decode
* @param {Object} value
* @param {Array} circular
* @param {Object} registry
* @return {Object}
* @private
*/
	_decode(value, circular, registry);

/**
* @static
* @method _getConstructorName
* @param {Object} value
* @return {String}
* @private
*/
	_getConstructorName(value);

/**
* @static
* @method _resetPrototype
* @param {Object} value
* @param {Object} prototype
* @return {Object}
* @private
*/
	_resetPrototype(value, prototype);
}

declare class Decrypter {
	checkImgIgnore(url);
	decryptImg(url, bitmap);
	decryptHTML5Audio(url, bgm, pos);
	cutArrayHeader(arrayBuffer, length);
	decryptArrayBuffer(arrayBuffer);
	createBlobUrl(arrayBuffer);
	extToEncryptExt(url);
	readEncryptionkey();
}

declare class requestFile {
	onload();
	onerror();
	onload();
}

/**
* The static class that handles resource loading.
*
* @class ResourceHandler
*/
declare class ResourceHandler {
	createLoader(url, retryMethod, resignMethod, retryInterval);
	exists();
	retry();
}

