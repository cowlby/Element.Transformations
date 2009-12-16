describe('Element.getRotation', {
	
	'should return default value': function() {
		var el = new Element('div');
		value_of(el.getRotation()).should_be(0);
	},
	
	'should return correct values': function() {
		var el1 = new Element('div', { 'style': '-webkit-transform: rotate(0deg);' });
		var el2 = new Element('div', { 'style': '-webkit-transform: rotate(-90.1deg);' }).setRotation(-90.1);
		value_of(el1.getRotation()).should_be(0);
		value_of(el2.getRotation()).should_be(-90.1);
		value_of(el2.getStyle('-webkit-transform')).should_be('rotate(-90.1deg)');
	},
	
	'should handle bad input': function() {
		var el1 = new Element('div', { 'style': '-webkit-transform: rotate(0);' });
		var el2 = new Element('div', { 'style': '-webkit-transform: rotate(900);' });
		value_of(el1.getRotation()).should_be(0);
		value_of(el2.getRotation()).should_be(0);
	}
	
});

describe('Element.setRotation', {	
	
	'should set correct rotation angle': function() {
		var el1 = new Element('div', { 'style': '-webkit-transform: rotate(-90.1deg);' });
		var el2 = new Element('div');
		
		el1.setRotation(90);
		el2.setRotation(-100);
	
		value_of(el1.getRotation()).should_be(90);
		value_of(el2.getRotation()).should_be(-100);
	},
	
	'should handle bad input': function() {
		var el1 = new Element('div').setRotation(null);
		var el2 = new Element('div').setRotation('evil');
		
		value_of(el1.getRotation()).should_be(0);
		value_of(el2.getRotation()).should_be('evil');
		value_of(el2.getStyle('-webkit-transform')).should_not_match(/rotate\(evildeg\)/i);
	}

});

describe('Element.getScaling', {
	
	'should return default value': function() {
		var el = new Element('div');
		value_of(el.getScaling()).should_be([1, 1]);
	},
	
	'should return correct values': function() {
		var el1 = new Element('div', { 'style': '-webkit-transform: scale(2);' });
		var el2 = new Element('div', { 'style': '-webkit-transform: scale(5, 10);' }).setScaling(5, -10);
		value_of(el1.getScaling()).should_be([1, 1]);
		value_of(el2.getScaling()).should_be([5, -10]);
		value_of(el2.getStyle('-webkit-transform')).should_be('scale(5, -10)');
	},
	
	'should handle bad input': function() {
		var el1 = new Element('div', { 'style': '-webkit-transform: scale(0deg);' });
		var el2 = new Element('div', { 'style': '-webkit-transform: scale(evil);' });
		value_of(el1.getScaling()).should_be([1, 1]);
		value_of(el2.getScaling()).should_be([1, 1]);
	}
	
});

describe('Element.setScaling', {	
	
	'should set correct scaling values': function() {
		var el1 = new Element('div', { 'style': '-webkit-transform: scale(2, 1);' });
		var el2 = new Element('div');
		
		el1.setScaling(2, 2);
		el2.setScaling(-5.1, 2.3);
	
		value_of(el1.getScaling()).should_be([2, 2]);
		value_of(el2.getScaling()).should_be([-5.1, 2.3]);
	},
	
	'should handle bad input': function() {
		var el1 = new Element('div').setScaling(null);
		var el2 = new Element('div').setScaling('evil');
		
		value_of(el1.getScaling()).should_be([1, 1]);
		value_of(el2.getStyle('-webkit-transform')).should_not_match(/scale\(evil/i);
	}

});

describe('Element.getSkewing', {
	
	'should return default value': function() {
		var el = new Element('div');
		value_of(el.getSkewing()).should_be([0, 0]);
	},
	
	'should return correct values': function() {
		var el1 = new Element('div', { 'style': '-webkit-transform: skew(2deg);' });
		var el2 = new Element('div', { 'style': '-webkit-transform: skew(5deg, -10.1deg);' }).setSkewing(5, -10.1);
		value_of(el1.getSkewing()).should_be([0, 0]);
		value_of(el2.getSkewing()).should_be([5, -10.1]);
		value_of(el2.getStyle('-webkit-transform')).should_be('skew(5deg, -10.1deg)');
	},
	
	'should handle bad input': function() {
		var el1 = new Element('div', { 'style': '-webkit-transform: skew(0);' });
		var el2 = new Element('div', { 'style': '-webkit-transform: skew(evil);' });
		value_of(el1.getSkewing()).should_be([0, 0]);
		value_of(el2.getSkewing()).should_be([0, 0]);
	}
	
});

describe('Element.setSkewing', {	
	
	'should set correct scaling values': function() {
		var el1 = new Element('div', { 'style': '-webkit-transform: skew(20deg, 90deg);' });
		var el2 = new Element('div');
		
		el1.setSkewing(50, 50);
		el2.setSkewing(-50.1, 23.3);
	
		value_of(el1.getSkewing()).should_be([50, 50]);
		value_of(el2.getSkewing()).should_be([-50.1, 23.3]);
	},
	
	'should handle bad input': function() {
		var el1 = new Element('div').setSkewing(null);
		var el2 = new Element('div').setSkewing('evil');
		
		value_of(el1.getSkewing()).should_be([0, 0]);
		value_of(el2.getStyle('-webkit-transform')).should_not_match(/skew\(evil/i);
	}

});