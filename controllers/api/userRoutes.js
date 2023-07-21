const router = require('express').Router();
const { User } = require('../../models');

// CREATE A NEW USER
router.post('/', async (req, res) => {
  try {
    const newUserData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    if (!newUserData) {
        res.status(400).json(
            { message: 'You must enter a valid username and password.' });
        return;
    }
    const dataJustCreated = await User.findOne({
      where: { email: newUserData.email },
    });
    console.log(dataJustCreated);
    req.session.save(() => {
      req.session.user_id = dataJustCreated.id;
      req.session.logged_in = true;
      res.status(200).json(newUserData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE USER DATA
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.update({
      where: { id: req.params.id },
    });
    return res.json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// INITIAL LOGIN
router.post('/login', async (req, res) => {
  try {
    const userInput = await User.findOne({
      where: { email: req.body.email },
    });
    if (!userInput) {
      res
        .status(400)
        .json({ message: 'Invalid username, please try again.' });
      return;
    }
    console.log('50');
    console.log(req.body.password);
    const validPassword = await userInput.checkPassword(
      req.body.password
    );
    console.log(validPassword);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Invalid password, please try again.' });
      return;
    }
    console.log('59');
    req.session.save(() => {
      req.session.user_id = userInput.id;
      req.session.logged_in = true;
      res.json({
        user: userInput,
        message: 'You are now logged in!',
      });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGOUT
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const userData = await User.destroy({
      where: { id: req.params.id },
    });
    if (!userData) {
      res
        .status(404)
        .json({ message: 'No user was found with that ID' });
      return;
    }
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
