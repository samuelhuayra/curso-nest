import { Test } from "@nestjs/testing";
import { UserRepository } from "./user.repository";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { User } from "./user.entity";
import * as bcrypt from 'bcryptjs';

const mockCredentialsDto = { username: 'testUsername', password:'testPassword'}

describe('UserRepository',()=>{
    let userRepository;
    
    beforeEach(async()=>{
      const module = await Test.createTestingModule({
          providers:[
              UserRepository
          ]
      }).compile();

      userRepository = await module.get<UserRepository>(UserRepository);
    })

    describe('singUp',()=>{
        let save
        beforeEach(()=>{
            save = jest.fn()
            userRepository.create = jest.fn().mockReturnValue({save})
        })

        it('successtully sign up the user',()=>{
            save.mockReturnValue(undefined)
            expect(userRepository.singUp(mockCredentialsDto)).resolves.not.toThrow()
        })
        it('throws a conflic exception as username already exists',()=>{
            save.mockRejectedValue({code:'23505'})
            expect(userRepository.singUp(mockCredentialsDto)).rejects.toThrow(ConflictException)
        })
        it('throws a internal error exception',()=>{
            save.mockRejectedValue({code:'123123'})
            expect(userRepository.singUp(mockCredentialsDto)).rejects.toThrow(InternalServerErrorException)
        })
    })
    describe('validateUserPassword',()=>{
        let user;
        beforeEach(()=>{
            userRepository.findOne = jest.fn()
            user = new User()
            user.username = 'testUsername'
            user.validatePassword = jest.fn()
        })

        it('returns the username as validation is succcessful',async ()=>{
            userRepository.findOne.mockResolvedValue(user)
            user.validatePassword.mockResolvedValue(true)
            const result = await userRepository.validateUserPassword(mockCredentialsDto)
            expect(result).toEqual('testUsername')
        })
        it('returns null as user cannot be found',async()=>{
            userRepository.findOne.mockResolvedValue(null)
            const result = await userRepository.validateUserPassword(mockCredentialsDto)
            expect(user.validatePassword).not.toHaveBeenCalled()
            expect(result).toBeNull()
        })
        it('returns null as password is invalid',async()=>{
            userRepository.findOne.mockResolvedValue(user)
            user.validatePassword.mockResolvedValue(false)
            const result = await userRepository.validateUserPassword(mockCredentialsDto)
            expect(user.validatePassword).toHaveBeenCalled()
            expect(result).toBeNull()
        })
    })
    describe('validateUserPassword',()=>{
        it('calls bcryptjs.hash to generate a hash',async()=>{
            bcrypt.hash = jest.fn().mockResolvedValue('testHash')
            expect(bcrypt.hash).not.toHaveBeenCalled()
            const result = await userRepository.hashPassword('testPassword','testSalt')
            expect(bcrypt.hash).toHaveBeenCalled()
            expect(result).toEqual('testHash')
            // expect()
        })
    })
})