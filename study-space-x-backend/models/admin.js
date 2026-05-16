export default (sequelize, DataTypes) => {
    const Admin = sequelize.define(
        "Admin",
        {
            name: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                unique: true,
            },
            password: DataTypes.STRING,
        },
        {
            tableName: "admins",
        }
    );
    return Admin;
};