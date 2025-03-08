import { clientCredentials } from '../../../utils/client';

const endpoint = clientCredentials.databaseurl;

const deleteProduct = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export default deleteProduct;
