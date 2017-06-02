import charity from './charity';

export default (sequelize) => {
    return {
        Charity: charity(sequelize)
    };
};