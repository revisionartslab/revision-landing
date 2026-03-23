
const STREAM_RECORDS = [
    { id: '1', tags: ['Sculpture'] },
    { id: '2', tags: ['twins'] },
    { id: '3', tags: ['emotion', 'landscape'] },
    { id: '4', tags: ['sculpture'] },
    { id: '5', tags: ['character'] },
    { id: '6', tags: ['fashion'] }
];

function getDynamicCategories() {
    const tagsSet = new Set();
    STREAM_RECORDS.forEach(item => {
        if (item.tags && Array.isArray(item.tags)) {
            item.tags.forEach(tag => {
                if (tag) tagsSet.add(tag.trim().toLowerCase());
            });
        }
    });
    
    const sortedTags = Array.from(tagsSet).sort((a, b) => 
        a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
    ).map(tag => ({
        id: tag,
        label: tag.toUpperCase()
    }));

    return [{ id: 'all', label: 'ALL' }, ...sortedTags];
}

console.log(JSON.stringify(getDynamicCategories(), null, 2));
