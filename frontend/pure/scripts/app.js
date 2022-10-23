const dataTypesForTable = ['serial', 'first name', 'last name', 'ip address', 'trash'];
console.log('script loaded!')

let mainContainer = document.createElement('div');
mainContainer.className = 'container';

mainContainer.appendChild(logo('getx'))
mainContainer.appendChild(panelBtnNewRow());
mainContainer.appendChild(defaultRows());

document.body.appendChild(mainContainer);

function defaultRows() {
    let defaultRowsBlock = document.createElement('div');
    defaultRowsBlock.className = 'rows_block';
    defaultRowsBlock.appendChild(newRow('id', 'serial'));
    defaultRowsBlock.appendChild(newRow('first_name', 'first name'));
    defaultRowsBlock.appendChild(newRow('last_name', 'last name'));
    defaultRowsBlock.appendChild(newRow('ip_address', 'ip address'));
    return defaultRowsBlock;
}

function newRow(stringForColumnName, selectedType) {
    let newRow = document.createElement('div');
    newRow.className = 'row';

    // field column name
    let fldColumnName = document.createElement('input');
    fldColumnName.id = 'fld_column_name';
    fldColumnName.className = 'entry_field';
    fldColumnName.type = 'text';
    fldColumnName.value = stringForColumnName;
    let reg = /[а-яА-ЯёЁ]/g;
    let hasEnter = true;
    fldColumnName.addEventListener('input', ev => {
        ev.target.value = ev.target.value.replace(reg, '');
        if (ev.target.value === '') {
            fldColumnName.className = 'entry_field empty';
            fldColumnName.placeholder = 'pls enter'
        } else {
            fldColumnName.className = 'entry_field';
        }
    })

    // dropdown data type
    let drdDataType = document.createElement('select');
    drdDataType.id = 'drd_data_type';
    drdDataType.className = 'dropdown_list';
    dataTypesForTable.forEach(dataType => {
        let opt = document.createElement('option');
        opt.value = dataType;
        opt.text = dataType;
        if (dataType === selectedType) {
            opt.selected = true;
        }
        drdDataType.appendChild(opt);
    })

    // field column name
    let fldBlankPercent = document.createElement('input');
    fldBlankPercent.id = 'fld_blank_percent';
    fldBlankPercent.className = 'entry_field_center';
    fldBlankPercent.type = 'text';
    fldBlankPercent.value = '0%'
    fldBlankPercent.maxLength = 4;
    fldBlankPercent.addEventListener('input', ev => {
        // TODO!
        if (!ev.target.value.includes('%')) {
            ev.target.value = ev.target.value + '%';
        }
    })

    // btn pattern
    let btnPattern = document.createElement('input');
    btnPattern.id = 'btn_pattern';
    btnPattern.className = 'button';
    btnPattern.type = 'button';
    btnPattern.value = 'pattern';
    btnPattern.disabled = true;

    // btn remove
    let btnRemoveRow = document.createElement('input');
    btnRemoveRow.id = 'btn_remove';
    btnRemoveRow.className = 'button';
    btnRemoveRow.type = 'button';
    btnRemoveRow.value = 'remove';
    btnRemoveRow.onclick = () => {
        setTimeout(() => {
            console.log('remove', btnRemoveRow.parentNode);
            let currentRow = btnRemoveRow.parentNode;
            let rowsBlock = document.getElementsByClassName('rows_block');
            rowsBlock[0].removeChild(currentRow);
            if (rowsBlock[0].getElementsByClassName('row').length === 0) {
                let messageBlock = document.createElement('input');
                messageBlock.className = 'entry_field message';
                messageBlock.type = 'text';
                messageBlock.disabled = true;
                messageBlock.value = 'please add rows!';
                rowsBlock[0].appendChild(messageBlock);
            }
        }, 0);
    }

    newRow.appendChild(fldColumnName);
    newRow.appendChild(drdDataType);
    newRow.appendChild(fldBlankPercent);
    newRow.appendChild(btnPattern);
    newRow.appendChild(btnRemoveRow);

    return newRow;
}

function panelBtnNewRow() {
    let panelForBtnNewRow = document.createElement('div');
    panelForBtnNewRow.className = 'new_row_btn';

    // btn new row
    let btnNewRow = document.createElement('input');
    btnNewRow.className = 'button';
    btnNewRow.type = 'button';
    btnNewRow.value = 'new row';
    btnNewRow.onclick = () => {
        setTimeout(() => {
            let row = newRow('custom', 'trash');
            let rowsBlock = document.getElementsByClassName('rows_block');
            if (rowsBlock[0].getElementsByClassName('entry_field message').length > 0) {
                rowsBlock[0]
                    .removeChild(rowsBlock[0]
                        .getElementsByClassName('entry_field message').item(0));
            }
            rowsBlock[0].appendChild(row);
        }, 0);
    }

    panelForBtnNewRow.appendChild(btnNewRow);
    return panelForBtnNewRow;
}

function logo(logoStr) {
    let panelLogo = document.createElement('div');
    panelLogo.className = 'logo_block'
    let spanLogoStr = document.createElement('span');
    spanLogoStr.textContent = logoStr;
    panelLogo.appendChild(spanLogoStr);
    return panelLogo;
}