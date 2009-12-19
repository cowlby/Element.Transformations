/*
---
script: Element.Transformations.js

description: Custom natives to access the CSS3 transform properties.

license: MIT-style

authors:
- Jose Prado

requires:
  core/1.2.4: [Element]

provides: [Element.Transformations]

...
*/
(function() {

var regexes = {
    	rotate: /rotate\((\-?[\d\.]+)deg\)/i,
    	scale:  /scale\((\-?[\d\.]+)(?:, ?(\-?[\d\.]+))?\)/i,
    	scaleX: /scaleX\((\-?[\d\.]+)\)/i,
    	scaleY: /scaleY\((\-?[\d\.]+)\)/i,
    	skew:   /skew\((\-?[\d\.]+)deg(?:, ?(\-?[\d\.]+)deg)?\)/i,
    	skewX:  /skewX\((\-?[\d\.]+)deg\)/i,
    	skewY:  /skewY\((\-?[\d\.]+)deg\)/i,
    	translate: /translate\((\-?[\d\.]+(?:em|px|pt))(?:, ?(\-?[\d\.]+(?:em|px|pt)))?\)/i,
    	matrix: /matrix\((\-?[\d\.]+), ?(\-?[\d\.]+), ?(\-?[\d\.]+), ?(\-?[\d\.]+), ?(\-?[\d\.]+), ?(\-?[\d\.]+)\)/i
    },
    cssProperty = null,
    trident = false;

if (Browser.Engine.webkit) {
	cssProperty = '-webkit-transform';
} else if (Browser.Engine.gecko) {
	cssProperty = '-moz-transform';
} else if (Browser.Engine.trident){
	trident = true;
	cssProperty = 'filter';
} else {
	return false;
}

function setTransform(el, which, cssValue) {
	if (trident) {
		el.style.filter = cssValue;
	} else {
		var curStyle = el.getStyle(cssProperty);
		if (curStyle == 'none') { curStyle = ''; }
	
		if (curStyle.test(regexes[which])) {
			el.setStyle(cssProperty, curStyle.replace(regexes[which], cssValue));
		} else {
			el.setStyle(cssProperty, (curStyle + ' ' + cssValue).clean());
		}
	}
}

function matrixize(m) {
	return 'progid:DXImageTransform.Microsoft.Matrix('+"M11="+m[0][0]+",M12="+m[0][1]+",M21="+m[1][0]+",M22="+m[1][1]+",SizingMethod='auto expand')";
}

function matrixply(m1, m2) {
	return [
		[ m1[0][0]*m2[0][0] + m1[0][1]*m2[1][0], m1[0][0]*m2[0][1] + m1[0][1]*m2[1][1] ],
		[ m1[1][0]*m2[0][0] + m1[1][1]*m2[1][0], m1[1][0]*m2[0][1] + m1[1][1]*m2[1][1] ]
	]
}

Element.Properties.rotation = {
	
	set: function(angle) {
		var a = (angle - this.retrieve('rotation', 0)).toRadians(),
		    c = Math.cos(a),
		    s = Math.sin(a),
		    from = this.retrieve('matrix', [[1, 0],[0, 1]]),
		    to = [[c, s],[-s, c]],
		    matrix = matrixply(from, to),
		    cssValue = (trident) ? matrixize(matrix) : 'rotate(' + angle + 'deg)';

		setTransform(this, 'rotate', cssValue);
		this.store('rotation', angle);
		this.store('matrix', matrix);
	},
	
	get: function() {
		return this.retrieve('rotation', 0);
	}
	
};

Element.Properties.scaling = {

	set: function(sx, sy) {
		var scaleX = sx / this.retrieve('scaling:sx', 1),
		    scaleY = sy ? sy / this.retrieve('scaling:sy', 1) : scaleX,
		    from = this.retrieve('matrix', [[1,0],[0,1]]),
		    to = [[scaleX, 0],[0, scaleY]],
		    matrix = matrixply(from, to),
		    cssValue = (trident) ? matrixize(matrix) : 'scale(' + sx + ($defined(sy) ? ',' + sy : '') + ')';

		setTransform(this, 'scale', cssValue);
		this.store('scaling:sx', sx);
		this.store('scaling:sy', sy || sx);
		this.store('matrix', matrix);
	},

	get: function() {
		return [this.retrieve('scaling:sx', 1),
		        this.retrieve('scaling:sy', 1)];
	}
	
};

Element.Properties.skewing = {

	set: function(ax, ay) {
		var from = this.retrieve('matrix', [[1,0],[0,1]]),
		    to = [1, Math.tan(ax.toRadians()), ay ? Math.tan(ay.toRadians()) : 0, 1],
		    matrix = matrixply(from, to),
		    cssValue = (trident) ? matrixize(matrix) : 'skew(' + ax + 'deg' + ($defined(ay) ? ',' + ay + 'deg' : '') + ')';
		
		setTransform(this, 'skew', cssValue);
		this.store('skewing:ax', ax);
		this.store('skewing:ay', ay);
		this.store('matrix', matrix);
	},
	
	get: function() {
		return [this.retrieve('skewing:ax', 0),
		        this.retrieve('skewing:ay', 0)];
	}

};

Element.Properties.translation = {

	set: function(tx, ty) {
		var cssValue = 'translate(' + tx + ($defined(ty) ? ',' + ty : '') + ')';
		setTransform(this, 'translate', cssValue);
		this.store('translation:tx', tx);
		this.store('translation:ty', ty);
	},
	
	get: function() {
		return [this.retrieve('translation:tx', 0),
		        this.retrieve('translation:ty', 0)];
	}

};

Element.Properties.matrix = {

	set: function (m11, m12, m21, m22, tx, ty) {
		var matrix = [m11, m12, m21, m22],
		    cssValue = (trident) ? matrixize(m11, m12, m21, m22) :
		                           'matrix(' + m11 + ',' + m12 + ',' + m21 + ',' + m22 + ',' + tx + ',' + ty + ')';
		
		setTransform(this, 'matrix', cssValue);
		this.store('matrix:m11', m11);
		this.store('matrix:m12', m12);
		this.store('matrix:m21', m21);
		this.store('matrix:m22', m22);
		this.store('matrix:tx', tx);
		this.store('matrix:ty', ty);
	},
	
	get: function() {
		return [this.retrieve('matrix:m11', 1),
		        this.retrieve('matrix:m12', 0),
		        this.retrieve('matrix:m21', 0),
		        this.retrieve('matrix:m22', 1),
		        this.retrieve('matrix:tx', 0),
		        this.retrieve('matrix:ty', 0)]
	}
	
};

Element.implement({

	setRotation: function(angle) { return this.set('rotation', angle); },
	getRotation: function() { return this.get('rotation'); },
	
	setScaling: function(sx, sy) { return this.set('scaling', sx, sy); },
	getScaling: function() { return this.get('scaling'); },
	
	setSkewing: function(ax, ay) { return this.set('skewing', ax, ay); },
	getSkewing: function() { return this.get('skewing'); },
	
	setTranslation: function(tx, ty) { return this.set('translation', tx, ty); },
	getTranslation: function() { return this.get('translation'); },
	
	setMatrix: function(m11, m12, m21, m22, tx, ty) { return this.set('matrix', m11, m12, m21, m22, tx, ty); },
	getMatrix: function() { return this.get('matrix'); }
	
});

Number.implement({
	toRadians: function() { return this * Math.PI/180; },
	toDegrees: function() { return this * 180/Math.PI; }
});

})();