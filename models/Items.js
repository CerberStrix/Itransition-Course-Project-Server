module.exports = (sequelize, DataTypes) => {

  const Items = sequelize.define("Items", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Items.associate = (models) => {
    Items.hasMany(models.ItemFields, {
      onDelete: "cascade",
    });
    Items.belongsToMany(models.Tags, { through: { model: 'ItemTags', unique: false, foreignKey: "items" }});
  }


  return Items;
};