Element.Transformations
=======================

This plugin lets you transform elements using 2d-matrix transformations. It gives you access to various transformations like rotation and scale with methods similar to "setOpacity" in mootools-core. Currently it supports the latest CSS3 extensions (-moz-transform and -webkit-transform) as well as IE's proprietary matrix filter.

![Screenshot](http://pradador.com/images/mootools/element.transformations.screenshot.jpg)


How to Use
----------

This plugin extends the Element Native by adding three new pairs of methods to quickly apply transformations.

### Rotation ###

You can rotate an element by using `setRotation(angle)` where angle is in degrees and you can get the angle of rotation by using `getRotation()`. It is an absolute angle so calling `setRotation(20)` after calling `setRotation(90)` will rotate the element to 20 degrees, not 110. Positive values rotate the element clockwise while negative values rotate the element counter-clockwise.

### Scaling ###

You can scale an element by using `setScaling(sx[, sy])` where sx and sy are the values to scale the element to in that axis. If you omit sy, the element will be scaled in both axises by the sx amount. It is an absolute factor so calling `setScaling(3)` after calling `setScaling(2)` will set the scale to 300% of the original size, not 600%. You can get the scaling of the element by using the complement function `getRotation()` which returns an array of the scale in each axis.

### Skewing ###

Skewing of an element is done using `setSkewing(ax[, ay])` where ax and ay are the angles in degrees to which the element will be skewed in that axis. If you omit ay, no skewing will be performed in the y axis. It is an absolute factor like the rotation function so the same behavior applies. The complement method `getSkewing()` returns an array with the skewing of the element in each axis.


Compatibility
-------------

Since 2d-matrix transformations aren't a CSS standard, support is dependent on vendor extensions. Currently Element.Transformations supports:

* Internet Explorer 6+
* Safari 3.1+
* Firefox 3.5+


Road-map
--------

Future plans include completing the rest of the basic transformations as well as adding SVG support to make a backwards-compatible plugin.


License
-------

Element.Transformations is licensed under the MIT License. Use it, modify it, have fun with it... in any circumstance.