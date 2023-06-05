const { Apartment } = require("../models/apartment"); // * от сюда достаем модель
const { HttpError, ctrlWrapper } = require("../helpers");

const getAllApartments = async (req, res) => {
  const { rooms, price } = req.query;
  const query = rooms ? { rooms: rooms } : {}; //* фильтрация по колличеству комнат
  const result = await Apartment.find(query);

  if (price === "asc") {
    //* сортировка по цене
    result.sort((a, b) => a.price - b.price);
  } else if (price === "desc") {
    result.sort((a, b) => b.price - a.price);
  }
  res.status(200).json(result);
};

const getApartmentById = async (req, res) => {
  const { id } = req.params;
  const result = await Apartment.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const addApartment = async (req, res) => {
  const result = await Apartment.create(req.body);
  res.status(201).json(result);
};

const updateApartment = async (req, res) => {
  const result = await Apartment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteApartment = async (req, res) => {
  const { id } = req.params;
  const result = await Apartment.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    message: "Apartment deleted",
  });
};

module.exports = {
  getAllApartments: ctrlWrapper(getAllApartments), // * оборачиваем каждый контроллер в декоратор что бы не повторять везде конструкцию try/catch
  getApartmentById: ctrlWrapper(getApartmentById),
  addApartment: ctrlWrapper(addApartment),
  updateApartment: ctrlWrapper(updateApartment),
  deleteApartment: ctrlWrapper(deleteApartment),
};
