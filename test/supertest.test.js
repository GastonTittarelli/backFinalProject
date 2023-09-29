import chai from "chai";
import supertest from "supertest";
import { faker } from "@faker-js/faker";


const expect = chai.expect
const requester = supertest('http://127.0.0.1:8080')

describe('Testing products', () =>{

    describe('Test de Productos', () => {
        it('Endpoint POST /api/product/mon, debe registrar un producto', async () =>{

            const productMock = {
                title: 'manaos',
                description: 'bebida de naranja',
                price: 120,
                thumbnail: 'ejemplo.com',
                code: 'dsadasd12',
                stock: 100
            }

            const {status, ok, _body} = await requester.post('/api/product/mon').send(productMock)

            expect(_body.payload).to.have.property('_id')
            
        })

        it('Endpoint POST /api/product/mon, no deberia crear productos con datos vacios', async () => {
            
            const productMock = {}
    
            const {status, ok, _body} = await requester.post('/api/product/mon').send(productMock)
    
            expect(ok).to.have.eq(false)

        })
    })

    describe.skip('Registro, Login and Current', () =>{
        let cookie;
        const mockUser = {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: '12das3'
        }

        it('Debe registrar un usuario', async () => {
            const { _body } = await requester.post('/api/session/register').send(mockUser)
            expect( _body.payload).to.be.ok
            
        })

        it('Debe hacer loggin y DEVOLVER UNA COOKIE', async () => {
            const result = await requester.post('/api/session/login').send({
                email: mockUser.email,
                passsword: mockUser.password
            })

            //COOKIE_NAMECOOKIE_VALUE
            const cookieResult = await result.headers['set-cookie'][0]
            expect(cookieResult).to.be.ok

            cookie = {
                name: cookieResult.split('=')[0],
                value: cookieResult.split('=')[1],
            }

            expect(cookie.name).to.be.ok.and.eql('proyectCookie')
            expect(cookie.value).to.be.ok

            })

            it ('Enviar cookie para ver el contenido de user', async() =>{
                console.log(cookie)
                console.log(`${cookie.name}=${cookie.value}`)

                const{ _body } = await requester.get('/api/api/sessions/current').set('Cookie', [`${cookie.name}=${cookie.value}`])
                console.log('===>', JSON.stringify(_body))

                expect(_body.payload.email).to.be.eql(mockUser.email)
            })
    })
})
