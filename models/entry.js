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
    },
    //This is a placeholder, until we have a user table to reference here.
    UserId: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  });

  Entry.associate = function(models) {
    // We're saying that an Entry should belong to a User
    // An Entry can't be created without an Author due to the foreign key constraint
    Entry.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Entry;
};
