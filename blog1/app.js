const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}

const serverHandle = (req, res) => {
    res.setHeader('Content-type', 'application/json')

    // 解析query
    const url = req.url
    req.query = querystring.parse(url.split('?')[1])

    // 处理POST data
    getPostData(req).then(postData => {

        req.body = postData

        // const resData = {
        //     name: 'alex666',
        //     site: 'mooc',
        //     env: process.env.NODE_ENV
        // }
        // res.end(
        //     JSON.stringify(resData)
        // )

        const blogResult =handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return;
        }


        // const blogData = handleBlogRouter(req, res)
        // if (blogData) {
        //     res.end(
        //         JSON.stringify(blogData)
        //     )
        //     return
        // }

        // const userDate = handleUserRouter(req, res)
        // if (userDate) {
        //     res.end(
        //         JSON.stringify(userDate)
        //     )
        //     return
        // }
        const userResult = handleUserRouter(req, res)
        console.log('userResult1')
        console.log(userResult)
        if (userResult) {
            console.log('userResult2')
            console.log(userResult)
            userResult.then(userData => {
                console.log('userResult3')
                console.log(userResult)
                res.end(
                        JSON.stringify(userData)
                    )
            })
            return
        }


        res.writeHead(404, {"Content-type": "text/plain"})
        res.write("404 not found\n")
        res.end()
    })
}

module.exports = serverHandle