import { Request, Response } from 'express';
import { user } from '../models/users';

export const nome = (req: Request, res: Response) => {
    let nome: string = req.query.nome as string;
    let idade: string = req.query.idade as string;

    res.render('pages/nome', {
        nome,
        idade
    });
};

export const idadeForm = (req: Request, res: Response) => {
    res.render('pages/idade');
};

export const idadeAction = (req: Request, res: Response) => {
    let mostrarIdade: boolean = false;
    let idade: number = 0;

    if(req.body.ano) {
        let anoNascimento: number = parseInt(req.body.ano as string);
        let anoAtual: number = new Date().getFullYear();
        idade = anoAtual - anoNascimento;
        mostrarIdade = true;
    }

    res.render('pages/idade', {
        idade,
        mostrarIdade
    });
};

 export const addAge = async (req:Request, res:Response)=>{
    let id = req.params.id
  
   
    let userDataBase = await user.findAll({where:{id}});
    let userData = userDataBase[0];
    userData.age++;

    await userData.save();
   
    res.redirect('/')
 }

 export const lowerAge = async (req:Request, res:Response)=>{
    let id = req.params.id
  
    let userDataBase = await user.findAll({where:{id}});
    let userData = userDataBase[0];
    userData.age--;
    
    await userData.save();
   
    console.log(  userData);

    res.redirect('/')
 }

 export const exclude = async (req:Request, res:Response)=>{
    let id = req.params.id
  
   
    let userDataBase = await user.findAll({where:{id}});
    let userData = userDataBase[0];
   
    res.redirect('/')

    userData.destroy();
 }

 export const newUser = async (req:Request, res:Response)=>{
    let {name, age} = req.body
    
    await user.create({
        name,
        age
    })

    console.log(name, age);

    res.redirect('/')
 }