"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
const movie_1 = require("./movie");
class UserInstance extends sequelize_1.Model {
}
exports.UserInstance = UserInstance;
UserInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    firstname: {
        type: sequelize_1.DataTypes.STRING,
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
        type: sequelize_1.DataTypes.STRING,
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
        type: sequelize_1.DataTypes.STRING,
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
        type: sequelize_1.DataTypes.STRING,
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
        type: sequelize_1.DataTypes.STRING,
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
    sequelize: database_config_1.default,
    tableName: 'usertable'
});
UserInstance.hasMany(movie_1.MovieInstance, { foreignKey: 'userId', as: 'movie' });
movie_1.MovieInstance.belongsTo(UserInstance, { foreignKey: 'userId', as: 'user' });
