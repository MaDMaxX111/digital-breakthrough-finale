export const getFieldOption = (fieldName, form) => {

    const { isFieldTouched } = form

    if (isFieldTouched(fieldName)) {
        return null
    }

    return {
        validateStatus: '',
        help: ''
    }
}

export const formHasErrors = fieldsError => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
};
