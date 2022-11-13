export const select = (selected, options) => {
    return options
        .fn(this)
        .replace(
            new RegExp(' value="' + selected + '"'),
            '$& selected="selected"'
        )
        .replace(
            new RegExp('>' + selected + '</option>'),
            ' selected="selected"$&'
        )
}

export const match = (number) => {
    if(number === '1'){
        return 'Multiply';
    }
    if(number === '2'){
        return "Divide";
    }
}