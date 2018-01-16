var Influx = require('influx')

function MetricsDB(){
  this.influx = new Influx.InfluxDB({
    host: process.env.INFLUXDB_HOST,
    database: process.env.INFLUXDB_DATABASE
  })
}

bytesToSize = (bytes) => {
   var sizes = ['Bytes', 'Kilobyte', 'MegaByte', 'GigaByte', 'TeraByte']
   if (bytes == 0) return '0 Byte'
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
}

MetricsDB.prototype.getCPU = function(machine, callback){
  this.influx.query(`
      SELECT last(usage_system) AS system, last(usage_user) AS "user"
      FROM cpu
      WHERE time > now() - 5m AND host='${machine}'
    `).then(result => {
      var system_usage = result[0].system.toFixed(2)
      var user_usage = result[0].user.toFixed(2)
      callback(`System usage is ${system_usage} percent & user usage is ${user_usage} percent`)
  }).catch(err => {
      callback(`Cannot get cpu usage values`)
  })
}

MetricsDB.prototype.getDisk = function(machine, callback){
  this.influx.query(`
      SELECT last(free) AS free, last(used) AS "used"
      FROM disk
      WHERE time > now() - 5m AND host='${machine}'
    `).then(result => {
      var free_disk = result[0].free
      var used_disk = result[0].used
      callback(`Free disk is ${bytesToSize(free_disk)} & used disk is ${bytesToSize(used_disk)}`)
  }).catch(err => {
      callback(`Cannot get disk usage values`)
  })
}

MetricsDB.prototype.getMemory = function(machine, callback){
  this.influx.query(`
      SELECT last(free) AS free, last(used) AS "used"
      FROM mem
      WHERE time > now() - 5m AND host='${machine}'
    `).then(result => {
      var free_memory = result[0].free
      var used_memory = result[0].used
      callback(`Free memory is ${bytesToSize(free_memory)} & used memory is ${bytesToSize(used_memory)}`)
  }).catch(err => {
      callback(`Cannot get memory usage values`)
  })
}

module.exports = MetricsDB
