/*
---
script: Element.Transformations.js

description: Custom natives to access the CSS3 transform properties.

license: MIT-style

authors:
- Jose Prado

requires:
  core/1.2.4: [Element]

provides: [Element.Transformations, Number.toRad, Number.toDeg]

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

function matrixply(el, m2) {
	var m1 = el.retrieve('matrix', [[1,0],[0,1]]);
	
	if (m1 == [0,0,0,0]) { // Check for an element that has disappeared. Need equal array test.
		m1 = [[1,0],[0,1]];
	}
	
	el.store('matrix', [
		[ m1[0][0]*m2[0][0] + m1[0][1]*m2[1][0], m1[0][0]*m2[0][1] + m1[0][1]*m2[1][1] ],
		[ m1[1][0]*m2[0][0] + m1[1][1]*m2[1][0], m1[1][0]*m2[0][1] + m1[1][1]*m2[1][1] ]
	]);
	
	return el.retrieve('matrix');
}

Element.Properties.rotation = {
	
	set: function(angle) {
		//if (trident) {
			var a = (angle - this.retrieve('rotation', 0)).toRad(),
		    	c = Math.cos(a),
		    	s = Math.sin(a),
		    	matrix = matrixply(this, [[c, s], [-s, c]]);
		
		//	setTransform(this, 'rotate', matrixize(matrix));
		//} else {
			setTransform(this, 'rotate', 'rotate('+angle+'deg)');
		//}
		
		this.store('rotation', angle);
	},
	
	get: function() {
		return this.retrieve('rotation', 0);
	}
	
};

Element.Properties.scaling = {

	set: function(sx, sy) {
		if (trident) {
			var scaleX = sx / (this.retrieve('scaling:sx', 1) || 1),
			    scaleY = (sy ? sy : sx) / (this.retrieve('scaling:sy', 1) || 1),
			    matrix = matrixply(this, [[scaleX, 0], [0, scaleY]]);
			
			setTransform(this, 'scale', matrixize(matrix));
		} else {
			setTransform(this, 'scale', 'scale('+sx+(sy?','+sy:'')+')');
		}
		
		this.store('scaling:sx', sx);
		this.store('scaling:sy', sy || sx);
	},

	get: function() {
		return [this.retrieve('scaling:sx', 1),
		        this.retrieve('scaling:sy', 1)];
	}
	
};

Element.Properties.skewing = {

	set: function(ax, ay) {
		var skewX = Math.tan(ax.toRad()) - Math.tan(this.retrieve('skewing:ax', 0).toRad()),
		    skewY = ay ? Math.tan(ay.toRad()) - Math.tan(this.retrieve('skewing:ay', 0).toRad()) : -Math.tan(this.retrieve('skewing:ay', 0).toRad()),
		    matrix = matrixply(this, [[1, skewY], [skewX, 1]]);
		
		//setTransform(this, 'skew', matrixize(matrix));
		
		setTransform(this, 'skew', 'skew('+ax+'deg'+(ay?','+ay+'deg':'')+')');

		this.store('skewing:ax', ax);
		this.store('skewing:ay', ay || 0);
	},
	
	get: function() {
		return [this.retrieve('skewing:ax', 0),
		        this.retrieve('skewing:ay', 0)];
	}

};

/*Element.Properties.translation = {

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
	
};*/

Element.implement({

	setRotation: function(angle) { return this.set('rotation', angle); },
	getRotation: function() { return this.get('rotation'); },
	
	setScaling: function(sx, sy) { return this.set('scaling', sx, sy); },
	getScaling: function() { return this.get('scaling'); },
	
	setSkewing: function(ax, ay) { return this.set('skewing', ax, ay); },
	getSkewing: function() { return this.get('skewing'); },
	
	//setTranslation: function(tx, ty) { return this.set('translation', tx, ty); },
	//getTranslation: function() { return this.get('translation'); },
	
	//setMatrix: function(m11, m12, m21, m22, tx, ty) { return this.set('matrix', m11, m12, m21, m22, tx, ty); },
	//getMatrix: function() { return this.get('matrix'); }
	
});

Number.implement({
	toRad: function() { return this * Math.PI/180; },
	toDeg: function() { return this * 180/Math.PI; }
});

})();