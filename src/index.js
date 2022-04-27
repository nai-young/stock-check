/**
 * DO NOT MODIFY, I REPEAT, DO NOT MODIFY
 **/

/**
 * Determines whether a single product is in stock
 * @param {string} product id
 * @returns {Promise} promise that resolves or rejects depending on whether request succeeds
 *
 */
function stockCheck(id) {
	const firstCharacter = id.charAt(0);
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (firstCharacter === '9') {
				reject({ id, code: 'internal-server-error' });
			} else {
				resolve({ id, outOfStock: firstCharacter === '8' });
			}
		}, 200);
	});
}
/**
 * END DO NOT MODIFY
 **/

/**
 * Identifies out of stock items
 * @param {String|String<>} product ids - a list of product Ids to verify whether they are in stock
 * @returns {Promise} resolve/reject to out of stock products or error code
 **/

function outOfStockChecker(...id) {
	const regex = /^[\d]{4}(-[\d]{4}){3}$/gm;
	const unique = [...new Set(id)];
	const outOfStock = [], invalid = [];
	const result = { outOfStock };

	const setError = (code = '', product = '') => {
		invalid.push(product);
		result.error = { code, invalid };
	};

	Promise.all(
		unique?.map((product) => {
			regex.test(product)
				? stockCheck(product)
						.then((res) => outOfStock.push(res.id))
						.catch((err) => setError(err.code, product))
				: setError('invalid-format', product);
		})
	);

	return result;
}

outOfStockChecker('8888-8888-8888-8888', '1111', 'aaaa-1111-1111-1111');

module.exports = outOfStockChecker;
