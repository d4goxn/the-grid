require! {
	express
	path
	RedisStore: 'connect-redis'
}

root = path.join __dirname, '../..'
console.log 'Project root:', root

app = express()
app.use \/static, express.static path.join root, \client, \dist

app.use app.router

app.get \/, (req, res)->
	console.log '/'
	res.sendfile path.join root, \client, \dist, \index.html

do
	err <- app.listen 3000
	if err
		console.log \Error:, err
	else
		console.log 'Listening on port', 3000
