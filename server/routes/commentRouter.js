const express = require('express')
const router = express.Router()

router.get('/',getAllComments)
router.post('/',createNewComment)
router.put('/:id',updateComment)
router.delete('/:id',deleteComment)

export default router