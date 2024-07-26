exports.handler = async function(event, context) {
    try {
        const requestBody = JSON.parse(event.body);
        const orderCode = requestBody.orderCode;

        const ordersFilePath = path.resolve(__dirname, '../../orders.json');
        const orders = JSON.parse(fs.readFileSync(ordersFilePath, 'utf8'));

        const order = orders.find(order => order.orderCode === orderCode);

        if (!order) {
            return {
                statusCode: 200,
                body: JSON.stringify({ status: null, description: null })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ status: order.status, description: order.description })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Sunucu tarafında bir hata oluştu.' })
        };
    }
};
