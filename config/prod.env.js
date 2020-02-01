'use strict'
module.exports = {
  NODE_ENV: '"production"',
  ENV_CONFIG: '"prod"',
  BASE_API: '"http://127.0.0.1:8080/case-platform"', // case-web
  ENCRYPTED_REQUEST: false,
	RSA_PUB_KEY: () => {
		return `-----BEGIN PUBLIC KEY-----
		MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCc1kz46sAZFvP0oVGQwP3pEmeUrkARukYG8uPH
		kLdEP/pZ2BOvyl3sMbx7o6HPXfTu47sCQBOJzvET1vAne+DedBO7YfPlhM6lyXBpQ9sy0RJrJfz6
		pRuj2WeXcpcmwSgMmnICtPpDdkM4fUQrKU30B33Krnjzn6/6ubl19zzuYwIDAQAB
		-----END PUBLIC KEY-----`
	}
}

