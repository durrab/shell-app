const plugin = {pkg: { name: "fetchUserInfoPlugin"}}
const path = require('path')
const fs = require('fs')
const { default: axios } = require('axios')

plugin.register = async (server, options) => {

      server.route({
        method: "GET",
        path: "/api/cars",
        handler: async (request, reply) => {
          try {
            const res = await axios.get("https://cvdt-dev2.cerencedemo.com/api/v1/car?fields=vin,imei,location");
            const cars = res.data.cars;
            //reply.type("application/json");
            const response = reply.response(cars);
            response.header("Content-Type","application/json")
            return response;
          } catch (error) {
            reply.response(error.stack);
          }
        },
      });

}

plugin.register.attributes = {
    name:"fetchUserInfoPlugin",
    version: "1.0.0"
}

module.exports = plugin;
