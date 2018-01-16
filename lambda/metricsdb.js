var Influx = require('influx')

function MetricsDB(){
  this.influx = new Influx.InfluxDB({
    host: process.env.INFLUXDB_HOST,
    database: process.env.INFLUXDB_DATABASE
  })
}

bytesToSize = (bytes) => {
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
   if (bytes == 0) return '0 Byte'
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
}

MetricsDB.prototype.getCPU = function(machine, callback){
  this.influx.query(`
      SELECT last(usage_system) AS system, last(usage_user) AS "user"
      FROM cpu_vm
      WHERE time > now() - 5m AND host='${machine}'
    `).then(result => {
      var timestamp = result[0].time._nanoISO
      var system_usage = result[0].system.toFixed(2)
      var user_usage = result[0].user.toFixed(2)
      callback(`CPU Usage is ${system_usage}% ${user_usage}% at ${timestamp}`)
  }).catch(err => {
      callback(`Cannot get cpu usage values`)
  })
}

MetricsDB.prototype.getDisk = function(machine, callback){
  this.influx.query(`
      SELECT last(free) AS free, last(used) AS "used"
      FROM disk_vm
      WHERE time > now() - 5m AND host='${machine}'
    `).then(result => {
      var timestamp = result[0].time._nanoISO
      var free_disk = result[0].free
      var used_disk = result[0].used
      callback(`Disk Usage is ${bytesToSize(free_disk)} ${bytesToSize(used_disk)} at ${timestamp}`)
  }).catch(err => {
      callback(`Cannot get disk usage values`)
  })
}

MetricsDB.prototype.getMemory = function(machine, callback){
  this.influx.query(`
      SELECT last(free) AS free, last(used) AS "used"
      FROM mem_vm
      WHERE time > now() - 5m AND host='${machine}'
    `).then(result => {
      var timestamp = result[0].time._nanoISO
      var free_memory = result[0].free
      var used_memory = result[0].used
      callback(`Memory Usage is ${bytesToSize(free_memory)} ${bytesToSize(used_memory)} at ${timestamp}`)
  }).catch(err => {
      callback(`Cannot get memory usage values`)
  })
}

module.exports = MetricsDB
