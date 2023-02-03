export class Post{
    constructor(
        private id: string,
        private creator_id: string,
        private content: string,
        private likes: number,
        private dislakes: number,
        private created_at: string,
        private updated_at: string
    ){}

    getIdPost(): string{
        return this.id
    }

    getCreatorIdPost(): string{
        return this.creator_id
    }

    setCreatorIdPost(value: string): void{
        this.creator_id = value
    }

    getContentPost(): string{
        return this.content
    }

    setContentPost(value: string): void{
        this.content = value
    }

    getLikesPost(): number{
        return this.likes
    }

    setLikesPost(value: number): void{
        this.likes = value
    }

    getDislikesPost(): number{
        return this.dislakes
    }

    setDislikesPost(value: number): void{
        this.dislakes = value
    }

    getCreatedAtPost(): string{
        return this.created_at
    }

    setCreatedAtPost(value: string){
        this.created_at = value
    }

    getUpdatedAtPost(): string{
        return this.updated_at
    }

    setUpdatedAtPost(value: string): void{
        this.updated_at = value
    }
}