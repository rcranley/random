Ext.define('rcranley.LockableCarousel', {
    extend: 'Ext.Carousel',
    id: 'locakablecarousel',
    initialize: function () {
        this.onDragOrig = this.onDrag;
        this.onDrag = function (e) { if(!this.locked){this.onDragOrig(e);} }
        this.onDragStartOrig = this.onDragStart;
        this.onDragStart = function (e) { if(!this.locked){this.onDragStartOrig(e);} }
        this.onDragEndOrig = this.onDragEnd;
        this.onDragEnd = function (e) { if(!this.locked){this.onDragEndOrig(e);} }
        this.swipeOrig = this.swipe;
        this.swipe = function (e) { if(!this.locked){this.swipeOrig(e);} }
    },
    locked: true,
    lock: function () { this.locked = true; },
    unlock: function () { this.locked = false; }
});