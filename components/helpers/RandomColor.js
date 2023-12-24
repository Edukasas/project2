export const generateCategoryColors = (categoriesLength) => {
    const newCategoryColors = [];
    for (let i = 0; i < categoriesLength; i++) {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
      const color = `#${randomColor}`;
      newCategoryColors.push(color);
    }
    return newCategoryColors;
  };