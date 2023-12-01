import express from 'express';
import redis from 'redis';
import util from 'util';

const client = redis.createClient();
client.on('connect', () => {}).on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err}`);
});

const list = [
    {
        itemId: '1',
        itemName: 'Suitcase 250',
        price: '50',
        stock: 4,
    },
    {
        itemId: '2',
        itemName: 'Suitcase 450',
        price: '100',
        stock: 10,
    },
    {
        itemId: '3',
        itemName: 'Suitcase 650',
        price: '350',
        stock: 2,
    },
    {
        itemId: '4',
        itemName: 'Suitcase 1050',
        price: '550',
        stock: 5,
    },
];

function getItemById(itemId) {
    return list.find((item) => item.itemId === itemId);
}

function reserveStockById(itemId, stock) {
    client.set(`item.${itemId}`, stock);
}

async function getCurrentReservedStockById(itemId) {
    const getAsync = util.promisify(client.get).bind(client);
    return getAsync(`item.${itemId}`);
}

const app = express();

app.get('/list_products', (req, res) => {
    res.json(list).end();
});

app.get('/list_products/:itemId', async (req, res) => {
    const itemId = req.params.itemId;
    const product = getItemById(itemId);
    const checkInventory = await getCurrentReservedStockById(itemId);
    if (product) {
        product.currentQuantity = checkInventory;
        res.json(product).end();
    } else {
        res.json({ status: 'Product not found' }).end();
    }
});

app.get('/reserve_product/:itemId', async (req, res) => {
    const itemId = req.params.itemId;
    const product = getItemById(itemId);
    if (product) {
        const currentStock = await getCurrentReservedStockById(itemId);
        if (currentStock > 0) {
            reserveStockById(itemId, currentStock - 1);
            res.json({ status: 'Reservation confirmed', itemId }).end();
        } else {
            res.json({ status: 'Not enough stock available', itemId }).end();
        }
    } else {
        res.json({ status: 'Product not found' }).end();
    }
});

const PORT = 1245;
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
