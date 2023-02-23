import { Request, Response } from 'express';
import { sequelize } from '../instances/mysql';
import { Op } from 'sequelize'
import { Product } from '../models/Product';
import { user } from '../models/users'

export const home = async (req: Request, res: Response)=>{

    // const [usuario, created] = await user.findOrCreate({
    //     where: {name: 'Kelvem Marcelino Loubach'},
    //     defaults: {
    //         age: 65
    //     }
    // });

    // console.log(`Achamos: ${usuario.name}`);
    // console.log(`Criamos: ${created}`);

     let users = await user.findAll()

     //let list = Product.getAll();

    let expensiveList = Product.getFromPriceAfter(12);

    res.render('pages/home', {
        name: 'Bonieky',
        lastName: 'Lacerda',
       // products: list,
        expensives: expensiveList,
        frasesDoDia: [],
       users
    });
};

