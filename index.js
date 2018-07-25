const hapi = require('hapi');
const mongoose = require('mongoose');
const postsPlugin = require('./api/posts/posts.api');
const loginPlugin = require('./api/login/login.api');

const server = hapi.server({
    port: 4000,
    host: 'localhost',
    routes: {
        cors: {
            origin: ['*']
        }
    }
});

const dbConnect = function () {
    mongoose.connect('mongodb://post-user1:post-user1@ds125211.mlab.com:25211/posts');
    mongoose.connection.once('open', () => {
        console.log('Database was connected');
    });
}

const init = async () => {
    server.route([{
        method: 'GET',
        path: '/',
        handler: () => {
            return '';
        }
    }]);

    try {
        await server.register([
            loginPlugin,
            postsPlugin
        ]);
        console.log('Plugins was loaded successfully');
    } catch (err) {
        console.log('Error happened while loading plugins');
    }

    await server.start();

    console.log(`Server started at ${server.info.uri}`);

    dbConnect();
};

init();