module.exports = (sequelize, DataTypes) => {

  const Tags = sequelize.define("Tags", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Tags.associate = (models) => {
    Tags.belongsToMany(models.Items, { through: 'ItemTags' });
  }

  return Tags;
};