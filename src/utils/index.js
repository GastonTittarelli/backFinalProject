import bcrypt from 'bcrypt';

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

export const validatePassword = (user, password) =>{
    return true;
}

export const validateProduct = product => {
    let result = true;
    if (!product.title || !product.description || !product.code || !product.price || !product.stock  || !product.category) {
        result = false;
    }
    return result;
}