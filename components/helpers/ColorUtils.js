export const generateCategoryColors = (categoriesLength) => {
  const predefinedColors = [
    '#354171',
    '#5D4C7E',
    '#4A5873',
    '#7C8AC0',
    '#9FA9E6',
    '#BCC4FF',
    '#393C43',
    '#3C324B',
    '#596080',
    '#A8B3D7',
    '#C3CCE6',
    '#D6D9FF',
    '#94A3E4',
    '#BBC4EC',
    '#494066',
    '#6F7898',
    '#B9C1E2',
    '#D0D4FF',
    '#DDE1FF',
    '#2E2441',
  ];
  const newCategoryColors = [];
  for (let i = 0; i < categoriesLength; i++) {
    if (i < predefinedColors.length) {
      // Use predefined colors if available
      newCategoryColors.push(predefinedColors[i]);
    } else {
      // Generate random color
      const randomColor = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
      const color = `#${randomColor}`;
      newCategoryColors.push(color);
    }
  }
  return newCategoryColors;
};
