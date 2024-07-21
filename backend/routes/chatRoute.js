const express = require('express');
const chatRouter = express.Router();
const chatController = require('../controller/chatController');
const  authenticate = require('../middlewares/authUser');
const checkBlocked = require('../middlewares/checkBlocked')


chatRouter.post('/create', authenticate, chatController.createChat);
chatRouter.get('/getchat/:trainerId/:userId', authenticate, chatController.getChatByUserAndTrainerId);
chatRouter.get('/messages/:userRole/:userId',authenticate,chatController.getAllChatsByUserId)


chatRouter.get('/:chatId', authenticate, chatController.getChatById);
chatRouter.post('/:chatId/message', authenticate, chatController.sendMessage);
chatRouter.post('/file-upload', authenticate, chatController.uploadFile);



module.exports = chatRouter;  