import {body} from 'express-validator';

export  const validationSignUp: any=[
    body('username','Enter a username, must be 4 characteres').exists().notEmpty().isLength({ min: 4 }),
    body('password','Enter a password must be 8 characteres').exists().notEmpty().isLength({ min: 8}),
    body('email','You need a valid email address').exists().notEmpty().isEmail().normalizeEmail()
];

export const validationSignIn: any=[
    body('password','Enter a password must be 8 characteres').exists().notEmpty().isLength({ min: 8}),
    body('email','You need a valid email address').exists().notEmpty().isEmail().normalizeEmail()
];
