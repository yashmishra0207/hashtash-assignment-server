export interface UserCreateDTO {
    fullName: string
    email: string
    phone?: string
    location?: string
    profilePic?: string
    about?: string
    password: string
}
