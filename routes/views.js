const { Router } = require('express')
const path = require('path');

const router = Router()

// router.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/login/index.html'));
// });

router.get('/control_pane', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/control_pane/index.html'));
});

module.exports = router