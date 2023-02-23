
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface userInstance extends Model {
    id: number;
    name: string;
    age: number;
};

 export const user = sequelize.define<userInstance>('user', {
    
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },

    name: {
        type: DataTypes.STRING,
        get () {
            return this.getDataValue('name').toUpperCase();
        }
    },

    age: {
        type: DataTypes.NUMBER,
        defaultValue: 18 
    },
 },

 {
    tableName: 'users',
    timestamps: false
}
 
 
 
 );
