exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const requestBody = JSON.parse(event.body);
        const orderCode = requestBody.orderCode;
        const newStatus = requestBody.newStatus;
        const newDescription = requestBody.newDescription;

        const ordersFilePath = path.resolve(__dirname, '../../orders.json');
        const orders = JSON.parse(fs.readFileSync(ordersFilePath, 'utf8'));

        const orderIndex = orders.findIndex(order => order.orderCode === orderCode);

        if (orderIndex === -1) {
            return { statusCode: 404, body: 'Order Not Found' };
        }

        orders[orderIndex].status = newStatus;
        orders[orderIndex].description = newDescription;

        fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));

        return { statusCode: 200, body: 'Order Updated Successfully' };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Sunucu tarafında bir hata oluştu.' })
        };
    }
};
