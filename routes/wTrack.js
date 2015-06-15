/**
 * Created by Roman on 04.05.2015.
 */

var express = require('express');
var router = express.Router();
var wTrackHandler = require('../handlers/wTrack');

module.exports = function (models) {
    var handler = new wTrackHandler(models);

    router.get('/totalCollectionLength', handler.totalCollectionLength);
    router.get('/:viewType', handler.getByViewType);
    router.post('/', handler.create);
    router.delete('/:id', handler.remove);
    router.patch('/:id', handler.putchModel);
   /* router.put('/:id', handler.updateModel);*/

    return router;
};