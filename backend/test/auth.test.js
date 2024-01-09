require("dotenv").config();
require("../db");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const { MESSAGES } = require("../utils/constant.util");
const { API } = require("./constant");
const REQUEST = require("./request.json");
chai.use(chaiHttp);
const { expect, assert } = chai;

let token = null;

describe("Auth API Tests", () => {
    describe("Auth Register API Tests", () => {
        it("should register a new user", (done) => {
            chai.request(app)
                .post(API.AUTH.REGISTER)
                .send(REQUEST.AUTH.REGISTER)
                .end((err, res) => {
                    if(res.body.success){
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property("success").equals(true);
                        expect(res.body)
                            .to.have.property("message")
                            .equals(MESSAGES.REGISTER);

                    }else{
                        expect(res).to.have.status(400);
                        expect(res.body).to.have.property("success").equals(false);
                        expect(res.body)
                            .to.have.property("message")
                            .equals(MESSAGES.EMAIL_EXIST);
                    }
                    done();
                });
        });
        it("should return an error for invalid input data", (done) => {
            chai.request(app)
                .post(API.AUTH.REGISTER)
                .send(REQUEST.AUTH.INVALID_REGISTER)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property("success").equals(false);
                    expect(res.body).to.have.property('error');
                    done();
                });
        });
    });

    describe("Auth Login API Tests", () => {
        it("should log in a user with valid credentials", (done) => {
            chai.request(app)
                .post(API.AUTH.LOGIN)
                .send(REQUEST.AUTH.LOGIN)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("success").equals(true);
                    expect(res.body)
                        .to.have.property("message")
                        .equals(MESSAGES.LOGIN);
                    expect(res.body).to.have.property("data");
                    expect(res.body.data).to.have.property("token");
                    token = res.body.data.token;

                    done();
                });
        });
        it("should return an error for invalid credentials", (done) => {
            chai.request(app)
                .post(API.AUTH.LOGIN)
                .send(REQUEST.AUTH.INCORRECT_LOGIN)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property("success").equals(false);
                    expect(res.body)
                        .to.have.property("message")
                        .equals(MESSAGES.INVALID_CREDENTIAL);
                    done();
                });
        });
    });

    describe("Auth Me API Tests", () => {
        it("should get current login user", (done) => {
            chai.request(app)
                .get(API.AUTH.ME)
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property("success").equals(true);
                        expect(res.body).to.have.property("data");
                        expect(res.body.data).to.have.property("user");
                        expect(res.body.data.user).to.be.an("object");
                        expect(res.body.data.user).to.have.property("_id");
                        expect(res.body.data.user).to.have.property("email");
                    done();
                });
        });
    });
});
