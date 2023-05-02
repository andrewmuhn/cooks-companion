const router = require('express').Router();
const { User } = require('../../models');

// POST new User
// PUT to update user info
// DELETE User

router.post('/login', async (req, res) => {
    try {
        const userInput = await User.findOne({ where: { username: req.body.username } });
        if (!userInput) {
            res.status(400).json(
                { message: 'Invalid username, please try again.' });
            return;
        }
        const validPassword = await userInput.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Invalid password, please try again.' });
            return;
        }
        req.session.save(() => {
            req.session.user_id = userInput.id;
            req.session.logged_in = true;
            res.json({ user: userInput, message: 'You are now logged in.' });
          });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {res.status(204).end();});
    } else {
        res.status(404).end();
    }
});

module.exports = router;