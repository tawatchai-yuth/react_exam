export const insert = data => {
    return {
        type: 'INSERT',
        payload: data
    }
}

export const update = data => {
    return {
        type: 'UPDATE',
        payload: data
    }
}

export const Delete = index => {
    return {
        type: 'DELETE',
        payload: index
    }
}

export const DeleteAll = index => {
    return {
        type: 'DELETEALL',
        payload: index
    }
}

export const UpdateIndex = index => {
    return {
        type: 'UPDATE-INDEX',
        payload: index
    }
}