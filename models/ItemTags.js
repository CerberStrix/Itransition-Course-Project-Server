module.exports = (sequelize, DataTypes) => {

  const ItemTags = sequelize.define("ItemTags", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      foreignKey: true,
  
    }, 
    TagId: {
      type: DataTypes.UUID,
      allowNull: false,
      foreignKey: true,
      references: {
        model: 'Tags',
        key: 'idTags'
      }
    },
    ItemId: {
      type: DataTypes.UUID,
      allowNull: false,
      foreignKey: true,
      references: {
        model: 'Items',
        key: 'idItems'
      }
    },
    
  }, {
    timestamps: false
  });


  return ItemTags;
};