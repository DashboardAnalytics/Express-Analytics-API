const Pool = require('pg').Pool
const moment = require('moment')
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
  const { id } = req.query;

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
  const { name } = req.query;

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
  const { id } = req.query;

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
  const { name } = req.query;

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

exports.getAllStoresByShopping = async (req, res) => {
  const { shopping_name, shopping_id } = req.query;
  if(shopping_name){
    pool.query('SELECT st.id, st.name FROM store st, shopping sh, shopping_store ss WHERE sh.name = $1 AND sh.id = ss.id_shopping AND st.id = ss.id_store', [shopping_name], (error, results) => {
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
  else if(shopping_id){
    pool.query('SELECT st.id, st.name FROM store st, shopping sh, shopping_store ss WHERE sh.id = $1 AND sh.id = ss.id_shopping AND st.id = ss.id_store', [shopping_id], (error, results) => {
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
  else{
    res.send({
      status: 403,
      message: "No shopping id / name given.",
      result: false,
      data: []
    });
  }
}


exports.getStoreAndShoppingByName = async (req, res) => {
  const { shopping_name, store_name } = req.query;

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
  const { time_start, time_end, date_start, date_end } = req.query;

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
  const { time_start, time_end, date_start, date_end, store_name, shopping_name, store_id, shopping_id } = req.query;
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

exports.getResultsByOneMonthAndByStoreAndShopping = async (req, res) => {
  let dateNow = moment().subtract(1, 'days').format('YYYY-DD-MM');
  let dateOneMonthAgo = moment().subtract(1, 'month').format('YYYY-DD-MM');

  const { store_id, store_name, shopping_id, shopping_name } = req.query;

  if(store_id && shopping_id){
    pool.query('SELECT to_char(date, 'DD-MM-YYYY') AS date, CAST(avg(people) AS INTEGER) as visitors FROM reduced_result WHERE date BETWEEN $1 AND $2 AND id_store = $3 AND id_shopping = $4 GROUP BY date ORDER BY date limit 30', [dateOneMonthAgo, dateNow, store_id, shopping_id], (error, results) => {
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
  else if(store_name && shopping_name){
    pool.query('SELECT to_char(rr.date, 'DD-MM-YYYY') AS date, CAST(avg(rr.people) AS INTEGER) as visitors FROM reduced_result rr, store st, shopping sh WHERE rr.date BETWEEN $1 AND $2 AND rr.id_store = st.id  AND rr.id_shopping = sh.id AND st.name = $3 AND sh.name = $4 GROUP BY date ORDER BY date limit 30', [dateOneMonthAgo, dateNow, store_name, shopping_name], (error, results) => {
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
  else{
    res.send({
      status: 403,
      message: "No store id / name given.",
      result: false,
      data: []
    });
  }
}

exports.getResultsByTwoWeekAndByStoreAndShopping = async (req, res) => {
  let dateNow = moment().subtract(1, 'days').format('YYYY-DD-MM');
  let dateOneWeekAgo = moment().subtract(15, 'days').format('YYYY-DD-MM');

  const { store_id, store_name, shopping_id, shopping_name } = req.query;

  if(store_id && shopping_id){
    pool.query('SELECT to_char(date, 'DD-MM-YYYY') AS date, CAST(avg(people) AS INTEGER) AS visitors FROM reduced_result WHERE date BETWEEN $1 AND $2 AND id_store = $3 AND id_shopping = $4 GROUP BY date ORDER BY date limit 14', [dateOneWeekAgo, dateNow, store_id, shopping_id], (error, results) => {
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
  else if(store_name && shopping_name){
    pool.query('SELECT to_char(rr.date, 'DD-MM-YYYY') AS date, CAST(avg(rr.people) AS INTEGER) AS visitors FROM reduced_result rr, store st, shopping sh WHERE rr.date BETWEEN $1 AND $2 AND rr.id_store = st.id  AND rr.id_shopping = sh.id AND st.name = $3 AND sh.name = $4 GROUP BY date ORDER BY date limit 14', [dateOneWeekAgo, dateNow, store_name, shopping_name], (error, results) => {
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
  else{
    res.send({
      status: 403,
      message: "No store id / name given.",
      result: false,
      data: []
    });
  }
}

exports.getResultsByOneWeekAndByStoreAndShopping = async (req, res) => {
  let dateNow = moment().subtract(1, 'days').format('YYYY-DD-MM');
  let dateOneWeekAgo = moment().subtract(8, 'days').format('YYYY-DD-MM');

  const { store_id, store_name, shopping_id, shopping_name } = req.query;

  if(store_id && shopping_id){
    pool.query('SELECT to_char(date, 'DD-MM-YYYY') AS date, CAST(avg(people) AS INTEGER) AS visitors FROM reduced_result WHERE date BETWEEN $1 AND $2 AND id_store = $3 AND id_shopping = $4 GROUP BY date ORDER BY date limit 7', [dateOneWeekAgo, dateNow, store_id, shopping_id], (error, results) => {
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
  else if(store_name && shopping_name){
    pool.query('SELECT to_char(rr.date, 'DD-MM-YYYY') AS date, CAST(avg(rr.people) AS INTEGER) AS visitors FROM reduced_result rr, store st, shopping sh WHERE rr.date BETWEEN $1 AND $2 AND rr.id_store = st.id  AND rr.id_shopping = sh.id AND st.name = $3 AND sh.name = $4 GROUP BY date ORDER BY date limit 7', [dateOneWeekAgo, dateNow, store_name, shopping_name], (error, results) => {
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
  else{
    res.send({
      status: 403,
      message: "No store id / name given.",
      result: false,
      data: []
    });
  }
}

exports.getResultsByOneDayAndByStoreAndShopping = async (req, res) => {
  let dateNow = moment().format('YYYY-DD-MM');
  let dateOneDayAgo = moment().subtract(1, 'days').format('YYYY-DD-MM');

  const { store_id, store_name, shopping_id, shopping_name } = req.query;

  if(store_id && shopping_id){
    pool.query('select date_trunc('hour', time) AS date, CAST(avg(people) AS INTEGER) AS visitors from reduced_result WHERE date = $1 AND id_store = $2 AND id_shopping = $3 group by 1 ORDER BY date', [dateOneDayAgo, store_id, shopping_id], (error, results) => {
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
  else if(store_name && shopping_name){
    pool.query('select date_trunc('hour', rr.time) AS date, CAST(avg(rr.people) AS INTEGER) AS visitors from reduced_result rr, store st, shopping sh WHERE rr.date = $1 AND rr.id_store = st.id AND rr.id_shopping = sh.id AND st.name = $2 AND sh.name = $3 group by 1 ORDER BY date', [dateOneDayAgo, store_name, shopping_name], (error, results) => {
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
  else{
    res.send({
      status: 403,
      message: "No store id / name given.",
      result: false,
      data: []
    });
  }
}

exports.getResultsByOneHourAndByStoreAndShopping = async (req, res) => {
  let dateNow = moment().subtract(1, 'days').format('YYYY-DD-MM');
  let hourNow = moment().format('HH:mm');
  let dateOneHourAgo = moment().subtract(1, 'hours').format('HH:mm');

  const { store_id, store_name, shopping_id, shopping_name } = req.query;

  if(store_id && shopping_id){
    pool.query('select date_trunc('minute', time) AS date, CAST(avg(people) AS INTEGER) as visitors from reduced_result WHERE time between $1 AND $2 AND date = $3 AND id_store = $4 AND id_shopping = $5 group by 1 ORDER BY date', [dateOneHourAgo, hourNow, dateNow, store_id, shopping_id], (error, results) => {
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
  else if(store_name && shopping_name){
    pool.query('select date_trunc('minute', rr.time) AS date, CAST(avg(rr.people) AS INTEGER) as visitors from reduced_result rr, store st, shopping sh WHERE rr.time between $1 AND $2 AND rr.date = $3 AND rr.id_store = st.id AND rr.id_shopping = sh.id AND st.name = $4 AND sh.name = $5 group by 1 ORDER BY date', [dateOneHourAgo, hourNow, dateNow, store_name, shopping_name], (error, results) => {
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
  else{
    res.send({
      status: 403,
      message: "No store id / name given.",
      result: false,
      data: []
    });
  }
}

exports.getTopByShopping = async (req, res) => {
  const { shopping_id, shopping_name, top_limit } = req.query;
  if ( shopping_id && top_limit ){
    pool.query('SELECT st.name as store, SUM(rr.people) as total FROM reduced_result rr, store st WHERE rr.id_shopping = $1 AND rr.id_store = st.id GROUP BY st.name order by total DESC LIMIT $2', [shopping_id, top_limit], (error, results) => {
      if(error){
        res.send({
          status: 400,
          message: "ERROR.",
          result: false,
          data: [],
          error: error
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
  else if ( shopping_name && top_limit ){
    pool.query('SELECT st.name as store, SUM(rr.people) as total FROM reduced_result rr, store st, shopping sh WHERE rr.id_shopping = sh.id AND rr.id_store = st.id AND sh.name = $1 GROUP BY st.name order by total DESC LIMIT $2', [shopping_name, top_limit], (error, results) => {
      if(error){
        res.send({
          status: 200,
          message: "OK.",
          result: true,
          data: [],
          error: error
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
  else{
    res.send({
      status: 403,
      message: "Input values missing.",
      result: false,
      data: []
    });
  }
}
