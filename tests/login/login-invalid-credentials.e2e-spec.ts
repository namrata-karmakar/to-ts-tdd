import request from "supertest"
import { Database } from '../../src/database'
import { app } from "../../src/app"

describe(`Login Test Suite for Invalid Credentials`, ()=>{

    beforeAll(async () => {
        await new Database().dropDatabase();
        const requestBody = {"username" : "falknor@gmail.com",
        "password" : "N$dnoq2jie",
        "dob" : "1992-03-01",
        "tnc" : true
        }
        await request(app).post('/user/signUp').send(requestBody);
    })
    
    afterAll(async ()=>{
        await new Database().dropDatabase();
    })

    it(`must not login and return status 401`, async done=>{
        const requestBody = {
            "username" : "hello@gmail.com",
            "password" : "ASdiw2*nsd"
        }
        const response = await request(app).post('/user/login').send(requestBody);
        const { status } = response;
        expect(status).toBe(401);
        done();
    })
})

