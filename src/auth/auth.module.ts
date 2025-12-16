import { forwardRef, Module } from "@nestjs/common";
import { Bcrypt } from "./bcrypt/bcrypt";
import { UsuarioModule } from "../usuario/usuario.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
// import { jwtConstants } from "./constants/constants"; // Removido
import { AuthService } from "./services/auth.service";
import { AuthController } from "./controllers/auth.controller";
import { LocalStrategy } from "./strategy/local.strategy";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
    imports: [
        forwardRef(() => UsuarioModule),
        PassportModule,
        JwtModule.register({
            secret: '37eb3d74e44561d2b9ec3e40da179f9e91571b7f350aee31cfee06b481f146fe', 
            signOptions: {expiresIn: '1h'},
        })

    ],
    controllers: [AuthController],
    providers: [Bcrypt, AuthService, LocalStrategy, JwtStrategy],
    exports: [Bcrypt],
})
export class AuthModule {};