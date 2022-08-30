module.exports = (sequelize, DataTypes) => {
  const Collection = sequelize.define("Collection", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    theme: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  Collection.associate = (models) => {
    Collection.hasMany(models.FieldsType, {
      onDelete: "cascade",
    });
    Collection.hasMany(models.Items, {
      onDelete: "cascade",
    });
  }

  return Collection;
};
