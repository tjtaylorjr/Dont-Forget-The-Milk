// TESTING PURPOSES ONLY

const express = require('express')
const router = express.Router()
const { User, List, Task } = require("../../db/models");
const { asyncHandler } = require('../utils');
const { Op } = require("sequelize");

//Display all lists for a user
router.get('/', asyncHandler(async (req, res) => {
  const allLists = await List.findAll({
    include: Task

  });


  res.json({ allLists });

}));

// Display all tasks for a specific list.
// /api/lists/id/tasks

router.get('/:id/tasks', asyncHandler(async (req, res) => {
  const listId = parseInt(req.params.id, 10)
  const tasks = await Task.findAll({

    where: { listId }

  })
  res.json({tasks})

}))

// /api/lists/id displays a specific lists information
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  const listId = req.params.id
  const list = await List.findByPk(listId, {
    include: Task

  });


  res.json({ list });

}));

module.exports = router;


// const express = require('express');
// const {check} = require('express-validator');
// const {handleValidationErrors, asyncHandler} = require('../../utils');
// // const {requireAuth} = require('../../auth');
// const router = express.Router();
// const db = require('../../db/models');

// const { User, List, Task} = db;

// // { model: User, as: 'user', attributes: ['username'] },

// // router.use(requireAuth);

// //Display all lists for a user
// router.get('/', asyncHandler(async (req, res) => {
//   const allLists = await List.findAll({
//     include: [{model: Task, as: "task"}]

//   });
//   res.json({ allLists });

// }));

// // /api/lists/userId
// // returns all lists for a specifc user

// router.get('/:id', asyncHandler(async(req,res) => {
//   const userId = parseInt(req.params.id, 10);
//   const lists = await List.findAll({
//     where: {
//       userId
//     },
//     include: [{ model: Task,as:"task" } ],
//     order: [['createdAt', 'DESC']],
//   });
//   res.json({lists});
// }));

// // router.get('/:id', asyncHandler(async(req,res,next) => {
// //   const list = await List.findOne({
// //     where: {
// //       id: req.params.id
// //     }, include: [{model: Task, as: "task"}]
// //   });
// //   if(list) {
// //     res.json({list});
// //   } else {
// //     next(listNotFoundError(req.params.id));
// //   }
// // }));

// const validateList = [
//   check('listName')
//     .exists({checkFalsy: true})
//     .withMessage("List name can't be undefined."),
//   check('listName')
//     .isLength({max: 50})
//     .withMessage("List can't be longet than 50 characters."),
//   handleValidationErrors,
// ];


// const listNotFoundError = (id) => {
//   const err = Error('List not found');
//   err.errors = [`List with the id of ${id} could not be found`];
//   err.title = 'List not found';
//   err.status = 404;
//   return err;
// };


// router.post('/',validateList, asyncHandler(async(req,res,next) => {
//   const {listName, userId} = req.body;
//   const list = await List.create({listName,userId});
//   res.json({list});
// }));

// router.put('/:id', validateList, asyncHandler(async(req,res,next)=> {
//   const list = await List.findOne({
//     where: {
//       id: req.params.id
//     }
//   });
//   if(req.params.id !== list.userId) {
//     const err = new Error('Unauthorized');
//     err.status = 401;
//     err.message = 'You are not authorized to edit this List';
//     err.title = 'Unauthorized';
//     throw err;
//   }
//   if(list) {
//     await list.update({listName: req.body.listName});
//     res.json({list});
//   } else {
//     next(listNotFoundError(req.params.id));
//   }
// }));

// router.delete('/:id', asyncHandler(async(req,res,next) => {
//   const list = await List.findOne({
//     where: {
//       id: req.params.id
//     }
//   });
//   if(req.params.id !== list.userId) {
//     const err = new Error('Unauthorized');
//     err.status = 401;
//     err.message = 'You are not authorized to edit this List';
//     err.title = 'Unauthorized';
//     throw err;
//   }

//   if(list) {
//     await list.destroy();
//     res.json({message:`Deleted list with id of ${req.params.id}!`});
//   } else {
//     next(listNotFoundError(req.params.id));
//   }
// }));

// module.exports = router;
