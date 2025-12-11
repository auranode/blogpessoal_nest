import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from './../../usuario/services/usuario.service';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Bcrypt } from '../bcrypt/bcrypt';
import { UsuarioLogin } from '../entities/usuario-login.dto';


@Injectable()
export class AuthService{
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService,
        private bcrypt: Bcrypt
    ){ }

    async validateUser(username: string, password: string): Promise<any>{

        const buscaUsuario = await this.usuarioService.findByUsuario(username)

        if(!buscaUsuario)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND)

        const matchPassword = await this.bcrypt.compararSenhas(password, buscaUsuario.senha)

        if(buscaUsuario && matchPassword){
            const { senha, ...resposta } = buscaUsuario
            return resposta
        }

        return null

    }

    async login(usuarioLogin: UsuarioLogin){
        
        const usuario = await this.validateUser(
            usuarioLogin.usuario, 
            usuarioLogin.senha
        );

        if(!usuario){
            throw new HttpException('Usuário e/ou Senha Inválidos!', HttpStatus.UNAUTHORIZED);
        }

        const payload = { sub: usuario.usuario, id: usuario.id }

        return{
            id: usuario.id,
            nome: usuario.nome,
            usuario: usuario.usuario,
            senha: '',
            foto: usuario.foto,
            token: `Bearer ${this.jwtService.sign(payload)}`,
        }

    }
}