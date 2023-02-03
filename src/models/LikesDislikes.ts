export class LikesDislikes{
    constructor(
        private user_id: string,
        private post_id: string,
        private like: number
    ){}

    getUserIdLD(): string{
        return this.user_id
    }

    setUserIdLD(value: string): void{
        this.user_id = value
    }

    getPostIdLD(): string{
        return this.post_id
    }

    setPostIdLD(value: string): void{
        this.post_id = value
    }

    getLikeLD(): number{
        return this.like
    }

    setLikeLD(value:number): void{
        this.like = value
    }
}