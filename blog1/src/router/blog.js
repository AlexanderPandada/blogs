const {getList, getDetail, newBlog,updateBlog, delBlog} = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method
    const id = req.query.id
    const url = req.url
    const path = url.split('?')[0]

    if (method === 'GET' && path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        // const listData = getList(author, ke yword)
        // return new SuccessModel(listData)
        const result = getList(author, keyword) // 返回promise
        return result.then(listData => {
            return new SuccessModel(listData)
        })

    }

    if (method === 'GET' && path === '/api/blog/detail') {
        // const id = req.query.id
        // const detailData = getDetail(id)
        // return new SuccessModel(detailData)
        const result = getDetail(id)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    if (method === 'POST' && path === '/api/blog/new') {
        // const blogData = newBlog(req.body)
        // return new SuccessModel(blogData)
        const author = 'duck' // 临时
        req.body.author = author
        const result = newBlog(req.body)
        return result.then(data => {
            return new SuccessModel(data)
        })

    }

    if (method === 'POST' && path === '/api/blog/update') {
        console.log('update router')
        const result = updateBlog(id, req.body)
        // if (result) {
        //     return new SuccessModel()
        // } else {
        //     return new ErrorModel('更新博客失败')
        // }
        return result.then(val => {
            if (val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('更新博客失败')
            }
        })
    }

    if (method === 'POST' && path === '/api/blog/delete') {
        // const result = delBlog(id)
        // if (result) {
        //     return new SuccessModel()
        // } else {
        //     return new ErrorModel('删除博客失败')
        // }

        const author = 'duck' // 临时
        req.body.author = author
        const result = delBlog(id, author)
        return result.then(val => {
            if (val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('删除失败')
            }

        })


    }
}

module.exports = handleBlogRouter