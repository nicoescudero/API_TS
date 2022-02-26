import {body,param,check} from 'express-validator';

export const validationProduct: any = [
    body('name','Enter a name').exists().notEmpty().isString().trim().escape(),
    body('price','Enter a price').exists().notEmpty().isNumeric(),
];

export const validationProductId: any = [
    param('id','Enter a valid product id').exists().notEmpty().isMongoId()
];

export const validationProductUpdate:any = [
    param('id','Enter a valid product id').exists().notEmpty().isMongoId(),
    body('name','Enter a name').exists().notEmpty().isString().trim().escape(),
    body('price','Enter a price').exists().notEmpty().isNumeric(),
];