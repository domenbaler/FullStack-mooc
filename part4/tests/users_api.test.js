const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})

    for(let user of helper.initialUsers){
        let userObject = new User(user)
        await userObject.save()
    }
})



test('users are returned as json', async() => {
    await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('valid user can be added', async () => {
    const newUser = {
        "username": "ReusablePassword",
        "name": "Never",
        "password": "password123"
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const users = await helper.usersInDb()
    expect(users).toHaveLength(helper.initialUsers.length + 1)

    const userNames = users.map(user => user.username)
    expect(userNames).toContain("ReusablePassword")
    
})

describe('invalid users cannot be added', () => {
    test('when username is too short',async () => {
        const newUser = {
            "username": "Mo",
            "name": "PawPaw",
            "password": "password123"
        }

        const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

        expect(response.body.error).toContain("User validation failed: username")
        expect(response.body.error).toContain("minimum allowed length (3)")
        

        const users = await helper.usersInDb()
        expect(users).toHaveLength(helper.initialUsers.length)
    })

    test('when password is too short',async () => {
        const newUser = {
            "username": "KeysOfFunction",
            "name": "Unknown",
            "password": "f2"
        }

        await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect({error: "Password is too short"})

        const users = await helper.usersInDb()
        expect(users).toHaveLength(helper.initialUsers.length)
    })

    test('when username not is unique',async () => {
        const newUser = {
            "username": "Gyros",
            "name": "Hungry",
            "password": "password123"
        }

        const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        
        expect(response.body.error).toContain('`username` to be unique')

        const users = await helper.usersInDb()
        expect(users).toHaveLength(helper.initialUsers.length)
    })
})





afterAll( () => {
    mongoose.connection.close()
})