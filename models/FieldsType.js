module.exports = (sequelize, DataTypes) => {

  const FieldsType = sequelize.define("FieldsType", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
    }
  }, {
    timestamps: false
  });

  return FieldsType;
};