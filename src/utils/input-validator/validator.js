export const validateInput = (schema, fields) => {
    const { error } = schema.validate(fields)

    if (error) return  error.message

    return null
}