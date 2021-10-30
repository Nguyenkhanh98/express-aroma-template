let controller = {};
let models = require('../database/models');
let Review = models.Review;
let Sequelize = require('sequelize');
const product = require('./product');
const { ConnectionRefusedError } = require('sequelize');
let Op = Sequelize.Op;


controller.add =(review) =>{
    return new Promise((resolve, reject) =>{
        Review.findOne({
            where:{
                userId: review.userId,
                productId: review.productId
            }
        })
        .then((data) =>{
            if(data){
                return Review.update(review,{
                    where: {
                        userId: review.userId,
                        productId: review.productId
                    }
                })
            } else{
                return Review.create(review);
            }
        })
        .then((data) => {
            models.Product.findOne({
                    where:{ id: review.productId },
                    include: [{ model: models.Review}]
                })
                .then(product =>{
                    product.reviewCount = product.Reviews.length;
                    let overallReview = 0;
                    let l= product.Reviews.length;
                    for(let i= 0; i < l; i++){
                        overallRview += product.Reviews[i].rating;
                    }
                    overallReview = overallReview / product.Reviews.length;
                    product.overallReview = overallReview;
                    models.Product.update({
                        overallRview: overallRview,
                        reviewCount: product.Reviews.length
                    },{
                        where:{ id:product.id }
                    })
                })
            resolve(data);
        })
        .catch(error => reject(new Error(error)));
    })
};
controller.getUserReviewProduct = (userId, productId) =>{
    return Review.findOne({
        where:{
            userId,
            productId
        }
    })
};
module.exports = controller;