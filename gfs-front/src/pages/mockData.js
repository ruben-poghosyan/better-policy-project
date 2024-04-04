const generateMockData = () => {
  const mockData = [];
  for (let i = 1; i <= 20; i++) {
    mockData.push({
      name: `Student ${i}`,
      title: `Title ${i}`,
      level: `Level ${i}`,
      image: `https://via.placeholder.com/150`,
    });
  }
  return mockData;
};

const chunkArray = (arr, size) => {
  const chunkedArr = [];
  for (let i = 0; i < arr.length; i += size) {
    chunkedArr.push(arr.slice(i, i + size));
  }
  return chunkedArr;
};

const mockData = generateMockData();
const chunkedMockData = chunkArray(mockData, 9); // Chunk the mock data into smaller arrays

export default chunkedMockData;