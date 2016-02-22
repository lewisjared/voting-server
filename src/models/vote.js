export default function (sequelize, DataTypes) {
  return sequelize.define('Vote', {
    user: DataTypes.STRING,
    room: DataTypes.STRING,
    entry: DataTypes.STRING
  }, {
    tableName: 'votes'
  });
};