const express = require('express');
const router = express.Router();

router.get('/', (res) => {
	return res.status(200).json({
		name: 'SkinSwap API',
		author: {
			discord: 'sampli#0001'
		}
	});
});

module.exports = router;