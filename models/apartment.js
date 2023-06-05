const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const apartmentSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: [99, "Name has to containe less then 100 characters"],
      require: [true, "Type name for apartments"],
    },
    description: {
      type: String,
      maxlength: [99, "Description has to containe less then 100 characters"],
      require: [true, "Type description for apartments"],
    },
    price: {
      type: Number,
      min: [1, "Price has to be greater then 0"],
      require: [true, "Set price for apartments"],
    },
    rooms: {
      type: Number,
      min: [1, "Number of rooms has to be greater then 0"],
      require: [true, "Set price for apartments"],
    },
  },
  { versionKey: false, timestamp: true }
);

apartmentSchema.post("save", handleMongooseError); //* в случае если при добавлении возникнет ошибка, то обработать ее через мидлвар, так как монгус не возвращает статус ошибки

const addSchema = Joi.object({
  rooms: Joi.number().greater(0).required(), //! проблема с автоматической конвертацией строки к числу
  name: Joi.string().max(98).required(),
  price: Joi.number().greater(0).required(),
  description: Joi.string().max(98).required(),
});

const joiSchemas = { addSchema };

const Apartment = model("apartment", apartmentSchema);

module.exports = { Apartment, joiSchemas };
