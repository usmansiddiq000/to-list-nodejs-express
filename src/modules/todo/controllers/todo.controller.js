'use strict';

const mongoose = require('mongoose');
const Todo = mongoose.model('Todo');
const _ = require('lodash');
const {
  handle404,
  handle200,
  handle500,
} = require('../../core/utils/responses');

const whitelistedFields = ['name', 'description'];

/**
 * @swagger
 *  /api/todo:
 *    post:
 *      tags:
 *        - Todo
 *      security:
 *        []
 *      summary: create todo.
 *      description: create todo.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: name of todo
 *                  example: abc
 *                description:
 *                  type: string
 *                  description: description of todo
 *                  example: this is todo
 *      responses:
 *        200:
 *          description: User signin.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                    description: id
 *                    example: 637dbd600eaacca6b207e7d3
 *                  name:
 *                    type: string
 *                    description: name of todo
 *                    example: abc
 *                  description:
 *                    type: string
 *                    description:  description of todo
 *                    example: this is todo
 */

exports.create = async (req, res) => {
  try {
    const todo = new Todo({...req.body, isDeleted: false});
    await todo.save();
    handle200(res, {todo});
  } catch (e) {
    return handle500(res, e.message);
  }
};

/**
 * @swagger
 *  /api/todo:
 *    get:
 *      tags:
 *        - Todo
 *      security:
 *        []
 *      summary: Get all  todo.
 *      description: Get all todo.
 *      responses:
 *        200:
 *          description: User signin.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                properties:
 *                  id:
 *                    type: string
 *                    description: id
 *                    example: 637dbd600eaacca6b207e7d3
 *                  name:
 *                    type: string
 *                    description: name of todo
 *                    example: abc
 *                  description:
 *                    type: string
 *                    description:  description of todo
 *                    example: this is todo
 */

exports.getAll = async (req, res) => {
  try {
    const todos = await Todo.find({isDeleted: false});

    handle200(res, {todos});
  } catch (e) {
    return handle500(res, e.message);
  }
};


/**
 * @swagger
 *  /api/todo/{todoId}:
 *    put:
 *      tags:
 *        - Todo
 *      security:
 *        []
 *      summary: update todo.
 *      description: update todo.
 *      parameters:
 *        - in: path
 *          name: todoId
 *          schema:
 *            type: string
 *            required: true
 *            description: The todo id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: name of todo
 *                  example: abc
 *                description:
 *                  type: string
 *                  description: description of todo
 *                  example: this is todo
 *      responses:
 *        200:
 *          description: User signin.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                    description: id
 *                    example: 637dbd600eaacca6b207e7d3
 *                  name:
 *                    type: string
 *                    description: name of todo
 *                    example: abc
 *                  description:
 *                    type: string
 *                    description:  description of todo
 *                    example: this is todo
 */

exports.update = async (req, res) => {
  try {
    let todo = req.todo;
    todo = _.extend(todo, _.pick(req.body, whitelistedFields));
    await todo.save();

    handle200(res, {todo});
  } catch (e) {
    return handle500(res, e.message);
  }
};


/**
 * @swagger
 *  /api/todo/{todoId}:
 *    get:
 *      tags:
 *        - Todo
 *      security:
 *        []
 *      summary: Get todo by id.
 *      description: Get todo by id.
 *      parameters:
 *        - in: path
 *          name: todoId
 *          schema:
 *            type: string
 *            required: true
 *            description: The todo id
 *      responses:
 *        200:
 *          description: User signin.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                    description: id
 *                    example: 637dbd600eaacca6b207e7d3
 *                  name:
 *                    type: string
 *                    description: name of todo
 *                    example: abc
 *                  description:
 *                    type: string
 *                    description:  description of todo
 *                    example: this is todo
 */


exports.getById = async (req, res) => {
  try {
    const todo = req.todo;

    handle200(res, {todo});
  } catch (e) {
    return handle500(res, e.message);
  }
};

/**
 * @swagger
 *  /api/todo/{todoId}:
 *    delete:
 *      tags:
 *        - Todo
 *      security:
 *        []
 *      summary: Delete todo by id.
 *      description: Delete todo by id.
 *      parameters:
 *        - in: path
 *          name: todoId
 *          schema:
 *            type: string
 *            required: true
 *            description: The todo id
 *      responses:
 *        200:
 *          description: User signin.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: string
 *                    description: sucess true
 *                    example: true
 */


exports.removeById = async (req, res) => {
  try {
    const todo = req.todo;
    todo.isDeleted = true;

    await todo.save();
    handle200(res, {success: true});
  } catch (e) {
    return handle500(res, e.message);
  }
};


/**
 * Todo middlewarre
 */
exports.todoById = async (req, res, next, id) => {
  try {
    const todo = await Todo.findOne({
      // eslint-disable-next-line new-cap
      _id: mongoose.Types.ObjectId(id),
      isDeleted: false,
    });
    if (!todo) return handle404(res);
    req.todo = todo;
    next();
  } catch (e) {
    return handle500(res, e.message);
  }
};
