import { DataTypes } from "sequelize";
import { sequelize } from "../../config"

export const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
});

const creteUser = async () => {
  try {
    const user = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456'
    });
    console.log(user)
  } catch (err) { console.log(err) }
}
console.log("fdlf")
creteUser()