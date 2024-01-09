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
let resumeId = null;

describe("Resume API Tests", () => {
    before((done) => {
        // This code will be executed before each test
        console.log("Running setup before each test");
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

    describe("Add Resume API Tests", () => {
        it("should add a new resume", (done) => {
            chai.request(app)
                .post(API.RESUME.ADD)
                .set("Authorization", "Bearer " + token)
                .send(REQUEST.RESUME.ADD)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("success").equals(true);
                    expect(res.body)
                        .to.have.property("message")
                        .equals(MESSAGES.ADDED("Resume"));
                    expect(res.body).to.have.property("data");
                    expect(res.body.data).to.have.property("resume");
                    expect(res.body.data.resume).to.be.an("object");
                    expect(res.body.data.resume).to.have.property("_id");
                    resumeId = res.body.data.resume._id;
                    done();
                });
        });
        it("should return an error for invalid input data", (done) => {
            chai.request(app)
                .post(API.RESUME.ADD)
                .set("Authorization", "Bearer " + token)
                .send(REQUEST.RESUME.INCORRECT_ADD)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property("success").equals(false);
                    expect(res.body).to.have.property("error");
                    done();
                });
        });
    });
    describe("Edit Resume API Tests", () => {
        it("should edit a resume", (done) => {
            chai.request(app)
                .put(API.RESUME.EDIT(resumeId))
                .set("Authorization", "Bearer " + token)
                .send(REQUEST.RESUME.ADD)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("success").equals(true);
                    expect(res.body)
                        .to.have.property("message")
                        .equals(MESSAGES.UPDATED("Resume"));
                    expect(res.body).to.have.property("data");
                    expect(res.body.data).to.have.property("updatedResume");
                    expect(res.body.data.updatedResume).to.be.an("object");
                    expect(res.body.data.updatedResume).to.have.property("_id");
                    done();
                });
        });
        it("should return an error for invalid input data", (done) => {
            chai.request(app)
                .put(API.RESUME.EDIT(resumeId))
                .set("Authorization", "Bearer " + token)
                .send(REQUEST.RESUME.INCORRECT_ADD)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property("success").equals(false);
                    expect(res.body).to.have.property("error");
                    done();
                });
        });
    });

    describe("Delete Resume API Tests", () => {
        it("should delete a resume", (done) => {
            chai.request(app)
                .delete(API.RESUME.DELETE(resumeId))
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("success").equals(true);
                    expect(res.body)
                        .to.have.property("message")
                        .equals(MESSAGES.DELETED("Resume"));
                    expect(res.body).to.have.property("data");
                    expect(res.body.data).to.have.property("updatedResume");
                    expect(res.body.data.updatedResume).to.be.an("object");
                    expect(res.body.data.updatedResume).to.have.property("_id");
                    done();
                });
        });
        it("should return an error for invalid input data", (done) => {
            chai.request(app)
                .delete(API.RESUME.DELETE("658af2d2e47c2e1880e1c8d4"))
                .set("Authorization", "Bearer " + token)
                .send(REQUEST.RESUME.INCORRECT_ADD)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property("success").equals(false);
                    done();
                });
        });
    });

    describe("getOne Resume API Tests", () => {
        it("should get a resume", (done) => {
            chai.request(app)
                .get(API.RESUME.GET_ONE(resumeId))
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("success").equals(true);

                    expect(res.body).to.have.property("data");
                    expect(res.body.data).to.have.property("resume");
                    expect(res.body.data.resume).to.be.an("object");
                    expect(res.body.data.resume).to.have.property("_id");
                    done();
                });
        });
        it("should return an error for invalid input data", (done) => {
            chai.request(app)
                .get(API.RESUME.GET_ONE("658af2d2e47c2e1880e1c8d4"))
                .set("Authorization", "Bearer " + token)
                .send(REQUEST.RESUME.INCORRECT_ADD)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property("success").equals(false);
                    done();
                });
        });
    });

    describe("get All Resume API Tests", () => {
        
        it("should get all resume", (done) => {
            chai.request(app)
                .get(API.RESUME.GET)
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("success").equals(true);
                    expect(res.body).to.have.property("data");
                    expect(res.body.data).to.have.property("rows");
                    expect(res.body.data.rows).to.be.an("array");
                    expect(res.body.data.count).to.be.a("number");
                    done();

                });
        });
    });
});
