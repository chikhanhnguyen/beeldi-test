const rgba = (color, alpha) => {
    const hex = color.slice(1);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const bgColor = '#F0F0F0';
export const primaryColor = '#000000';
export const secondaryColor = '#2a9d8f';
export const thirdColor = '#000000';
export const fourthColor = '#536471';
export const blackColor = '#242424';
export const colorDivider = '#536471';

const colorApp = {
    bgColor,
    primaryColor,
    secondaryColor,
    thirdColor,
    fourthColor,
};

export default colorApp;
