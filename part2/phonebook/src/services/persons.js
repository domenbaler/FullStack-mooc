import axios from 'axios'

const basUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request =  axios.get(basUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request =  axios.post(basUrl,newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request =  axios.put(`${basUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const remove = (id) => {
    axios.delete(`${basUrl}/${id}`)
}

const exportedObject = {
    getAll: getAll,
    create: create,
    update: update,
    remove: remove
}

export default exportedObject