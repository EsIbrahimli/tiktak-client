const axios = require('./node_modules/axios');
(async() => {
  try {
    const base = 'https://api.sarkhanrahimli.dev/api/tiktak';
    const phone = '+994506498260';
    const password = 'Test12345';
    const login = await axios.post(`${base}/auth/login`, { phone, password });
    const token = login.data?.data?.tokens?.access_token;
    console.log('token', token ? 'OK' : 'NO');
    if (!token) return;
    const inst = axios.create({ baseURL: base, headers: { Authorization: `Bearer ${token}` } });
    const productsResp = await inst.get('/products');
    const products = (productsResp.data?.data ?? productsResp.data);
    console.log('products count', Array.isArray(products) ? products.length : 'unknown');
    const first = Array.isArray(products) && products.length > 0 ? products[0] : null;
    console.log('first product', first?.id, first?.title || first?.name);
    if (!first?.id) return;

    try {
      const add = await inst.post(`/basket/${first.id}/add`);
      console.log('add status', add.status, add.data);
    } catch (err) {
      console.error('add err', err.response?.status, err.response?.data);
    }

    const basket = await inst.get('/basket');
    console.log('basket', basket.status, basket.data);
  } catch (err) {
    console.error('error', err.response?.data ?? err.message);
  }
})();
