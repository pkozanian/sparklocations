const geoip = require('geoip-lite');

var defaultGeo={ range: [ 1119431488, 1119431551 ],
    country: 'CG',
    region: '00',
    city: 'Nowhere',
    ll: [ 0.0000, 0.0000 ],
    metro: 0 }

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  // Get ipv4 address
  var IpFromRequest=req.connection.remoteAddress;
  var indexOfColon = IpFromRequest.lastIndexOf(':');
  var ip = IpFromRequest.substring(indexOfColon+1,IpFromRequest.length);
  console.log('IPV4: '+ip);

  var geo = geoip.lookup(ip);
  if (!geo){
    geo=defaultGeo;
  }
  console.log('GEO:');
  console.log(geo);

  res.render('home', {
    title: 'Home',
    ip:ip,
    geo:geo
  });
};
