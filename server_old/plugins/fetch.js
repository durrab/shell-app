const plugin = {pkg: { name: "fetchUserInfoPlugin"}}


plugin.register = async (server, options) => {
    server.route({
        method: "GET",
        url: "/remote",
        async handler(request, reply) {
          try {
            reply.type("application/json");
            reply.send({message:"Durrab Test"});
          } catch (error) {
            reply.send(error.stack);
          }
        },
      });

}

plugin.register.attributes = {
    name:"fetchUserInfoPlugin",
    version: "1.0.0"
}

module.exports = plugin;