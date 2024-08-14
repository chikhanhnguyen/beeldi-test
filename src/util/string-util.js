export const getIdAtLastOfUrlWithSeparator = (str, separator = '+') => {
    const index = !!str ? str.lastIndexOf(separator) : -1;
    if (index > -1) {
        return str.substring(str.lastIndexOf(separator) + 1, str.length);
    } else {
        return '';
    }
};

export const getLinkFromCategory = (category) => {
    return encodeURI(`/category/${category.normalized_name.replace(/\//g, '-').replace(/ /g, '-')}+${category.id}`);
};

export const getLinkFromEquipment = (equipment) => {
    if (equipment.key) {
        return encodeURI(`/equipment/${equipment.name.replace(/\//g, '-').replace(/ /g, '-')}+${equipment.key}`);
    }
    return '/equipment/';
};
