document.getElementById('orderLookupForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const orderCode = document.getElementById('orderCode').value;

    try {
        const response = await fetch('/.netlify/functions/getOrderDetails', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderCode })
        });

        const data = await response.json();

        if (data.status === null) {
            alert('Sipariş bulunamadı.');
            document.getElementById('orderDetails').style.display = 'none';
        } else {
            document.getElementById('orderStatus').innerText = `Durum: ${data.status}`;
            document.getElementById('orderDescription').innerText = `Açıklama: ${data.description}`;
            document.getElementById('orderDetails').style.display = 'block';
        }
    } catch (error) {
        console.error('Hata:', error);
    }
});

document.getElementById('updateOrderForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const orderCode = document.getElementById('orderCode').value;
    const newStatus = document.getElementById('newStatus').value;
    const newDescription = document.getElementById('newDescription').value;

    try {
        const response = await fetch('/.netlify/functions/updateOrder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderCode, newStatus, newDescription })
        });

        const result = await response.text();
        alert(result);
    } catch (error) {
        console.error('Hata:', error);
    }
});
