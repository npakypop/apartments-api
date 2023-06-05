const express = require("express");

const controllers = require("../../controllers/apartmentsControllers");

const { validateBody, isValidId } = require("../../middlewars");

const { joiSchemas } = require("../../models/apartment");

const router = express.Router();
// * тут у маршрутов ниже не указан полный путь /api/apartments так как в app.js уже указали это в роутинге и если запрос совпал с тем что укказали то тогда все остальное ищет здесь

router.get("/", controllers.getAllApartments);

router.get("/:id", isValidId, controllers.getApartmentById);

router.post("/", validateBody(joiSchemas.addSchema), controllers.addApartment);

router.put(
  "/:id",
  isValidId,
  validateBody(joiSchemas.addSchema),
  controllers.updateApartment
);

router.delete("/:id", isValidId, controllers.deleteApartment);

module.exports = router;
