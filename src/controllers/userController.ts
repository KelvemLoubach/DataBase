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
  
   
    let userData = await user.findOne({
        where: {id}
    })
    if(userData){
    userData.age++;
    await userData.save();
    }

    res.redirect('/')
 }

 export const lowerAge = async (req:Request, res:Response)=>{
    let id = req.params.id
  
    let userData = await user.findOne({
        where:{id}
    })

    if(userData){
    userData.age--;
    await userData.save();
    }
    
    console.log(  userData);

    res.redirect('/')
 }

 export const exclude = async (req:Request, res:Response)=>{
    let id = req.params.id
  
    let userData= await user.findOne({
        where: {id},
    });

    if(userData){
        userData.destroy();
    }else{
        console.log('Usuário não encontrado!')
    };
   
    res.redirect('/')

 }

 export const newUser = async (req:Request, res:Response)=>{
    let {name, age} = req.body;
    
    console.log( name)
    let nameLower = name.toUpperCase();
    console.log(nameLower);

    await user.create({
        name: nameLower,
        age
    })

    res.redirect('/')
 }