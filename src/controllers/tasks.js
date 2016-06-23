/* eslint-disable new-cap, func-names, array-callback-return*/

import Category from '../models/category';
import Priority from '../models/priority';
import Task from '../models/task';
import ViewTask from '../models/view-task';
import express from 'express';

const router = module.exports = express.Router();

// task list
router.get('/', (req, res) => {
  Task.find((err, tasks) => {
    const priorities = Priority.find();
    const viewTasks = tasks.map(t => new ViewTask(t, priorities));
    res.render('tasks/index', { viewTasks });
  });
});

// new task
router.get('/new', (req, res) => {
  res.render('tasks/new', { categories: Category.find(), priorities: Priority.find() });
});

// create task
router.post('/', (req, res) => {
  const task = new Task(req.body);
  task.save(err => {
    if (!err) {
      res.redirect('/tasks');
    } else {
      res.redirect('/tasks');
    }
  });
});

// flips completion
router.post('/:id/complete', (req, res) => {
  const id = req.params.id;
  let completed1 = true;
  Task.find({ _id: id }, (err, task) => {
    const taskToBeUpdated = new Task(task[0]);
    if (taskToBeUpdated.isComplete) {
      completed1 = false;
    }
    Task.findOneAndUpdate({ _id: id }, { isComplete: completed1 }, () => {
      res.redirect('/tasks');
    });
  });
});

// delete task
router.post('/:id/delete', (req, res) => {
  Task.findByIdAndRemove({ _id: req.params.id }, (() => {
    res.redirect('/tasks');
  }));
});

// show update form
router.get('/:id/edit', (req, res) => {
  res.render('tasks/update');
});

// update
router.post('/:id', (req, res) => {
  res.redirect('/tasks');
});
