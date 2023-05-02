const router = require('express').Router();
const { User } = require('../../models');

// POST new User
// PUT to update user info
// DELETE User

router.post('/', async (req, res) => {
    try {
        const newUserData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
        // if (!newUserData) {
        //     res.status(400).json(
        //         { message: 'You must enter a valid username and password.' });
        //     return;
        // }
        req.session.save(() => {
            req.session.logged_in = true,
            res.status(200).json(newUserData);
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.put()

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
        res.status(500).json(err);
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