var test = require('tape')
	, openapi2schema = require('../lib/openapi2schema')
	, helpers = require('./helpers')

;

test('converting date to datetime', function(assert) {
	var spec
		, expected
	;
	
	assert.plan(4);

	expected = {
		'/test': {
			get: {
				responses: {
					200: {
						$schema: 'http://json-schema.org/draft-04/schema#',
						type: 'object',
						properties: {
							testprop: {
								type: 'string',
								format: 'date-time'
							}
						}
					}
				}
			}
		}	
	};

	spec = helpers.specPath('date-spec.yaml');

	openapi2schema(spec, {dateToDateTime: true}, function(err, result) {
		assert.equal(err, null, 'no error');
		assert.deepEqual(result, expected, 'structure ok');
	});

	var result = openapi2schema(spec, {dateToDateTime: true, async: false});
	assert.equal(result instanceof Error, false, 'no error (sync)');
	assert.deepEqual(result, expected, 'structure ok (sync)');
});

test('do not convert date to datetime by default', function(assert) {
	var spec
		, expected
	;
	
	assert.plan(4);

	expected = {
		'/test': {
			get: {
				responses: {
					200: {
						$schema: 'http://json-schema.org/draft-04/schema#',
						type: 'object',
						properties: {
							testprop: {
								type: 'string',
								format: 'date'
							}
						}
					}
				}
			}
		}	
	};

	spec = helpers.specPath('date-spec.yaml');

	openapi2schema(spec, function(err, result) {
		assert.equal(err, null, 'no error');
		assert.deepEqual(result, expected, 'structure ok');
	});

	var result = openapi2schema(spec, { async: false });
	assert.equal(result instanceof Error, false, 'no error (sync)');
	assert.deepEqual(result, expected, 'structure ok (sync)');
});
