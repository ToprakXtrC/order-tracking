const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    const requestBody = JSON.parse(event.body);
    const orderCode = requestBody.orderCode;

    const ordersFilePath = path.resolve(__dirname, 'orders.json');
    const orders = JSON.parse(fs.readFileSync(ordersFilePath, 'utf8'));

    const order = orders.find(order => order.orderCode === orderCode);

    if (!order) {
        return {
            statusCode: 200,
            body: JSON.stringify({ status: "Geçersiz sipariş kodu." })
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ status: order.status })
    };
};
