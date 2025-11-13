let lastHoveredCircle = null;

window.initializeSortableJs = function () {
    try {
        initializeSourcePalette();
        initializeTargetPalette();
    } catch (exception) {
        console.error("initializeSortableJs => Exception:", exception);
    }
}

function initializeSourcePalette() {
    try {
        const sourcePalette = document.getElementById('draggable-code-pegs');

        Sortable.create(sourcePalette, {
            group: {
                name: 'circles',
                pull: 'clone',
                put: false
            },
            sort: false,
            animation: 150,
            onMove: function (evt) {
                onMove(evt, sourcePalette);
            }
        });
    } catch (exception) {
        console.error("initializeSourcePalette => Exception:", exception);
    }
}

function initializeTargetPalette() {
    try {
        document.querySelectorAll('.set-code-pegs-placeholder').forEach(slot => {
            Sortable.create(slot, {
                group: {
                    name: 'circles',
                    pull: true,
                    put: true
                },
                sort: false,
                animation: 150,
                onAdd: function (evt) {
                    onAdd(evt, slot);
                },
                onMove: function (evt) {
                    onMove(evt, slot);
                },
                onRemove: function (evt) {
                    onRemove(evt, slot);
                }
            });
        });
    } catch (exception) {
        console.error("initializeTargetPalette => Exception:", exception);
    }
}

function onAdd(evt, slot) {
    try {
        const itemToInsert = evt.item;

        slot.replaceChildren();
        slot.classList.remove('empty');
        slot.classList.add('filled');
        
        itemToInsert.classList.add('dropped');
        slot.appendChild(itemToInsert);
    } catch (exception) {
        console.error("onAdd => Exception:", exception);
    }
}

function onMove(evt, slot) {
    try {
        if (lastHoveredCircle) {
            lastHoveredCircle.style.display = '';
            lastHoveredCircle = null;
        }

        const target = evt.to;

        const circle = target.querySelector('.dropped');

        if (circle) {
            lastHoveredCircle = circle;
            circle.style.display = 'none';
        }
    } catch (exception) {
        console.error("onMove => Exception:", exception);
    }
}

function onRemove(evt, slot) {
    try {
        slot.classList.remove('filled');
        slot.classList.add('empty');
    } catch (exception) {
        console.error("onRemove => Exception:", exception);
    }
}

function getDroppedColors() {
    const colors = [];

    try {
        const placeholders = document.querySelectorAll('.set-code-pegs-placeholder');
    
        placeholders.forEach(ph => {
            const filled = ph.querySelector('.dropped');
            if (filled) {
                colors.push(filled.style.backgroundColor);
            } else {
                colors.push(null);
            }
        });
    } catch (exception) {
        console.error("getDroppedColors => Exception:", exception);
    }

    return colors;
}

function resetDroppedColors() {
    try {
        document.querySelectorAll('.set-code-pegs-placeholder').forEach(slot => {
            slot.replaceChildren();
            slot.classList.remove('filled');
            slot.classList.add('empty');
        });
    } catch (exception) {
        console.error("resetDroppedColors => Exception:", exception);
    }
}
