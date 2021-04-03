const isEmpty = (string) => {
    if(string.trim() === '') return true;
    else return false;
}

exports.validateDonateItemData = (formData) => {
    let errors = {}

    if(isEmpty(formData.itemName)){
        errors.itemName = 'Item name must not be empty!'
    }
    if(isEmpty(formData.description)){
        errors.description = 'Description must not be empty!'
    }
    // if(isEmpty(formData.imageUrl)){
    //     errors.imageUrl = 'Image must not be empty!'
    // }
    if(formData.imageUrl === undefined){
        errors.imageUrl = 'Image must not be empty!'
    }
    
    return {
        errors,
        valid : Object.keys(errors).length === 0 ?true : false
    }
    
}


