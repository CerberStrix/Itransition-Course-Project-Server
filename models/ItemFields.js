module.exports = (sequelize, DataTypes) => {

  const ItemFields = sequelize.define("ItemFields", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
    }
  }, {
    timestamps: false
  });
  
  return ItemFields;
};