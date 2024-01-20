const express = require('express');
require('./db/config');
const User = require('./db/User');
const Product = require('./db/Product');
const cors = require('cors');
const app = express();

const Jwt = require('jsonwebtoken');
const JwtKey = 'e-com';

app.use(express.json());
app.use(cors());
// const corsOptions = {
//     origin: 'http://localhost:3000',
//   };

//   app.use(cors(corsOptions));

app.post('/register', async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    if (result) {
        Jwt.sign({ result }, JwtKey, { expiresIn: '2h' }, (error, token) => {
            if (error) {
                res.send({ result: 'Invalid User' });
            }
            res.send({ result, auth: token });
        })
    }
});

app.post('/login', async (req, res) => {

    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select('-password');
        if (user) {
            Jwt.sign({ user }, JwtKey, { expiresIn: '2h' }, (error, token) => {
                if (error) {
                    res.send({ result: 'Invalid User' });
                }
                res.send({ user, auth: token });
            })
        } else {
            res.send({ result: 'Invalid User' });
        }
    } else {
        res.send({ result: 'Invalid User' });
    }
});

app.post('/add-product', async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
});


app.get('/products', verifyToken, async (req, res) => {
    let products = await Product.find();
    if (products.length > 0) {
        res.send(products);
    } else {
        res.send({ result: 'No product found' });
    }
});

app.delete('/product/:id', verifyToken, async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);
});

app.get('/product/:id', verifyToken, async (req, res) => {
    const result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    } else {
        res.send({ result: 'Product not found!!' });
    }
})

app.put('/product/update/:id', verifyToken, async (req, res) => {
    const result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    res.send(result);
})

app.get('/search/:key', verifyToken, async (req, res) => {
    let result = await Product.find({
        '$or': [
            { name: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
        ]
    });
    res.send(result);
})

function verifyToken(req, res, next) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        Jwt.verify(token, JwtKey, (error, valid) => {
            if (error) {
                res.status(401).send({ result: 'Provide valid token.' });
            } else {
                next()
            }
        })
    } else {
        res.status(403).send({ result: 'Add token with header.' });
    }
    // console.log('middleware called',token);
    // next();
}

app.listen(5000);