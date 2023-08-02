import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {

  

  Route.get('/vehicle-product-details', 'VehicleProductDetailsController.index');
  Route.get('/vehicle-number-list', 'VehicleProductDetailsController.getAllVehicleNumberList');
  Route.post('/vehicle-product-details', 'VehicleProductDetailsController.create');
  Route.get('/vehicle-product-details/:id', 'VehicleProductDetailsController.show');
  Route.put('/vehicle-product-details/:id', 'VehicleProductDetailsController.update');
  Route.delete('/vehicle-product-details/:id', 'VehicleProductDetailsController.delete');

  Route.put("/vehicle-details/add/:id", "VehicleDetailsController.addItem");
  Route.put("/vehicle-details/reduce/:id","VehicleDetailsController.reduceItem");
  Route.get("/vehicle-details", "VehicleDetailsController.index");
  Route.post("/vehicle-details", "VehicleDetailsController.create");
  Route.get("/vehicle-details/:id", "VehicleDetailsController.show");
  Route.put("/vehicle-details/:id", "VehicleDetailsController.update");
  Route.delete("/vehicle-details/:id", "VehicleDetailsController.delete");

  Route.get("/stock-out", "StockOutDetailsController.index");
  Route.post("/stock-out", "StockOutDetailsController.create");
  Route.get("/stock-out/:id", "StockOutDetailsController.show");
  Route.put("/stock-out/add/:id", "StockOutDetailsController.addQuantity");
  Route.put(
    "/stock-out/reduce/:id",
    "StockOutDetailsController.reduceQuantity"
  );
  Route.delete("/stock-out/:id", "StockOutDetailsController.delete");

  Route.post("/bills", "BillController.create");
  Route.get("/bills", "BillController.index");
  Route.get("/bills/:id", "BillController.show");
  Route.put("/bills/:id", "BillController.update");
  Route.delete("/bills/:id", "BillController.delete");

  Route.post("/bill-items", "ProductDetailsController.create");
  Route.get("/bill-items", "ProductDetailsController.index");
  Route.get(
    "/bill-invoice-id-list",
    "ProductDetailsController.getAllInvoiceId"
  );
  Route.get("/added-item-quantity/:id", "ProductDetailsController.getProductQuantity");
  Route.get("/bill-items/:id", "ProductDetailsController.show");
  Route.put("/bill-items/:id", "ProductDetailsController.update");
  Route.delete("/bill-items/:id", "ProductDetailsController.delete");

  Route.post("/stocks", "StockController.create");
  Route.get("/stocks/product-names", "StockController.getProductNameList");
  Route.get("/stocks", "StockController.index");
  Route.get("/stocks/quntity-details/:id", "StockController.getQuanatity");
  Route.get("/stocks/:id", "StockController.show");
  Route.put("/stocks/:id", "StockController.update");
  Route.delete("/stocks/:id", "StockController.delete");

  Route.post("/users", "UserController.create");
  Route.get("/users", "UserController.index");
  Route.get("/users/:id", "UserController.show");
  Route.put("/users/:id", "UserController.update");
  Route.delete("/users/:id", "UserController.delete");
}).prefix("/api");

Route.get("/", async () => {
  return { hello: "world" };
});
