

const setUp =  require('./setUp');
const app = require('../index');
const request  = require('supertest');
const authorModel =  require('../models/Authors');
const expect =  require('chai').expect;


//test suites

beforeEach('Setup database', async() => {
	await setUp();
})

describe("Authors Controller CRUD",() => {


	it('Should return all authors', async() => {
		const response =  await request(app).get('/api/v1/authors');
		expect(response.statusCode).to.equal(200)
	})

	it('Should create a author', async() => {
		const author = {
			"first_name":"prueba",
			"last_name":"prueba",
			"username":"prueba",
			"password":"prueba"
		}

		const response =  await request(app).post('/api/v1/authors').send(author)
	
		expect(response.statusCode).to.equal(201)
		expect(response.body).to.have.property('_id')

	})

	it('Should get one author',async() => {
		const author = {
			"first_name":"prueba",
			"last_name":"prueba",
			"username":"prueba",
			"password":"prueba"
		}

		const bdAuthor = await authorModel.create(author);

		const response = await request(app).get(`/api/v1/authors/${bdAuthor._id}`);

		expect(response.statusCode).to.equal(200)
		expect(response.body._id).to.equal(bdAuthor._id.toString());

	})

	it('Should update one author',async()=> {
		const author = {
			"first_name":"prueba",
			"last_name":"prueba",
			"username":"prueba",
			"password":"prueba"
		}
		const bdAuthor = await authorModel.create(author);
		const response = await request(app).patch(`/api/v1/authors/${bdAuthor._id}`)
											.send({"first_name":"prueba2"})
	
		expect(response.statusCode).to.equal(200)
		expect(response.body.first_name).to.equal("prueba2");

	})

	it("Should delete one author",async() => {
		const author = {
			"first_name":"prueba",
			"last_name":"prueba",
			"username":"prueba",
			"password":"prueba"
		}
		const bdAuthor = await authorModel.create(author);
		const response = await request(app).delete(`/api/v1/authors/${bdAuthor._id}`)

		expect(response.statusCode).to.equal(204)


	})
	
})