module.exports = function(sequelize, DataTypes) {
  var Entry = sequelize.define("Entry", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    contents: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });

  Entry.associate = function(models) {
    // We're saying that an Entry should belong to a User
    // An Entry can't be created without an Author due to the foreign key constraint
    Entry.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Entry;
};
