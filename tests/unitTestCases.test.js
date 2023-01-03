/* eslint-disable no-undef */
const request = require('supertest');

const baseUrl = 'http://localhost:3000/api/v1/';
const mongoose = require('mongoose');
const env = require('../config');

let token;
const phoneNumber = Math.round(Math.random() * 1000000000000).toString();
let authorId;
let bookId;
mongoose.connect(env.MONGODB, async () => {
    await mongoose.connection.dropDatabase();
});

describe('User SignUp Api', () => {
    it('should signUp user', async () => {
        const res = await request(baseUrl)
            .post('user/signUp')
            .send({
                firstName: 'sachin',
                lastName: 'sharma',
                phoneNumber,
                email: `sachin${Math.random() * 10000}@email.com`,
                password: '123',
            });
        expect(res.statusCode).toEqual(200);
    });
});

describe('User Login Api', () => {
    it('should login user', async () => {
        const res = await request(baseUrl)
            .post('user/login')
            .send({
                emailOrPhone: phoneNumber,
                password: '123',
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body);
        token = res.body.data.token;
    });
});

describe(' Author Add Api wihout Token', () => {
    it('should give unauthorised error', async () => {
        const res = await request(baseUrl)
            .post('author/add')
            .send({
                firstName: 'P.U',
                lastName: 'Mishra',
                email: 'narayan@email.com',
            });
        expect(res.statusCode).toEqual(401);
    });
});

describe(' Author Add Api with Token but incomple parameters', () => {
    it('should give error', async () => {
        const res = await request(baseUrl)
            .post('author/add')
            .set({ authorization: `Bearer ${token}` })
            .send({
                firstName: 'P.U',
            });
        expect(res.statusCode).toEqual(400);
    });
});

describe(' Author Add Api with Token ', () => {
    it('should add  author', async () => {
        const res = await request(baseUrl)
            .post('author/add')
            .set({ authorization: `Bearer ${token}` })
            .send({
                firstName: 'P.U',
                lastName: 'Mishra',
                email: `narayan${Math.random() * 1000}@email.com`,
            });
        expect(res.statusCode).toEqual(200);
        authorId = res.body.data._id;
    });
});

describe('Get Author endpoint with Token', () => {
    it('should return a 200 status code', async () => {
        const response = await request(baseUrl)
            .get('author/get')
            .set({ authorization: `Bearer ${token}` });
        expect(response.statusCode).toBe(200);
    });
});

describe('Get Author endpoint without Token', () => {
    it('should return a 401 status code', async () => {
        const response = await request(baseUrl)
            .get('author/get');
        expect(response.statusCode).toBe(401);
    });
});

describe('Get AuthorById endpoint without Token', () => {
    it('should return a 401 status code', async () => {
        const response = await request(baseUrl)
            .get('author/getById')
            .query({ id: authorId });
        expect(response.statusCode).toBe(401);
    });
});

describe('Get AuthorById endpoint with Token but incomple parameters', () => {
    it('should return a 400 status code', async () => {
        const response = await request(baseUrl)
            .get('author/getById')
            .set({ authorization: `Bearer ${token}` });
        expect(response.statusCode).toBe(400);
    });
});

describe('Get AuthorById endpoint with Token and complete params', () => {
    it('should return a 200 status code', async () => {
        const response = await request(baseUrl)
            .get('author/getById')
            .set({ authorization: `Bearer ${token}` })
            .query({ id: authorId });
        expect(response.statusCode).toBe(200);
    });
});

describe(' Update Author Api wihout Token', () => {
    it('should give unauthorised error', async () => {
        const res = await request(baseUrl)
            .put('author/update')
            .send({
                id: authorId,
                firstName: 'P.U',
                lastName: 'Mishra',
                email: `narayan${Math.random() * 1000}@email.com`,
            });
        expect(res.statusCode).toEqual(401);
    });
});

describe(' Author Update Api with Token but incomple parameters', () => {
    it('should give error', async () => {
        const res = await request(baseUrl)
            .put('author/update')
            .set({ authorization: `Bearer ${token}` })
            .send({
                firstName: 'P.U',
            });
        expect(res.statusCode).toEqual(400);
    });
});

describe(' Author Update Api with Token ', () => {
    it('should update  author', async () => {
        const res = await request(baseUrl)
            .put('author/update')
            .set({ authorization: `Bearer ${token}` })
            .send({
                id: authorId,
                firstName: 'P.U',
                lastName: 'Mishra',
                email: `narayan${Math.random() * 1000}@email.com`,
            });
        expect(res.statusCode).toEqual(200);
    });
});

describe(' Book Add Api wihout Token', () => {
    it('should give unauthorised error', async () => {
        const res = await request(baseUrl)
            .post('book/add')
            .send({
                name: 'Harry potter',
                code: `harry${Math.random() * 1000}`,
                authorId,
                quantity: 5,
            });
        expect(res.statusCode).toEqual(401);
    });
});

describe(' Book Add Api with Token but incomple parameters', () => {
    it('should give error', async () => {
        const res = await request(baseUrl)
            .post('book/add')
            .set({ authorization: `Bearer ${token}` })
            .send({
                name: 'Harry potter',
            });
        expect(res.statusCode).toEqual(400);
    });
});

describe(' Book Add Api with Token ', () => {
    it('should add  book', async () => {
        const res = await request(baseUrl)
            .post('book/add')
            .set({ authorization: `Bearer ${token}` })
            .send({
                name: 'Harry potter',
                code: `harry${Math.random() * 10000}`,
                authorId,
                quantity: 5,
            });
        expect(res.statusCode).toEqual(200);
        bookId = res.body.data._id;
    });
});

describe('Get Book endpoint with Token', () => {
    it('should return a 200 status code', async () => {
        const response = await request(baseUrl)
            .get('book/get')
            .set({ authorization: `Bearer ${token}` });
        expect(response.statusCode).toBe(200);
    });
});

describe('Get Book endpoint without Token', () => {
    it('should return a 401 status code', async () => {
        const response = await request(baseUrl)
            .get('book/get');
        expect(response.statusCode).toBe(401);
    });
});

describe('Get BookById endpoint without Token', () => {
    it('should return a 401 status code', async () => {
        const response = await request(baseUrl)
            .get('book/getById')
            .query({ id: bookId });
        expect(response.statusCode).toBe(401);
    });
});

describe('Get BookById endpoint with Token but incomple parameters', () => {
    it('should return a 400 status code', async () => {
        const response = await request(baseUrl)
            .get('book/getById')
            .set({ authorization: `Bearer ${token}` });
        expect(response.statusCode).toBe(400);
    });
});

describe('Get BookById endpoint with Token and complete params', () => {
    it('should return a 200 status code', async () => {
        const response = await request(baseUrl)
            .get('book/getById')
            .set({ authorization: `Bearer ${token}` })
            .query({ id: bookId });
        expect(response.statusCode).toBe(200);
    });
});

describe(' Update Book Api wihout Token', () => {
    it('should give unauthorised error', async () => {
        const res = await request(baseUrl)
            .put('book/update')
            .send({
                id: bookId,
                firstName: 'P.U',
                lastName: 'Mishra',
                email: `narayan${Math.random() * 1000}@email.com`,
            });
        expect(res.statusCode).toEqual(401);
    });
});

describe(' Book Update Api with Token but incomple parameters', () => {
    it('should give error', async () => {
        const res = await request(baseUrl)
            .put('book/update')
            .set({ authorization: `Bearer ${token}` })
            .send({
                firstName: 'P.U',
            });
        expect(res.statusCode).toEqual(400);
    });
});

describe(' Book Update Api with Token ', () => {
    it('should update  book', async () => {
        const res = await request(baseUrl)
            .put('book/update')
            .set({ authorization: `Bearer ${token}` })
            .send({
                id: bookId,
                name: 'Harry potter',
                code: `harry${Math.random() * 10000}`,
                authorId,
                quantity: 5,
            });
        expect(res.statusCode).toEqual(200);
    });
});

describe(' Delete Author Api wihout Token', () => {
    it('should give unauthorised error', async () => {
        const res = await request(baseUrl)
            .delete('author/delete')
            .query({
                id: authorId,
            });
        expect(res.statusCode).toEqual(401);
    });
});

describe(' Author Delete Api with Token but incomple parameters', () => {
    it('should give error', async () => {
        const res = await request(baseUrl)
            .delete('author/delete')
            .set({ authorization: `Bearer ${token}` });

        expect(res.statusCode).toEqual(400);
    });
});

describe(' Author Delete Api with Token ', () => {
    it('should delete  author', async () => {
        const res = await request(baseUrl)
            .delete('author/delete')
            .set({ authorization: `Bearer ${token}` })
            .query({
                id: authorId,
            });
        expect(res.statusCode).toEqual(200);
    });
});

describe(' Delete Book Api wihout Token', () => {
    it('should give unauthorised error', async () => {
        const res = await request(baseUrl)
            .delete('book/delete')
            .query({
                id: bookId,
            });
        expect(res.statusCode).toEqual(401);
    });
});

describe(' Book Delete Api with Token but incomple parameters', () => {
    it('should give error', async () => {
        const res = await request(baseUrl)
            .delete('book/delete')
            .set({ authorization: `Bearer ${token}` });
        expect(res.statusCode).toEqual(400);
    });
});

describe(' Book Delete Api with Token ', () => {
    it('should delete  book', async () => {
        const res = await request(baseUrl)
            .delete('book/delete')
            .set({ authorization: `Bearer ${token}` })
            .query({
                id: bookId,
            });
        expect(res.statusCode).toEqual(200);
    });
});
