const jsonServer = require('json-server')
const server = jsonServer.create()
const path = require('path')
const router = jsonServer.router(path.resolve(__dirname, 'db.json'))
const rewriter = jsonServer.rewriter('./routes.json')
const middlewares = jsonServer.defaults()

const account = {
	name: 'admin-yl',
	account: 'weixin1239722456yl',
	birthday: '1996-08-10',
	avatar: 'https://image11.m1905.cn/uploadfile/2023/0105/20230105092941495474.jpg',
	gender: '1',
}

server.use(
	jsonServer.rewriter({
		'/api/*': '/$1',
	}),
)

server.use(middlewares)

router.render = async (req, res) => {
	if (req.path === '/login') {
		const body = req.body
		if (body.name === 'admin' && body.password === 'admin123') {
			res.jsonp({
				errCode: 0,
				data: account,
			})
		} else {
			res.jsonp({
				errCode: 500,
				data: 'login error',
			})
		}
		return
	}

	if (req.path === '/logout') {
		res.jsonp({
			errCode: 0,
			data: "success",
		})
		return
	}

	res.jsonp({
		errCode: 0,
		data: res.locals.data.data,
	})
}

server.use(router)

server.listen(3004, () => {
	console.log('JSON Server is running')
})
