export class User {
    constructor (
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: string,
        private created_at: string
    ) {}

    getId(): string {
        return this.id
    }

    getName(): string{
        return this.name
    }

    setName(value: string): void{
        this.name = value
    }

    getEmail(): string{
        return this.email
    }

    setEmail(value: string): void{
        this.email = value
    }

    getPassword(): string{
        return this.password
    }

    setPassword(value: string): void{
        this.password = value
    }

    getRole(): string{
        return this.role
    }

    setRole(value: string): void{
        this.role = value
    }

    getCreatedAt(): string {
        return this.created_at
    }

    setCreatedAt(value: string){
        this.created_at = value
    }
}