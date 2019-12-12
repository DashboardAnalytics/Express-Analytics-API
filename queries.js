const Pool = require('pg').Pool
const pool = new Pool({
  user: 'doadmin',
  host: 'pingesoresults-do-user-6864511-0.db.ondigitalocean.com',
  database: 'analyticsDatabase',
  password: 'qx2a5a5k2rbry8or',
  port: 25060,
  ssl: true,
});


exports.createShopping = async (req, res) => {
  const { name } = req.body

  pool.query('INSERT INTO shopping (name) VALUES ($1)', [name], (error, results) => {
    if(error){
      console.log(error);
    }
    else{
      res.send({
        status: 201,
        message: `Added ${name} correctly.`,
        result: true
      });
    }
  });
}

exports.getShoppingById = async (req, res) => {
  const { id } = req.body;

  id = parseInt(id);

  pool.query('SELECT * FROM shopping WHERE id = $1', [id], (error, results) => {
    if(error){
      console.log(error);
    }
    else{
      if(results['rows'].length > 0){
        res.send({
          status: 200,
          message: "OK.",
          result: true,
          data: results.rows
        });
      }
      else{
        res.send({
          status: 404,
          message: "No matches.",
          result: false,
          data: []
        });
      }
    }
  });
}

exports.getShoppingByName = async (req, res) => {
  const { name } = req.body;

  pool.query('SELECT * FROM shopping WHERE name = $1', [name], (error, results) => {
    if(error){
      console.log(error);
    }
    else{
      if(results['rows'].length > 0){
        res.send({
          status: 200,
          message: "OK.",
          result: true,
          data: results.rows
        });
      }
      else{
        res.send({
          status: 404,
          message: "No matches.",
          result: false,
          data: []
        });
      }
    }
  });
}

exports.getAllShoppings = async (req, res) => {

  pool.query('SELECT * FROM shopping ORDER BY id ASC', (error, results) => {
    if (error) {
      console.log(error);
    }
    else{
      res.send({
        status: 200,
        message: "OK.",
        result: true,
        data: results.rows
      });
    }
  });
}

exports.createStore = (req, res) => {
  const { name } = req.body

  pool.query('INSERT INTO store (name) VALUES ($1)', [name], (error, results) => {
    if(error){
      console.log(error);
    }
    else{
      res.send({
        status: 201,
        message: `Added ${name} correctly.`,
        result: true
      });
    }
  });
}

exports.getStoreById = async (req, res) => {
  const { id } = req.body;

  id = parseInt(id);

  pool.query('SELECT * FROM store WHERE id = $1', [id], (error, results) => {
    if(error){
      console.log(error);
    }
    else{
      res.send({
        status: 200,
        message: "OK.",
        result: true,
        data: results.rows
      })
    }
  });
}

exports.getStoreByName = async (req, res) => {
  const { name } = req.body;

  pool.query('SELECT * FROM store WHERE name = $1', [name], (error, results) => {
    if(error){
      console.log(error);
    }
    else{
      if(results['rows'].length > 0){
        res.send({
          status: 200,
          message: "OK.",
          result: true,
          data: results.rows
        });
      }
      else{
        res.send({
          status: 404,
          message: "No matches.",
          result: false,
          data: []
        });
      }
    }
  });
}

exports.getAllStores = async (req, res) => {

  pool.query('SELECT * FROM store ORDER BY id ASC', (error, results) => {
    if (error) {
      console.log(error);
    }
    else{
      res.send({
        status: 200,
        message: "OK.",
        result: true,
        data: results.rows
      });
    }
  });
}


exports.getStoreAndShoppingByName = async (req, res) => {
  const { shopping_name, store_name } = req.body;

  pool.query('SELECT st.id AS id_store, st.name AS store_name, sh.id AS id_shopping, sh.name AS shopping_name FROM store st, shopping sh WHERE st.name = $1 AND sh.name = $2', [store_name, shopping_name], (error, results) => {
    if(error){
      console.log(error);
    }
    else{
      if(results['rows'].length > 0){
        res.send({
          status: 200,
          message: "OK.",
          result: true,
          data: results.rows
        });
      }
      else{
        res.send({
          status: 404,
          message: "No matches.",
          result: false,
          data: []
        });
      }
    }
  });
}


exports.createResult = async (req, res) => {
  const { n_people, frame, frame_time, frame_date, shopping_name, store_name} = req.body;
  var id_shopping = 0;
  var id_store = 0;
  await pool.query('SELECT st.id AS id_store, st.name AS store_name, sh.id AS id_shopping, sh.name AS shopping_name FROM store st, shopping sh WHERE st.name = $1 AND sh.name = $2', [store_name, shopping_name], async (error, results) => {
    if(error){
      console.log(error);
    }
    else{
      id_shopping = results['rows'][0]['id_shopping'];
      id_store = results['rows'][0]['id_store'];
      await pool.query('INSERT INTO result (n_people, frame, frame_time, frame_date, id_shopping, id_store) VALUES ($1, $2, $3, $4, $5, $6)', [n_people, frame, frame_time, frame_date, id_shopping, id_store], async (err, ress) => {
        if(err){
          res.send({
            status: 400,
            message: "Error found.",
            result: false,
            err_message: err
          });
        }
        else{
          res.send({
            status: 201,
            message: "OK.",
            result: true
          })
        }
      });
    }
  });
}
