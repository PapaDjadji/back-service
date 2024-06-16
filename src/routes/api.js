
module.exports = (app) => {

    app.use('/api/package', require('../controllers/package'));
    app.use('/api/delivery', require('../controllers/delivery'));

}