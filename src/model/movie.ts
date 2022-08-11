import { DataTypes, Model } from "sequelize";
import db from '../config/database.config'

interface MovieAttributes{
    id: string;
    title: string;
    description: string;
    imageurl: string;
    price: string;
    userId: string

}

export class MovieInstance extends Model<MovieAttributes>{ }

MovieInstance.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull:false 
    },
    title: {
        type:DataTypes.STRING,
        allowNull:false
    },
    description: {
        type: DataTypes.STRING,
            allowNull: false,
    },
    imageurl: {
        type: DataTypes.STRING,
            allowNull:true
    },
    price: {
        type:DataTypes.STRING,
        allowNull:false
    },
    userId: {
        type:DataTypes.STRING
    }

}, {
    sequelize: db,
    tableName: 'movie'
})