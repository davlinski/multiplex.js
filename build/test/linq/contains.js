(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../multiplex')) :
    typeof define === 'function' && define.amd ? define(['../../multiplex'], factory) :
    (factory(global.mx));
}(this, (function (mx) { 'use strict';

mx = 'default' in mx ? mx['default'] : mx;

var array = [1, 2, 3, 4, 5];
var collection = new mx.Collection(array);
var list = new mx.List(array);
var linkedList = new mx.LinkedList(array);
var hashSet = new mx.HashSet(array);
var stack = new mx.Stack(array);
var queue = new mx.Queue(array);
var set = new mx.Set(array);
var map = new mx.Map();
var dictionary = new mx.Dictionary();
var sortedList = new mx.SortedList();
var readOnlyCollection = list.asReadOnly();
var lookup = new mx.Lookup(array, function (t) {
    return t;
});

for (var i = 0; i < array.length; i++) {
    map.set(array[i], array[i]);
    dictionary.set(array[i], array[i]);
    sortedList.add(array[i], array[i]);
}

var qunit = typeof QUnit === 'undefined' ? require('qunitjs') : QUnit;
var qmodule = qunit.module;
var qtest = qunit.test;

qmodule('linq-contains');


qtest('basic "contains" test', function (assert) {
    assert.ok(mx(array).contains(1), 'Test an array contains a number');
    assert.ok(!mx(array).contains(0), 'Test an array does not containy a number');
});


qtest('collections "contains" method tests', function (assert) {
    assert.ok(mx(collection).contains(1), 'Test "contains" in a Collection');
    assert.ok(!mx(collection).contains(0), 'Test does not contain in a Collection');

    assert.ok(mx(list).contains(1), 'Test "contains" in a List');
    assert.ok(!mx(list).contains(0), 'Test does not contain in a List');

    assert.ok(mx(readOnlyCollection).contains(1), 'Test "contains" in a ReadOnlyCollection');
    assert.ok(!mx(readOnlyCollection).contains(0), 'Test does not contain in a ReadOnlyCollection');

    assert.ok(mx(linkedList).contains(1), 'Test "contains" in a LinkedList');
    assert.ok(!mx(linkedList).contains(0), 'Test does not contain in a LinkedList');

    assert.ok(mx(hashSet).contains(1), 'Test "contains" in a HashSet');
    assert.ok(!mx(hashSet).contains(0), 'Test does not contain in a HashSet');

    assert.ok(mx(stack).contains(1), 'Test "contains" in a Stack');
    assert.ok(!mx(stack).contains(0), 'Test does not contain in a Stack');

    assert.ok(mx(queue).contains(1), 'Test "contains" in a Queue');
    assert.ok(!mx(queue).contains(0), 'Test does not contain in a Queue');

    assert.ok(mx(set).contains(1), 'Test "contains" in a Set');
    assert.ok(!mx(set).contains(0), 'Test does not contain in a Set');

    var mapComparer = {
        hash: function (t) {
            return t[0];
        },
        equals: function (a, b) {
            return this.hash(a[0]) === this.hash(b[0]) && a[0] === b[0];
        }
    };

    var keyValuePairComparer = {
        hash: function (t) {
            return t.key;
        },
        equals: function (a, b) {
            return this.hash(a.key) === this.hash(b.key) && a.key === b.key;
        }
    };

    assert.ok(mx(map).contains([1, 1], mapComparer), 'Test "contains" in a Map');
    assert.ok(!mx(map).contains([0, 0], mapComparer), 'Test does not contain in a Map');

    assert.ok(mx(dictionary).contains({ key: 1, value: 1 }, keyValuePairComparer), 'Test "contains" in a Dictionary');
    assert.ok(!mx(dictionary).contains({ key: 0, value: 0 }, keyValuePairComparer), 'Test does not contain in a Dictionary');

    assert.ok(mx(lookup).contains(1), 'Test "contains" in a Lookup');
    assert.ok(!mx(lookup).contains(0), 'Test does not contain in a Lookup');

    assert.ok(mx(sortedList).contains({ key: 1, value: 1 }, keyValuePairComparer), 'Test "contains" in a SortedList');
    assert.ok(!mx(sortedList).contains({ key: 0, value: 0 }, keyValuePairComparer), 'Test does not contain in a SortedList');
});

})));

