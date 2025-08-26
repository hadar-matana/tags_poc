// Generate dynamic mock image URLs based on entity data
function generateMockImageUrl(exclusiveId) {
  const { dataStore = 'default', tableId = 'unknown' } = exclusiveId;
  
  return `https://picsum.photos/400/300?random=${dataStore}-${tableId}`;
}

module.exports = {
  generateMockImageUrl
};
