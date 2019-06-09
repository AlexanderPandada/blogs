const { exec } = require('../db/mysql')


const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    console.log('getList method')
    if (author) {
        sql += `and author = '${author}' `
    }

    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }

    sql += 'order by createtime desc;'

    return exec(sql)
}

const getDetail = (id) => {
    // return {
    //     id:1,
    //     title: 'A',
    //     content: 'A',
    //     createTime: 111,
    //     author:'alex'
    // }

    const sql = `select * from blogs where id = '${id}'`
    return exec(sql).then(rows => {
        return rows[0]
    })
}

const newBlog = (blogData = {}) => {
    // blogData 是一个博客对象，包含title, content, author属性

    const title = blogData.title
    const content = blogData.content
    const author = blogData.author
    const createTime = Date.now()

    console.log('new blog')
    const sql = `
        insert into blogs (title, content, createTime, author)
        values('${title}', '${content}', ${createTime}, '${author}');
    `
    return exec(sql).then(insertData => {
        console.log('insert Data is ', insertData)
        return {
            id: insertData.insertId
        }
    })


    // return {
    //     id: 3
    // }
}

const updateBlog = (id, blogData = {}) => {
    // console.log('updata', id, blogData)
    // return true

    // 这个只返回true 或 false
    const title = blogData.title
    const content = blogData.content

    const sql = `
        update blogs set title='${title}', content='${content }' where id = ${id}
    `
    return exec(sql).then(updateData => {
        console.log('updateData is ', updateData)
        if (updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}

const delBlog = (id, author) => {
    const sql = `
        delete from blogs where id = '${id}' and author = '${author}'
    `
    return exec(sql).then(deleteData => {
        console.log('deleteData is ', deleteData)
        if (deleteData.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}