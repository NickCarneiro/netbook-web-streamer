
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Netbook Web Stream' });
};

exports.loadUrl = function(req, res){
    res.set('Content-Type', 'application/javascript');
    res.send('');
};