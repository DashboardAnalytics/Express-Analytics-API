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
      res.send({
        status: 404,
        message: "No matches.",
        result: false,
        data: []
      });
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
      res.send({
        status: 404,
        message: "No matches.",
        result: false,
        data: []
      });
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
      res.send({
        status: 404,
        message: "No matches.",
        result: false,
        data: []
      });
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
      res.send({
        status: 404,
        message: "No matches.",
        result: false,
        data: []
      });
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
      res.send({
        status: 404,
        message: "No matches.",
        result: false,
        data: []
      });
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
      res.send({
        status: 404,
        message: "No matches.",
        result: false,
        data: []
      });
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
      res.send({
        status: 404,
        message: "No matches.",
        result: false,
        data: []
      });
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
      res.send({
        status: 404,
        message: "No matches.",
        result: false,
        data: []
      });
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
      res.send({
        status: 404,
        message: "No matches.",
        result: false,
        data: []
      });
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
      res.send({
        status: 404,
        message: "No matches.",
        result: false,
        data: []
      });
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

exports.getResultByDateAndTime = async (req, res) => {
  const { time_start, time_end, date_start, date_end } = req.body;

  pool.query('SELECT * FROM result WHERE frame_date BETWEEN $1 AND $2 AND frame_time BETWEEN $3 AND $4', [date_start, date_end, time_start, time_end], (error, results) => {
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

exports.getResultByDateAndTimeAndstoreShopping = async (req, res) => {
  const { time_start, time_end, date_start, date_end, store_name, shopping_name, store_id, shopping_id } = req.body;
  if(store_id && shopping_id){
    await pool.query('SELECT * FROM result WHERE id_shopping = $1 AND id_store = $2 AND frame_date BETWEEN $3 AND $4 AND frame_time BETWEEN $5 AND $6', [shopping_id, store_id, date_start, date_end, time_start, time_end], (error, results) => {
      if(error){
        res.send({
          status: 404,
          message: "No matches.",
          result: false,
          data: []
        });
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
  else if(shopping_name && store_name){
    var id_shopping = 0;
    var id_store = 0;
    await pool.query('SELECT st.id AS id_store, st.name AS store_name, sh.id AS id_shopping, sh.name AS shopping_name FROM store st, shopping sh WHERE st.name = $1 AND sh.name = $2', [store_name, shopping_name], async (error, results) => {
      if(error){
        res.send({
          status: 404,
          message: "No matches.",
          result: false,
          data: []
        });
      }
      else{
        id_shopping = results['rows'][0]['id_shopping'];
        id_store = results['rows'][0]['id_store'];
        await pool.query('SELECT * FROM result WHERE id_shopping = $1 AND id_store = $2 AND frame_date BETWEEN $3 AND $4 AND frame_time BETWEEN $5 AND $6', [id_shopping, id_store, date_start, date_end, time_start, time_end], async (err, ress) => {
          if(err){
            res.send({
              status: 404,
              message: "No matches.",
              result: false,
              data: []
            });
          }
          else{
            res.send({
              status: 200,
              message: "OK.",
              result: true,
              data: ress.rows
            })
          }
        });
      }
    });
  }
  else{
    res.send({
      status: 403,
      message: "One or more data parameters are empty.",
      result: false
    });
  }
}
