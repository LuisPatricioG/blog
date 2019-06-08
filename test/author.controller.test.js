const setUp = require('./setUp');
const app = require('../index');
const request = require('supertest');
const authorModel = require('../models/Authors');
const expect = require('chai').expect;

//test suites

// beforeEach('Setup database', async () => {
//   await setUp();
// })

describe("Authors Conntroller CRUD", () => {

  it('Should return all authors', async() => {
    const response = await request(app).get('/api/v1/authors');
    expect(response.statusCode).to.equal(200);
  })

  it('Should create an author', async() => {
    const author = {
      "first_name":"Prueba",
      "last_name":"Prueba",
      "username":"Prueba",
      "password":"prueba"
    }
    const response = await request(app).post('/api/v1/authors').send(author)

    expect(response.statusCode).to.equal(201)
    expect(respone.body).to.have.property('_id')
  })

  it('Should get an author', async() => {
    const author = {
      "first_name":"Prueba",
      "last_name":"Prueba",
      "username":"Prueba",
      "password":"prueba"
    }

    const bdAuthor = await authorModel.create(author);
    const respone = await request(app).get(`/api/v1/authors/${bdAuthor._id}`);

    expect(respone.statusCode).to.equal(200)
    expect(respone.body._id).to.equal(bdAuthor._id);
  })

  it('Should update an author', async() => {
    const author = {
      "first_name":"Prueba",
      "last_name":"Prueba",
      "username":"Prueba",
      "password":"prueba"
    }

    const bdAuthor = await authorModel.create(author);
    const respone = await request(app).patch(`/api/v1/authors/${bdAuthor._id}`)
                                      .send({"name":"prueba2"})

    expect(respone.statusCode).to.equal(200)
    expect(respone.body.name).to.equal("prueba2");
  })

  it('Should delete an author', async() => {
    const author = {
      "first_name":"Prueba",
      "last_name":"Prueba",
      "username":"Prueba",
      "password":"prueba"
    }

    const bdAuthor = await authorModel.create(author);
    const respone = await request(app).delete(`/api/v1/authors/${bdAuthor._id}`);

    expect(respone.statusCode).to.equal(204)
  })

})