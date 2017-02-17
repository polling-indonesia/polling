var express = require('express');
var router = express.Router();
var poll = require('../controllers/polls.controller.js')

router.post('/:username',poll.create)
router.get('/',poll.showAll)
router.get('/:id',poll.show)
router.put('/:id/add',poll.addChoice)
router.put('/:id/vote/:choiceid/:username',poll.voteChoice)
router.delete('/:id',poll.delete)
router.put('/:id/open',poll.open)
router.put('/:id/close',poll.close)
module.exports = router;
