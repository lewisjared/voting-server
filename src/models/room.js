export default function (sequelize, DataTypes) {
  return sequelize.define('Room', {
    name: DataTypes.STRING,
    link: {
      type: DataTypes.STRING,
      unique: true
    },
    createdBy: DataTypes.STRING
  }, {
    tableName: 'rooms'
  });
};