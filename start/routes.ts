import Route from '@ioc:Adonis/Core/Route'


Route.group(() => {

  Route.post('/bills', 'BillController.create');
  Route.get('/bills', 'BillController.index');
  Route.get('/bills/:id', 'BillController.show');
  Route.put('/bills/:id', 'BillController.update');
  Route.delete('/bills/:id', 'BillController.delete');

  Route.post('/bill-items', 'ProductDetailsController.create');
  Route.get('/bill-items', 'ProductDetailsController.index');
  Route.get('/bill-items/:id', 'ProductDetailsController.show');
  Route.put('/bill-items/:id', 'ProductDetailsController.update');
  Route.delete('/bill-items/:id', 'ProductDetailsController.delete');

  Route.post('/stocks', 'StockController.create');
  Route.get('/stocks', 'StockController.index');
  Route.get('/stocks/:id', 'StockController.show');
  Route.put('/stocks/:id', 'StockController.update');
  Route.delete('/stocks/:id', 'StockController.delete');

  Route.post('/users', 'UserController.create');
  Route.get('/users', 'UserController.index');
  Route.get('/users/:id', 'UserController.show');
  Route.put('/users/:id', 'UserController.update');
  Route.delete('/users/:id', 'UserController.delete');

}).prefix('/api'); 



Route.get('/', async () => {
  return { hello: 'world' }
})
