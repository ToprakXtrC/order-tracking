const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { orderCode, newStatus, newDescription } = JSON.parse(event.body);

    const ordersFilePath = path.resolve(__dirname, 'orders.json');
    const orders = JSON.parse(fs.readFileSync(ordersFilePath, 'utf8'));

    const order = orders.find(order => order.orderCode === orderCode);
    if (!order) {
        return { statusCode: 404, body: 'Order Not Found' };
    }

    order.status = newStatus;
    order.description = newDescription;

    fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Order updated successfully' })
    };
};
