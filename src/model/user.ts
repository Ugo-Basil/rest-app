import { DataTypes, Model } from "sequelize";
import db from '../config/database.config';
import { MovieInstance } from "./movie";

interface UsersAttributes {
    id: string;
    firstname:string;
    lastname: string;
    email: string;
    phonenumber: string;
    password:string
}

export class UserInstance extends Model<UsersAttributes>{ }

UserInstance.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'firstname is required'
            },
            notEmpty: {
                msg: 'Please enter your firstname'
            }
        }
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'lastname is required'
            },
            notEmpty: {
                msg: 'Please enter your lastname'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'email is required'
            },
            isEmail: {
                msg: 'Please enter your email'
            }
        }
    },
    phonenumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'phone number is required'
            },
            notEmpty: {
                msg: 'Please enter a valid phone number'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'lastname is required'
            },
            notEmpty: {
                msg: 'Please enter your lastname'
            }
        }
    },
   
}, {
    sequelize: db,
    tableName: 'usertable'
});

UserInstance.hasMany(MovieInstance, {foreignKey:'userId', as:'movie'})

MovieInstance.belongsTo(UserInstance,{foreignKey:'userId', as:'user'})