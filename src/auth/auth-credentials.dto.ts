import { IsString, MinLength, MaxLength, Matches } from "class-validator";

export class AuthCredentialsDto{
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username:string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, //1UppercaseLetter1LowercaseLetter1number1character
    {message:'password too weak'})//message by default
    password:string;
}