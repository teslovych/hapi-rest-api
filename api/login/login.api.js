const loginPluign = {
    name: 'login-api',
    register
};

async function register(server, options) {
    server.route([{
        method: 'POST',
        path: '/api/v1/login',
        handler: (req, h) => {
            const  {user} = req.payload;
            return `You logged as ${user}`;
        }
    }]);
}

module.exports = loginPluign;

