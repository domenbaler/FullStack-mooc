const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const totalLikes = blogs.reduce((sum, item) => sum + item.likes, 0)
    return totalLikes
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0){
        return {}
    }

    const favorite = blogs.reduce((prev, item) => (prev.likes >= item.likes) ? prev : item)
    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
}

const mostBlogs = (blogs) => {
    if(blogs.length === 0){
        return {}
    }

    const groupedAuthors = blogs.reduce((grouped, blog) => {
        !grouped[blog.author] ? grouped[blog.author] = 1 : grouped[blog.author]++
        return grouped
    },{})

    let maxName = ''
    let maxValue = 0

    for(let prop in groupedAuthors){
        if(groupedAuthors[prop] > maxValue){
            maxName = prop
            maxValue = groupedAuthors[prop]
        }
    }

    return  {
        author: maxName,
        blogs: maxValue
    } 
}

const mostLikes = (blogs) => {
    if(blogs.length === 0) {
        return {}
    }

    const groupedAuthors = blogs.reduce((grouped, blog) => {
        !grouped[blog.author] ? grouped[blog.author] = blog.likes : grouped[blog.author] += blog.likes
        return grouped
    },{})

    let maxName = ''
    let maxValue = 0

    for(let prop in groupedAuthors){
        if(groupedAuthors[prop] > maxValue){
            maxName = prop
            maxValue = groupedAuthors[prop]
        }
    }

    return  {
        author: maxName,
        likes: maxValue
    } 

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}