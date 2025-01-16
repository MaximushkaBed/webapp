// Функция для получения данных о товаре из локального файла
async function fetchProductData() {
    try {
        const response = await fetch('data.json'); // Путь к вашему локальному файлу
        if (!response.ok) {
            throw new Error('Ошибка получения данных');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка при запросе:', error);
        throw error;
    }
}

// Функция для заполнения полей формы полученными данными
function fillFormFields(data) {
    document.querySelector('.product-title').textContent = data.productTitle || '';
    document.querySelector('.breadcrumb').textContent = data.breadcrumb || '';
    document.getElementById('itemPrice').value = data.price || '';
    document.getElementById('itemWeight').value = data.weight || '';
    document.getElementById('kaspiCommission').value = data.kaspiCommission || '';

    // Запускаем перерасчет стоимости доставки
    const price = parseFloat(data.price) || 0;
    const weight = parseFloat(data.weight) || 0;
    const deliveryType = document.getElementById('deliveryType').value;
    const deliveryCost = calculateDeliveryPrice(price, weight, deliveryType);
    document.getElementById('deliveryCost').value = deliveryCost;

    // Запускаем перерасчет
    calculate();
}

// Функция для получения параметров из URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        productTitle: params.get('productTitle') || '',
        breadcrumb: params.get('breadcrumb') || '',
        price: params.get('price') || '',
        weight: params.get('weight') || '',
        kaspiCommission: params.get('kaspiCommission') || ''
    };
}

// Функция инициализации автозаполнения
function initAutoFill() {
    const params = getQueryParams();
    fillFormFields(params);
}

// Вызываем инициализацию при загрузке страницы
document.addEventListener('DOMContentLoaded', initAutoFill);

export {
    fetchProductData,
    fillFormFields,
    initAutoFill
}; 
