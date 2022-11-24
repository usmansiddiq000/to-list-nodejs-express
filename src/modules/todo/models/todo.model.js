/* eslint-disable no-invalid-this */
'use strict';

/**
 * Module dependencies
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validateLocalStrategyProperty = (property) => {
  return property.length;
};


/**
 * Todo Schema
 */
const TodoSchema = new Schema(
    {
      name: {
        type: String,
        trim: true,
        required: true,
        validate: [
          validateLocalStrategyProperty,
          'Please fill in todo name',
        ],
      },
      description: {
        type: String,
        trim: true,
        required: true,
        validate: [
          validateLocalStrategyProperty,
          'Please fill in todo description',
        ],
      },
      isDeleted: {
        type: Boolean,
        defaults: false,
      },
    },
    {timestamps: true},
);


TodoSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    name: this.name,
    description: this.description,
    isDeleted: this.isDeleted,
  };
};
mongoose.model('Todo', TodoSchema);
