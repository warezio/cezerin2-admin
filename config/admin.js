// config used by dashboard client side only
module.exports = {
	// dashboard UI language
	language: 'en',
	apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3001/api/v1',
	apiWebSocketUrl: process.env.API_WEB_SOCKET_URL || 'ws://localhost:3001',
	assetsBaseURL: process.env.ASSETS_BASE_URL || 'http://localhost',
	developerMode: true
};
