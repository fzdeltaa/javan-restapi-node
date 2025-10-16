const express = require('express');
const z = require('zod');
const router = express.Router();

const User = require('../model/User');

const userSchema = z.object({
  name: z.string().min(4),
  email: z.email(),
  age: z.number().int().min(0),
});

router.get('/', (req, res) => {
  try {
    const users = User.get();

    res.status(200).json({
      status: "success",
      message: "Users retrieved successfully.",
      data: users
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: "500 Internal Server Error",
      message: error.message
    });
  }
});

router.post('/', (req, res) => {
  try {
    const parse = userSchema.parse(req.body);
    const newUser = User.create(parse);

    res.status(201).json({
      status: "success",
      message: "User added successfully.",
      data: newUser
    });
  } catch (error) {
    console.error("Error fetching users:", error);

    if (error instanceof z.ZodError) {
      const tree = z.treeifyError(error);
      const messages = Object.entries(tree.properties)
        .flatMap(([key, val]) => val.errors.map(msg => `${key}: ${msg}`));

      return res.status(400).json({
        status: "error",
        error: "400 Bad Request",
        message: messages.join("; ")
      });
    }

    res.status(500).json({
      status: "error",
      error: "500 Internal Server Error",
      message: error.message
    });
  }
});

router.get('/:id', (req, res) => {
  try {
    const id = z.coerce.number().int().positive().parse(req.params.id);
    const user = User.getById(id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        error: "404 Not Found",
        message: `User with ID ${id} not found.`
      });
    }

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const { errors } = z.treeifyError(error);
      return res.status(400).json({
        status: "error",
        error: "400 Bad Request",
        message: errors[0]
      });
    }

    res.status(500).json({
      status: "error",
      error: "500 Internal Server Error",
      message: error.message
    });
  }
});

module.exports = router;