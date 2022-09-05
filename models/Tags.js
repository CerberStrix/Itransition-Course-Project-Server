module.exports = (sequelize, DataTypes) => {

  const Tags = sequelize.define("Tags", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
  }, {
    timestamps: false
  });

  Tags.associate = (models) => {
    Tags.belongsToMany(models.Items, { through: { model: 'ItemTags', unique: false, foreignKey: "items", }});
  }

  return Tags;
};