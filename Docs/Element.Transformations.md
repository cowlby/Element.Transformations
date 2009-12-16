Native: Element {#Element}
==========================

Custom Native to allow all of its methods to be used with any extended DOM Element. Adds CSS3 transformation methods to read/write values. Check out [WebKit.org](http://webkit.org/blog/130/css-transforms/) and [Mozilla.org](https://developer.mozilla.org/en/CSS/-moz-transform) for more info.



Element Method: getRotation {#Element:getRotation}
--------------------------------------------------

Returns the rotation of the Element.

### Syntax: ###

	var degrees = myElement.getRotation();

### Returns: ###

* (*number*) The degrees of rotation of the Element. Defaults to 0.

### Examples: ###

**HTML**

	<div id="myElement" style="-webkit-transform: rotate(200deg);"></div>

**JavaScript**

	document.id('myElement').getRotation(); //returns 200
    


Element Method: setRotation {#Element:setRotation}
--------------------------------------------------

Sets the rotation of the Element.

### Syntax: ###

	myElement.setRotation(90);
    
### Arguments: ###

* degrees - (*number*) The degrees to rotate the Element to.

### Returns: ###

* (*object*) Reference to the Element.

### Examples: ###

**HTML**

	<div id="myElement"></div>

**JavaScript**

	document.id('myElement').setRotation(200); //myElement is now rotated to 200 degrees.




Element Method: getScaling {#Element:getScaling}
------------------------------------------------

Returns the scaling of the Element.

### Syntax: ###

	var scale = myElement.getScaling();

### Returns: ###

* (*mixed*) The scale factor of the Element. Returns array if scale has x and y values. Defaults to 1.

### Examples: ###

**HTML**

	<div id="myElement" style="-webkit-transform: scale(2);"></div>

**JavaScript**

	document.id('myElement').getScaling(); //returns 2



Element Method: setScaling {#Element:setScaling}
------------------------------------------------

Sets the scaling of the Element.

### Syntax: ###

	myElement.setScaling(2);
    
### Arguments: ###

* scale - (*mixed*) The new scale factor of the Element.

### Returns: ###

* (*object*) Reference to the Element.

### Examples: ###

**HTML**

	<div id="myElement"></div>

**JavaScript**

	document.id('myElement').setScaling(2, 1); //myElement is scaled by 2 in the X direction.




Element Method: getSkewing {#Element:getSkewing}
------------------------------------------------

Returns the skewing of the element.

### Syntax: ###

	var skewing = myElement.getSkewing();

### Returns: ###

* (*mixed*) The degrees of skewing of the Element. Returns array if skew has x and y values. Defaults to 0.

### Examples: ###

**HTML**

	<div id="myElement" style="-webkit-transform: skew(20deg, 50deg);"></div>

**JavaScript**

	document.id('myElement').getSkewing(); //returns [20, 50]



Element Method: setSkewing {#Element:setSkewing}
------------------------------------------------

Sets the skewing of the Element.

### Syntax: ###

	myElement.setSkewing(20);
    
### Arguments: ###

* skew - (*mixed*) The new skewing for the Element.

### Returns: ###

* (*object*) Reference to the Element.

### Examples: ###

**HTML**

	<div id="myElement"></div>

**JavaScript**

	document.id('myElement').setSkewing(20); //myElement is now skewed by 20 degrees in X and Y directions.
