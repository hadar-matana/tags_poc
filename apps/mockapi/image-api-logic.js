// Generate dynamic mock image URLs based on entity data
function generateMockImageUrl(exclusiveId) {
  const { dataStore = 'default', tableId = 'unknown' } = exclusiveId;
  
  // Generate different sizes based on the entity ID
  const hash = (dataStore + tableId).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const width = 300 + (hash % 5) * 100; // 300, 400, 500, 600, 700
  const height = 200 + (hash % 4) * 50; // 200, 250, 300, 350
  
  return `https://picsum.photos/${width}/${height}?random=${dataStore}-${tableId}`;
}

module.exports = {
  generateMockImageUrl
};
