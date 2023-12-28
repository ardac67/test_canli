"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var express_validator_1 = require("express-validator");
var aut_1 = require("./modules/aut");
var user_1 = require("./handlers/user");
var middleware_1 = require("./modules/middleware");
var validationSchemas_1 = require("./modules/validationSchemas");
var cors_1 = __importDefault(require("cors"));
var router_1 = __importDefault(require("./router"));
var socket_io_1 = require("socket.io");
var http_1 = __importDefault(require("http"));
var app = (0, express_1.default)();
var server = http_1.default.createServer(app);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
io.on('connection', function (socket) {
    console.log("User connected ".concat(socket.id));
    socket.on('join_room', function (data) {
        socket.join(data.room); // Join the user to a socket room
        console.log("user:".concat(socket.id, " user_id: ").concat(data.user, ",user_name: ").concat(data.user_name, ", user_room: ").concat(data.room));
    });
    socket.on('send_message', function (data) {
        //{ user: user, message: message, room: 'room1' }
        io.to(data.room).emit('receive_message', data);
        console.log("user:".concat(socket.id, " user_name: ").concat(data.user, ", message: ").concat(data.message), data.room);
    });
});
server.listen(3002, function () {
    console.log('Welcome to Tata-MESSAGE');
});
var corsOptions = {
    origin: ['http://localhost:3000', 'null'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204 // HTTP status code to respond with for preflight requests
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    res.json({ message: "'Welcome to Tata-API'" });
});
//app.post('/createUser',checkSchema(validatorForUser),handleInputError,createNewUser)
app.post('/createUser', user_1.createNewUser);
app.post('/signin', (0, express_validator_1.checkSchema)(validationSchemas_1.validatorSign), middleware_1.handleInputError, user_1.signin);
app.use('/api', aut_1.protect, router_1.default);
exports.default = app;
//# sourceMappingURL=server.js.map