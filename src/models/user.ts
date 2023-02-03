export class User {
    constructor (
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: string,
        private created_at: string
    ) {}

    getIdUser(): string {
        return this.id
    }

    getNameUser(): string{
        return this.name
    }

    setNameUser(value: string): void{
        this.name = value
    }

    getEmailUser(): string{
        return this.email
    }

    setEmailUser(value: string): void{
        this.email = value
    }

    getPasswordUser(): string{
        return this.password
    }

    setPasswordUser(value: string): void{
        this.password = value
    }

    getRoleUser(): string{
        return this.role
    }

    setRoleUser(value: string): void{
        this.role = value
    }

    getCreatedAtUser(): string {
        return this.created_at
    }

    setCreatedAtUser(value: string){
        this.created_at = value
    }
}