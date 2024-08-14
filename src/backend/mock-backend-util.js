import axios from 'axios';
import Papa from 'papaparse';

// mock Axios response
export const mockAxios = (data) => {
    return new Promise((resolve) => {
        resolve({
            data: data,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
            request: {},
        });
    });
};

// read from csv, sort by alphabetical order on the name
export const getAllEquiments = async () => {
    let equipments = await csvToJson('/data/equipments.csv');
    // alphabetical order
    return equipments.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
        }
        return 0;
    });
};

// read from csv
export const getAllCheckpoints = async () => {
    return await csvToJson('/data/checkpoints.csv');
};

// to get all equipments
export const process_list_equipments = (listEquipments, pageNumber, pageSize) => {
    const res = listEquipments.slice((pageNumber - 1) * pageSize, pageNumber * pageSize).map((item) => process_equipment(item));
    return {
        data: res,
        count: listEquipments.length,
    };
};

// to get equipment by key
export const process_single_equiment = (allEquipments, allCheckpoints, eKey) => {
    const equipment = allEquipments.find((item) => item.key === eKey);
    const checkpoints = allCheckpoints.filter((item) => item.equipmentKey === eKey);

    // Sort the list based on the count of non-null values
    const sortedCheckpoints = checkpoints.sort((a, b) => {
        const countA = countNonNullValues(a);
        const countB = countNonNullValues(b);
        return countB - countA;
    });
    if (equipment) {
        return process_equipment({
            ...equipment,
            checkpoints: sortedCheckpoints.map((item) => process_checkpoint(item)),
        });
    } else {
        return null;
    }
};

// to get search results
export const process_filter_equipments = (allEquipments, queryStr, filters, pageNumber, pageSize) => {
    if (!queryStr) {
        return {
            data: [],
            count: 0,
        };
    }
    let equipments = [];
    const queryTokens = tokenize(queryStr);
    for (let i in allEquipments) {
        let equipment = allEquipments[i];
        if (equipmentMatched(equipment, queryTokens, filters)) {
            equipments.push(equipment);
        }
    }
    return process_list_equipments(equipments, pageNumber, pageSize);
};

// verify if an equipment is matched with the query and filters
const equipmentMatched = (equipment, queryTokens, filters) => {
    let okEachToken = false;
    for (let qi in queryTokens) {
        okEachToken = false;
        for (let fi in filters) {
            if (!!equipment[filters[fi]] && equipment[filters[fi]].toLowerCase().includes(queryTokens[qi].toLowerCase())) {
                okEachToken = true;
                break;
            }
        }
        if (!okEachToken) {
            return false;
        }
    }
    return true;
};

// tokenize and normalize the search query
// for example: 'CompTeur gAz' => ['compteur', 'gaz']
const tokenize = (query) => {
    let tokens = [];
    if (!query || query.length === 0) return tokens;

    let sb = '';

    for (let c of query) {
        // remove all special char and reduce the space
        if (!isPunctuation(c) && c !== ' ') {
            sb += c.toLowerCase();
        } else {
            if (sb.length > 0) {
                tokens.push(sb);
                sb = '';
            }
        }
    }

    if (sb.length > 0) {
        tokens.push(sb);
    }

    return tokens;
};

// check if a char is special char
function isPunctuation(c) {
    return /[.,\/#!$%\^&\*;:{}=\-_`~()]/.test(c);
}

// function to order the checkpoint
const countNonNullValues = (checkpoint) => {
    return Object.values(checkpoint).filter((value) => !!value).length;
};

// read csv file and convert result to json
const csvToJson = (csvPath) => {
    return new Promise((resolve, reject) => {
        axios
            .get(csvPath)
            .then((response) => {
                Papa.parse(response.data, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (result) => {
                        resolve(result.data);
                    },
                    error: (error) => {
                        reject(error);
                    },
                });
            })
            .catch((error) => {
                reject(error);
            });
    });
};

// default photo links do not work, so just mock a random photo here
const process_equipment = (data) => {
    return {
        ...data,
        photo: 'https://thediscerningcat.com/wp-content/uploads/2020/12/scottish-fold-cat-2.jpg',
    };
};

// default photo links do not work, so just mock a random photo here
const process_checkpoint = (data) => {
    return {
        ...data,
        photo: data.photo ? 'https://www.creativefabrica.com/wp-content/uploads/2023/01/28/cat-reading-a-book-Graphics-59220529-2-580x363.png' : data.photo,
    };
};
